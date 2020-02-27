import {Action, Dispatch, Reducer} from 'redux';

export interface InitialState {
  name: string;
  address: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const initialState: InitialState = {
  name: '',
  address: '',
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export enum ActionType {
  UpdateName,
  UpdateAddress,
  DeleteName,
  DeleteAddress,
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
  if (action.type === ActionType.UpdateName) {
    return {...state, name: action.payload.name || ''};
  } else if (action.type === ActionType.DeleteName) {
    return {...state, name: ''};
  } else if (action.type === ActionType.DeleteAddress) {
    return {...state, address: ''};
  } else if (action.type === ActionType.UpdateAddress) {
    return {...state, address: action.payload.address || ''};
  } else {
    return state;
  }
};

export class RootDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  updateName = (name: string) =>
    this.dispatch({type: ActionType.UpdateName, payload: {name}});

  updateAddress = (address: string) =>
    this.dispatch({type: ActionType.UpdateAddress, payload: {address}});

  deleteName = () => this.dispatch({type: ActionType.DeleteName, payload: {}});

  deleteAddress = () =>
    this.dispatch({type: ActionType.DeleteAddress, payload: {}});
}
