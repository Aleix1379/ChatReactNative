/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './store';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import PostsComponent from './components/PostsComponent';
import HeaderComponent from './components/HeaderComponent';
import CommentsComponent from './components/CommentsComponent';
import BottomBarComponent from './components/BottomBarComponent';
export enum ScreenSize {
  Desktop = 500,
}

const App = () => {
  const isMobile = (): boolean => {
    return Dimensions.get('window').width < ScreenSize.Desktop;
  };

  const isDesktop = (): boolean => {
    return Dimensions.get('window').width >= ScreenSize.Desktop;
  };

  return (
    <Provider store={store}>
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {/*<ScrollView*/}
          {/*  contentInsetAdjustmentBehavior="automatic"*/}
          {/*  style={styles.scrollView}>*/}
          <View style={styles.body}>
            {isDesktop() && <HeaderComponent />}

            <View style={styles.messages}>
              <View style={styles.posts}>
                <PostsComponent />
              </View>

              {isDesktop() && (
                <View style={styles.comments}>
                  <CommentsComponent />
                </View>
              )}
            </View>

            {isMobile() && (
              <View style={styles.bottomBar}>
                <BottomBarComponent />
              </View>
            )}
          </View>
          {/*</ScrollView>*/}
        </SafeAreaView>
      </>
    </Provider>
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
    height: (Dimensions.get('window').height - getStatusBarHeight()),
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
    backgroundColor: '#0f0',
  },
  comments: {
    flex: 3,
    backgroundColor: '#f0a',
  },
  bottomBar: {
    marginTop: 'auto',
    backgroundColor: '#0af',
    height: 50,
  },
});

export default App;
