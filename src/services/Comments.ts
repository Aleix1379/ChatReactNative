import axios from 'axios';
import {Comment} from '../store/root-reducer';
import Api from './Api';

const url = Api.getUrl('/posts');

export default class CommentService {
  public static addComment(comment: Comment): Promise<Comment> {
    return axios
      .post(`${url}/${comment.postId}/comments`, comment)
      .then(response => response.data);
  }
}
