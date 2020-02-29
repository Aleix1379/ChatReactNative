import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View,} from 'react-native';

import {useDispatch} from 'react-redux';

import Posts from '../../components/Posts/Posts';
import {RootDispatcher} from '../../store/root-reducer';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Loading from '../../components/Loading/Loading';
import styles from './PostsScreen.sass';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const App: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const showCommentOfPost = async (postId: number, name: string) => {
    setShowLoading(true);
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      );
      let responseJson = await response.json();
      rootDispatcher.updateComments(responseJson);

      setShowLoading(false);
      navigation.navigate('Comments', {title: name});
    } catch (error) {
      console.error(error);
      setShowLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          {showLoading && <Loading message="Loading..." />}

          <View style={styles.messages}>
            <View style={styles.posts}>
              <Posts
                navigation={navigation}
                postPressHandler={showCommentOfPost}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
