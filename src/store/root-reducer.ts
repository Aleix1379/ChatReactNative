import {Action, Dispatch, Reducer} from 'redux';

export interface InitialState {
  comments: Comment[];
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const initialState: InitialState = {
  comments: [],
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export enum ActionType {
  UpdateComments,
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
  if (action.type === ActionType.UpdateComments) {
    return {...state, comments: action.payload.comments || []};
  } else {
    return state;
  }
};

export class RootDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  updateComments = (comments: Comment[]) => {
    console.log();
    this.dispatch({type: ActionType.UpdateComments, payload: {comments}});
  };
}
