import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {InitialState, RootDispatcher} from '../store/root-reducer';
import {Button, TextInput, Text, View} from 'react-native';

interface Props {}

interface StateProps {
  name: string;
  address: string;
}

const BottomBarComponent: React.FC<Props> = () => {
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
      <Text>I am the bottom bar</Text>
    </View>
  );
};

export default BottomBarComponent;
