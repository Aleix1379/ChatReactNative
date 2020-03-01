import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';

import {useDispatch} from 'react-redux';

import Posts from '../../components/Posts/Posts';
import {RootDispatcher} from '../../store/root-reducer';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import Loading from '../../components/Loading/Loading';
import styles from './PostsScreen.sass';
import CommentService from '../../services/Comments';
import DeviceInfo from 'react-native-device-info';
import Comments from "../../components/Comments/Comments";

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const App: React.FC<Props> = ({navigation}) => {
    const [showLoading, setShowLoading] = useState(false);
    const [showTabletLayout, setShowTabletLayout] = useState(false);

    const dispatch = useDispatch();
    const rootDispatcher = new RootDispatcher(dispatch);

    const showCommentOfPost = async (postId: number, name: string) => {
        setShowLoading(true);
        try {
            const responseJson = await CommentService.getCommentsByPostId(postId);
            rootDispatcher.updateComments(responseJson);

            setShowLoading(false);
            if (!showTabletLayout) {
                navigation.navigate('Comments', {title: name});
            }
        } catch (error) {
            console.error(error);
            setShowLoading(false);
        }
    };

    DeviceInfo.isLandscape()
        .then(isLandscape => {
            setShowTabletLayout(DeviceInfo.isTablet && isLandscape);
        })
        .catch(err => console.error(err));

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <View style={styles.body}>
                    {showLoading && <Loading message="Loading..."/>}

                    {
                        !showTabletLayout &&
                        <View style={styles.messages}>
                            <View style={styles.posts}>
                                <Posts
                                    navigation={navigation}
                                    postPressHandler={showCommentOfPost}
                                />
                            </View>
                        </View>
                    }

                    {
                        showTabletLayout &&
                        <View style={styles.messages}>
                            <View style={styles.posts}>
                                <Posts
                                    navigation={navigation}
                                    postPressHandler={showCommentOfPost}
                                />
                            </View>

                            <View>
                                <Comments navigation={navigation}/>
                            </View>

                        </View>
                    }

                </View>
            </SafeAreaView>
        </>
    );
};

export default App;
