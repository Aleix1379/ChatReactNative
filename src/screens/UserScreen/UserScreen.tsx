import React, {useState} from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './UserScreen.sass';
import InputTextLabel from '../../components/TextInputLabel/TextInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  InitialState,
  Post,
  RootDispatcher,
  User,
} from '../../store/root-reducer';
import Button from '../../components/Button/Button';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface StateProps {
  userConnected: User;
}

const UserScreen: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
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
    rootDispatcher.updateUser({...userConnected, name});
  };

  return (
    <SafeAreaView style={styles.saveView}>
      <View style={styles.userProfile}>
        <InputTextLabel
          label="Name"
          value={name}
          placeholder="Introduce the name"
          onChangeText={text => setName(text)}
        />
        <Button title="SAVE" onPress={updateProfile} />
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;
