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
import {Comment, InitialState, RootDispatcher} from '../store/root-reducer';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  currentPostSelectedId: number;
  comments: Comment[];
}

const NewCommentModal: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const {currentPostSelectedId, comments} = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      currentPostSelectedId: state.currentPostSelectedId,
      comments: state.comments,
    };
  }, shallowEqual);

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

  const addMessage = async () => {
    setShowLoading(true);
    const newComment = await CommentService.addComment({
      postId: currentPostSelectedId,
      name: name,
      email: email,
      body: body,
    });

    setShowLoading(false);
    rootDispatcher.updateComments([...comments, newComment]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.saveView}>
      {showLoading && <LoadingComponent />}
      {!showLoading && (
        <View style={styles.newPost}>
          <Text style={styles.title}>New comment</Text>
          <TextInput
            style={getInputStyle()}
            value={name}
            placeholder="Title"
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={getInputStyle()}
            value={email}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={getInputStyle(true)}
            multiline
            placeholder="Body"
            value={body}
            onChangeText={text => setBody(text)}
          />

          <View style={styles.button}>
            <Button title="SAVE" onPress={cancel} />
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
