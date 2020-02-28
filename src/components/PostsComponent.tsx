import React, {useEffect, useState} from 'react';
import {Post} from '../store/root-reducer';
import {ScrollView, View} from 'react-native';
import MessageComponent from './MessageComponent';

interface Props {
  postPressHandler(postId: number, name: string): void;
}

const PostsComponent: React.FC<Props> = ({postPressHandler}) => {
  const [posts, setPosts] = useState([]);

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

  // const showPost = (postId: number) => {
  //   console.log('showPost::View post with ID: ' + postId);
  // };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        {posts.map((post: Post) => (
          <MessageComponent
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            messagePressHandler={postPressHandler}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PostsComponent;
