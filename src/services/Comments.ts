import axios from 'axios';
import {Comment} from '../store/root-reducer';
import Api from './Api';

const url = Api.getUrl('/posts');

export default class CommentService {
  public static addComment(comment: Comment): Promise<Comment> {
    return axios
      .post(this.buildUrl(comment.postId), comment)
      .then(response => response.data);
  }

  public static getCommentsByPostId(postId: number): Promise<Comment[]> {
    return axios.get(this.buildUrl(postId)).then(response => response.data);
  }

  private static buildUrl(postId: number): string {
    return `${url}/${postId}/comments`;
  }
}
