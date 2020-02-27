export default class Posts {
  getMoviesFromApi = async () => {
    try {
      let response = await fetch('http://jsonplaceholder.typicode.com/posts');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  };
}
