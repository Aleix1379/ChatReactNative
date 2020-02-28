import {Action, Dispatch, Reducer} from 'redux';

export interface InitialState {
  comments: Comment[];
  currentPostSelectedId: number;
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
  currentPostSelectedId: -1,
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export enum ActionType {
  UpdateComments,
  SelectPost,
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
  if (action.type === ActionType.UpdateComments) {
    return {...state, comments: action.payload.comments || []};
  } else if (action.type === ActionType.SelectPost) {
    return {
      ...state,
      currentPostSelectedId: action.payload.currentPostSelectedId || -1,
    };
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
    this.dispatch({type: ActionType.UpdateComments, payload: {comments}});
  };

  selectPost = (currentPostSelectedId: number) => {
    this.dispatch({
      type: ActionType.SelectPost,
      payload: {currentPostSelectedId},
    });
  };
}
