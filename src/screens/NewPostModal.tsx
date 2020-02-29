import React, {useState} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {InitialState, Post, RootDispatcher, User} from '../store/root-reducer';
import Button from '../components/Button';

import theme from '../styles/theme.style';
import PostService from '../services/Posts';
import LoadingComponent from '../components/loadingComponent';
import InputTextLabel from '../components/TextInput';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
  posts: Post[];
}

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

  const cancel = () => {
    navigation.goBack();
  };

  const addPost = async () => {
    setShowLoading(true);
    try {
      const newPost = await PostService.addPost({
        userId: userConnected.id,
        title: title,
        body: body,
      });
      setShowLoading(false);
      rootDispatcher.updatePosts([...posts, newPost]);
      navigation.goBack();
    } catch (e) {
      console.log(':::Error new POST:::');
      console.log(e);
      setShowLoading(false);
      navigation.navigate('Error', {
        title: 'Error adding a new Post',
        message: e,
      });
    }
  };

  return (
    <SafeAreaView style={styles.saveView}>
      {showLoading && <LoadingComponent message="Loading" />}
      {!showLoading && (
        <View style={styles.newPost}>
          <Text style={styles.title}>New post</Text>
          <InputTextLabel
            label="Title"
            value={title}
            placeholder="Introduce the title"
            onChangeText={text => setTitle(text)}
          />
          <InputTextLabel
            label="Post"
            value={body}
            placeholder="Introduce the post"
            multiline={true}
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
