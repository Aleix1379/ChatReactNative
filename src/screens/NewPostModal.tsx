import React, {useState} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {InitialState, Post, RootDispatcher, User} from '../store/root-reducer';
import {WindowUtils} from '../utils/WindowUtils';
import Button from '../components/Button';

import theme from '../styles/theme.style';
import PostService from '../services/Posts';
import LoadingComponent from '../components/loadingComponent';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
  posts: Post[];
}

/*
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
*/

const NewPostModal: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const {posts, userConnected} = useSelector<InitialState, StateProps>(
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

  const getInputStyle = (multiline = false): StyleProp<ViewStyle> => {
    const inputStyle = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,

      backgroundColor: '#fff',
      width: '100%',
      marginTop: 8,
      marginBottom: 8,
      height: 40,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 3,
      textAlignVertical: 'top',
    };

    if (multiline) {
      inputStyle.height = 150;
    }

    return inputStyle;
  };

  const cancel = () => {
    navigation.goBack();
  };

  const addPost = async () => {
    setShowLoading(true);
    const newPost = await PostService.addPost({
      userId: userConnected.id,
      title: title,
      body: body,
    });

    setShowLoading(false);
    rootDispatcher.updatePosts([...posts, newPost]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.saveView}>
      {showLoading && <LoadingComponent />}
      {!showLoading && (
        <View style={styles.newPost}>
          <Text style={styles.title}>New post</Text>
          <TextInput
            style={getInputStyle()}
            value={title}
            placeholder="Title"
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={getInputStyle(true)}
            multiline
            placeholder="Body"
            value={body}
            onChangeText={text => setBody(text)}
          />

          <View style={styles.button}>
            <Button title="CANCEL" onPress={cancel} />
          </View>

          <View style={styles.button}>
            <Button title="SAVE" onPress={addPost} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveView: {
    flex: 1,
  },
  newPost: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: theme.DARK_COLOR,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});

export default NewPostModal;
