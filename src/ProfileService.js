import axios from "./axios";

export default class ProfileService {

  static async findFriends() {
    try {
      const res = await axios.get(`/profiles`);
      return res.data;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }

}