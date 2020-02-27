import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {InitialState, RootDispatcher} from '../store/root-reducer';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

interface Props {}

interface StateProps {
  name: string;
  address: string;
}

const PostsComponent: React.FC<Props> = () => {
  const {name, address} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        name: state.name,
        address: state.address,
      };
    },
    shallowEqual,
  );

  const [posts, setPosts] = useState([]);

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
  });

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.posts}>
        <Text>{JSON.stringify(posts, null, 2)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  posts: {},
});

export default PostsComponent;
