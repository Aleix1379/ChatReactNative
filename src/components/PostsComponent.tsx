import React, {useEffect, useState} from 'react';
import {InitialState, Post, RootDispatcher} from '../store/root-reducer';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import MessageComponent from './MessageComponent';
import {WindowUtils} from '../utils/WindowUtils';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

interface Props {
  postPressHandler(postId: number, name: string): void;
}

interface StateProps {
  currentPostSelectedId: number;
}

const PostsComponent: React.FC<Props> = ({postPressHandler}) => {
  const [posts, setPosts] = useState([]);

  const {currentPostSelectedId} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        currentPostSelectedId: state.currentPostSelectedId,
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
        setPosts(data);
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

  return (
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
  );
};

export default PostsComponent;
