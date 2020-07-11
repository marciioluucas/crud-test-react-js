import axios from "./axios";

export default class PostService {

  static async all() {
    try {
      const res = await axios.get(`/posts`);
      return res.data;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }

  static async find(id) {
    try {
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }

  static async findFriendPosts(id) {
    try {
      const res = await axios.get(`/posts/profile/${id}`);
      return res.data;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }
}