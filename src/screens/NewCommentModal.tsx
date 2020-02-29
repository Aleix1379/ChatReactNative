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
import LoadingComponent from '../components/loadingComponent';
import Button from '../components/Button';
import theme from '../styles/theme.style';
import CommentService from '../services/Comments';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  Comment,
  InitialState,
  RootDispatcher,
  User,
} from '../store/root-reducer';
import InputTextLabel from '../components/TextInput';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
  currentPostSelectedId: number;
  comments: Comment[];
}

const NewCommentModal: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const {currentPostSelectedId, comments, userConnected} = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      currentPostSelectedId: state.currentPostSelectedId,
      comments: state.comments,
      userConnected: state.userConnected,
    };
  }, shallowEqual);

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const cancel = () => {
    navigation.goBack();
  };

  const addMessage = async () => {
    setShowLoading(true);
    try {
      const newComment = await CommentService.addComment({
        postId: currentPostSelectedId,
        name: name,
        email: userConnected.email,
        body: body,
      });

      setShowLoading(false);
      rootDispatcher.updateComments([...comments, newComment]);
      navigation.goBack();
    } catch (e) {
      console.log(':::Error new COMMENT:::');
      console.log(e);
      setShowLoading(false);
      navigation.navigate('Error', {
        title: 'Error adding a new message',
        message: e,
      });
    }
  };

  return (
    <SafeAreaView style={styles.saveView}>
      {showLoading && <LoadingComponent />}
      {!showLoading && (
        <View style={styles.newPost}>
          <Text style={styles.title}>New comment</Text>

          <InputTextLabel
            label="Title"
            value={name}
            placeholder="Introduce the title"
            onChangeText={text => setName(text)}
          />
          <InputTextLabel
            label="Comment"
            value={body}
            placeholder="Introduce the comment"
            multiline={true}
            onChangeText={text => setBody(text)}
          />

          <View style={styles.button}>
            <Button title="CANCEL" onPress={cancel} />
          </View>

          <View style={styles.button}>
            <Button title="SAVE" onPress={addMessage} />
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

export default NewCommentModal;