import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {InitialState, RootDispatcher} from '../store/root-reducer';
import {Button, TextInput, View} from 'react-native';

interface Props {}

interface StateProps {
  name: string;
  address: string;
}

const ReduxHooksComponent: React.FC<Props> = () => {
  const {name, address} = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        name: state.name,
        address: state.address,
      };
    },
    shallowEqual,
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  return (
    <View>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(text: string) => {
          rootDispatcher.updateName(text);
        }}
      />
      <TextInput
        placeholder="address"
        value={address}
        onChangeText={(text: string) => {
          console.log('update address: ' + text);
          rootDispatcher.updateAddress(text);
        }}
      />
      <Button title="button" onPress={() => console.log('click...')}>
        Click
      </Button>
    </View>
  );
};

export default ReduxHooksComponent;
