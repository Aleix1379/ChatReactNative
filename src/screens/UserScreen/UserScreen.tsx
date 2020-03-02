import React, {useEffect, useState} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {SafeAreaView, View, Image, ImageURISource, Text, ViewStyle, StyleProp, ImageStyle} from 'react-native';
import styles from './UserScreen.sass';
import InputTextLabel from '../../components/TextInputLabel/TextInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {InitialState, RootDispatcher, User} from '../../store/root-reducer';
import Button from '../../components/Button/Button';
import ImagePicker from 'react-native-image-picker';
import Loading from '../../components/Loading/Loading';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
}

const UserScreen: React.FC<Props> = ({navigation}) => {
  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coords, setCoords] = useState({latitude: 0, longitude: 0});
  const [location, setLocation] = useState('');
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
      const user = {...userConnected, name, email};
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

  useEffect(() => {
    setName(userConnected.name);
    setEmail(userConnected.email);

    Geolocation.getCurrentPosition(info => {
      setCoords(info.coords);

      Geocoder.geocodePosition({
        lat: info.coords.latitude,
        lng: info.coords.longitude,
      }).then((res: any) => {
        const currentPostion = res[0];
        if (currentPostion) {
          setLocation(currentPostion.formattedAddress);
        }
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.saveView as StyleProp<ViewStyle>}>
      {showLoading && <Loading />}
      <View style={styles.userProfile as StyleProp<ViewStyle>}>
        <View style={styles.input as StyleProp<ViewStyle>}>
          <InputTextLabel
            label="Name"
            value={name}
            placeholder="Introduce the name"
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={styles.input as StyleProp<ViewStyle>}>
          <InputTextLabel
            label="Email"
            value={email}
            placeholder="Introduce the name"
            onChangeText={text => setEmail(text)}
          />
        </View>

        {avatar.uri && <Image style={styles.avatar as StyleProp<ImageStyle>} source={avatar} />}

        <View style={styles.button as StyleProp<ViewStyle>}>
          <Button title="CHANGE AVATAR" onPress={updatePicture} />
        </View>

        {location.length > 0 && <Text style={styles.location as StyleProp<ViewStyle>}>{location}</Text>}

        <View style={styles.button as StyleProp<ViewStyle>}>
          <Button
            title="SHOW YOUR LOCATION ON A MAP"
            onPress={() =>
              navigation.navigate('Map', {coords: coords, title: location})
            }
          />
        </View>

        <View style={styles.button as StyleProp<ViewStyle>}>
          <Button
            title="SHARE YOUR LOCATION"
            onPress={() =>
              navigation.navigate('ShareLocation', {
                coords: coords,
                location: location,
              })
            }
          />
        </View>

        <View style={styles.button as StyleProp<ViewStyle>}>
          <Button title="SAVE" onPress={updateProfile} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
