import React, {useState} from 'react';
import {
  NavigationActions,
  NavigationScreenProp,
  NavigationState,
  StackActions,
} from 'react-navigation';
import {Text, View} from 'react-native';
import MapView from 'react-native-maps';
import Button from '../../components/Button/Button';
import styles from './ShareLocationScreen.sass';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  InitialState,
  Post,
  RootDispatcher,
  User,
} from '../../store/root-reducer';
import PostService from '../../services/Posts';
import Loading from '../../components/Loading/Loading';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
  posts: Post[];
}

const ShareLocationScreen: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const coords = navigation.getParam('coords');
  const location = navigation.getParam('location');

  const {userConnected, posts} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userConnected: state.userConnected,
        posts: state.posts,
      };
    },
    shallowEqual,
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const shareLocation = async () => {
    setShowLoading(true);

    let post = {
      userId: userConnected.id,
      title: `My position is: ${location}`,
      body: `I am sharing my position and the coordinates are Latitude: ${
        coords.latitude
      } and longitude: ${coords.longitude}`,
    };
    const newPost = await PostService.addPost(post);
    setShowLoading(false);
    let postsUpdated = [...posts, newPost];
    rootDispatcher.updatePosts(postsUpdated);

    navigation.goBack();
  };

  return (
    <View style={styles.shareLocation}>
      {showLoading && <Loading message="Loading..." />}
      <Text style={styles.location}>{location}</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        />
      </View>
      <View style={styles.sendLocation}>
        <Button title="SEND YOUR LOCATON" onPress={shareLocation} />
      </View>
    </View>
  );
};

export default ShareLocationScreen;
