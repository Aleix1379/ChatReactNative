import axios from 'axios';
import {Post} from '../store/root-reducer';
import Api from './Api';

const url = Api.getUrl('/posts');

export default class PostService {
  public static addPost(post: Post): Promise<Post> {
    return axios.post(url, post).then(response => response.data);
  }
}
