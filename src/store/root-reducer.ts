import {Action, Dispatch, Reducer} from 'redux';

export interface InitialState {
  posts: Post[];
  comments: Comment[];
  currentPostSelectedId: number;
  userConnected: User;
}

export interface Post {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id?: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  email: string;
}

export const initialState: InitialState = {
  posts: [],
  comments: [],
  currentPostSelectedId: -1,
  userConnected: {
    id: 1,
    email: 'aleix@steerpath.com',
  },
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export enum ActionType {
  UpdatePosts,
  UpdateComments,
  SelectPost,
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action,
) => {
  if (action.type === ActionType.UpdatePosts) {
    return {...state, posts: action.payload.posts || []};
  } else if (action.type === ActionType.UpdateComments) {
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

  updatePosts = (posts: Post[]) => {
    this.dispatch({type: ActionType.UpdatePosts, payload: {posts}});
  };

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
