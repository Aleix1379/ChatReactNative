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
} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import ReduxHooksComponent from './components/ReduxHooksComponent';

const App = () => {
  return (
    <Provider store={store}>
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Text>App chat working... 🙄 using Redux with Typescript 😏</Text>
              <ReduxHooksComponent />
            </View>
          </ScrollView>
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
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#424242',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#424242',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
