import React, {useEffect, useState} from 'react';
import {
  InitialState,
  Post,
  RootDispatcher,
  User,
} from '../../store/root-reducer';
import {
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  Text,
  Image,
} from 'react-native';
import {WindowUtils} from '../../utils/WindowUtils';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Message from '../Message/Message';
import Button from '../Button/Button';

import styles from './Posts.sass';
import PostService from '../../services/Posts';
import Loading from '../Loading/Loading';

interface Props {
  postPressHandler(postId: number, name: string): void;

  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  currentPostSelectedId: number;
  userConnected: User;
  posts: Post[];
}

const Posts: React.FC<Props> = ({postPressHandler, navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const {posts, currentPostSelectedId, userConnected} = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      posts: state.posts,
      currentPostSelectedId: state.currentPostSelectedId,
      userConnected: state.userConnected,
    };
  }, shallowEqual);

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await PostService.getPosts();
      } catch (error) {
        console.error(error);
        setShowLoading(false);
      }
    };

    setShowLoading(true);
    fetchData()
      .then(data => {
        setShowLoading(false);
        rootDispatcher.updatePosts(data!);
      })
      .catch(err => {
        setShowLoading(false);
        console.error(err);
      });
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
      {showLoading && <Loading message="Loading..." />}
      <View style={styles.header}>
        {userConnected.image.uri && (
          <Image style={styles.avatar} source={userConnected.image} />
        )}
        <Text style={styles.title}>{userConnected.name}</Text>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={getPostsStyles()}>
          {posts.map((post: Post) => (
            <Message
              key={post.id}
              id={post.id!}
              title={post.title}
              body={post.body}
              isSelected={isCurrentPostSelected(post.id!)}
              messagePressHandler={selectPost}
            />
          ))}
        </View>
      </ScrollView>

      <View style={getNewPostStyles()}>
        <Button
          title="New post"
          onPress={() => navigation.navigate('NewPost')}
        />
      </View>
    </View>
  );
};

export default Posts;
