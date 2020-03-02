import React, {useEffect, useState} from 'react';
import {InitialState, Post, RootDispatcher, User,} from '../../store/root-reducer';
import {Image, ImageStyle, ScrollView, StyleProp, Text, View, ViewStyle,} from 'react-native';
import {WindowUtils} from '../../utils/WindowUtils';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Message from '../Message/Message';
import Button from '../Button/Button';

import styles from './Posts.sass';
import PostService from '../../services/Posts';
import Loading from '../Loading/Loading';
import SearchBox from '../SearchBox/SearchBox';

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
    const [searchText, setSearchText] = useState('');
    const [postsDataSource, setPostsDataSource] = useState<Post[]>([]);
    const {posts, currentPostSelectedId, userConnected} = useSelector<InitialState,
        StateProps>((state: InitialState) => {
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
                setPostsDataSource(data!);
                rootDispatcher.updatePosts(data!);
            })
            .catch(err => {
                setShowLoading(false);
                console.error(err);
            });
    }, []);

    useEffect(() => {
        const postsFiltered = postsDataSource.filter(post =>
            post.title.toLowerCase().includes(searchText.toLowerCase()) ||
            post.body.toLowerCase().includes(searchText.toLowerCase())
        );
        rootDispatcher.updatePosts(postsFiltered);
    }, [searchText]);

    /**
     * I update the data soruce with the new post
     */
    useEffect(() => {
        if (posts.length !== postsDataSource.length) {
            posts.forEach(post => {
                if (postsDataSource.findIndex(postDataSource => postDataSource.id === post.id) === -1) {
                    postsDataSource.push(post);
                }
            });
        }
    }, [posts]);

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
        <View style={styles.postContainer as StyleProp<ViewStyle>}>
            {showLoading && <Loading message="Loading..."/>}
            <View style={styles.header as StyleProp<ViewStyle>}>
                {userConnected.image.uri && (
                    <Image style={styles.avatar as StyleProp<ImageStyle>} source={userConnected.image}/>
                )}
                <Text style={styles.title as StyleProp<ViewStyle>}>{userConnected.name}</Text>
                <Text style={styles.title as StyleProp<ViewStyle>}>{userConnected.email}</Text>
            </View>

            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <SearchBox
                    value={searchText}
                    placeholder="Search posts"
                    onChangeText={setSearchText}
                />
                <View style={getPostsStyles()}>
                    {posts.map((post: Post) => (
                        <Message
                            key={post.id + post.title}
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
