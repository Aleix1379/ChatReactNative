import React, {useEffect} from 'react';
import {InitialState, Post, RootDispatcher} from '../store/root-reducer';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import MessageComponent from './MessageComponent';
import {WindowUtils} from '../utils/WindowUtils';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Button from './Button';

interface Props {
  postPressHandler(postId: number, name: string): void;
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  currentPostSelectedId: number;
  posts: Post[];
}

const PostsComponent: React.FC<Props> = ({postPressHandler, navigation}) => {
  // const [posts, setPosts] = useState([]);

  const {posts, currentPostSelectedId} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        currentPostSelectedId: state.currentPostSelectedId,
        posts: state.posts,
      };
    },
    shallowEqual,
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch('http://jsonplaceholder.typicode.com/posts');
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }

    fetchData()
      .then(data => {
        rootDispatcher.updatePosts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const getPostsStyles = (): StyleProp<ViewStyle> => {
    let style = {
      paddingHorizontal: 0,
    };
    if (WindowUtils.isDesktop()) {
      style.paddingHorizontal = 15;
    }
    return style;
  };

  const selectPost = (postId: number, name: string) => {
    rootDispatcher.selectPost(postId);
    postPressHandler(postId, name);
  };

  const isCurrentPostSelected = (postId: number): boolean => {
    return currentPostSelectedId === postId;
  };

  const getNewPostStyles = (): StyleProp<ViewStyle> => {
    const style = {
      marginHorizontal: 0,
      paddingHorizontal: 4,
      paddingVertical: 4,
    };
    if (WindowUtils.isDesktop()) {
      style.marginHorizontal = 15;
      style.paddingHorizontal = 0;
    }
    return style;
  };

  return (
    <View style={styles.postContainer}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={getPostsStyles()}>
          {posts.map((post: Post) => (
            <MessageComponent
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              isSelected={isCurrentPostSelected(post.id)}
              messagePressHandler={selectPost}
            />
          ))}
        </View>
      </ScrollView>

      <View style={getNewPostStyles()}>
        <Button
          title="New Post"
          onPress={() => navigation.navigate('NewPost')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {flex: 1},
});

export default PostsComponent;
