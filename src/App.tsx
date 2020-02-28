/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import PostsComponent from './components/PostsComponent';
import HeaderComponent from './components/HeaderComponent';
import CommentsComponent from './components/CommentsComponent';
import BottomBarComponent from './components/BottomBarComponent';

import theme from './styles/theme.style';
import CommentsHeaderComponent from './components/CommentsHeaderComponent';
import LoadingComponent from './components/loadingComponent';
import {RootDispatcher} from './store/root-reducer';

export enum ScreenSize {
  Desktop = 500,
}

const App = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [showCommentsModal, setCommentsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const isMobile = (): boolean => {
    return Dimensions.get('window').width < ScreenSize.Desktop;
  };

  const isDesktop = (): boolean => {
    return Dimensions.get('window').width >= ScreenSize.Desktop;
  };

  const showCommentOfPost = async (postId: number, name: string) => {
    setShowLoading(true);
    setPostTitle(name);
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      );
      let responseJson = await response.json();
      rootDispatcher.updateComments(responseJson);

      setCommentsModalVisible(true);
      setShowLoading(false);
    } catch (error) {
      console.error(error);
      setShowLoading(false);
    }
  };

  const getCommentsStyle = (): StyleProp<ViewStyle> => {
    if (isDesktop()) {
      return {
        flex: 3,
      };
    } else {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        backgroundColor: theme.LIGHT_COLOR,
      };
    }
  };

  const hideComments = () => {
    setCommentsModalVisible(false);
  };

  return (
    // <Provider store={store}>
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          {showLoading && <LoadingComponent />}

          {isDesktop() && <HeaderComponent />}

          <View style={styles.messages}>
            <View style={styles.posts}>
              <PostsComponent postPressHandler={showCommentOfPost} />
            </View>

            {(isDesktop() || (isMobile() && showCommentsModal)) && (
              <View style={getCommentsStyle()}>
                {isMobile() && (
                  <CommentsHeaderComponent
                    title={postTitle}
                    onBackPressHandler={hideComments}
                  />
                )}
                <CommentsComponent />
              </View>
            )}
          </View>

          {isMobile() && !showCommentsModal && (
            <View style={styles.bottomBar}>
              <BottomBarComponent />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
    // </Provider>
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
    // height: '100%',
    // maxHeight: '100%',
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
