import React, {useState} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {SafeAreaView, View, Image, ImageURISource} from 'react-native';
import styles from './UserScreen.sass';
import InputTextLabel from '../../components/TextInputLabel/TextInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {InitialState, RootDispatcher, User} from '../../store/root-reducer';
import Button from '../../components/Button/Button';
import ImagePicker from 'react-native-image-picker';
import Loading from '../../components/Loading/Loading';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
}

const UserScreen: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<ImageURISource>({});
  const {userConnected} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userConnected: state.userConnected,
      };
    },
    shallowEqual,
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const updateProfile = () => {
    setShowLoading(true);
    setTimeout(() => {
      const user = {...userConnected, name};
      user.image = avatar;
      rootDispatcher.updateUser(user);
      setShowLoading(false);
    }, 250);
  };

  const updatePicture = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};
        // You can also display the image using data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setAvatar(source);
      }
    });
  };

  return (
    <SafeAreaView style={styles.saveView}>
      {showLoading && <Loading />}
      <View style={styles.userProfile}>
        <View style={styles.name}>
          <InputTextLabel
            label="Name"
            value={name}
            placeholder="Introduce the name"
            onChangeText={text => setName(text)}
          />
        </View>

        {avatar.uri && <Image style={styles.avatar} source={avatar} />}

        <View style={styles.button}>
          <Button title="CHANGE AVATAR" onPress={updatePicture} />
        </View>

        <View style={styles.button}>
          <Button title="SHOW YOUR LOCATION ON A MAP" onPress={() => navigation.navigate('Map')} />
        </View>

        <View style={styles.button}>
          <Button title="SAVE" onPress={updateProfile} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
