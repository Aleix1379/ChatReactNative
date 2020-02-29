import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import Posts from '../components/Posts/Posts';
import {RootDispatcher} from '../store/root-reducer';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Loading from '../components/Loading/Loading';

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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f0f0f0',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#b2b2b2',
    height: Dimensions.get('window').height - getStatusBarHeight(),
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    display: 'flex',
    overflow: 'scroll',
    flex: 1,
    flexDirection: 'row',
  },
  posts: {
    flex: 2,
  },
  bottomBar: {
    marginTop: 'auto',
    backgroundColor: '#0af',
    height: 50,
  },
});

export default App;
