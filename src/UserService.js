import axios from "./axios";

export default class UserService {
  static async save(payload) {
    try {
      const res = await axios.post('/user', payload);
      return res.data;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }

  static async find() {
    try {
     const res = await axios.get(`/users`);
      return res.data;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        new Error("O usuário que está tentando excluir é inválido ou não está salvo no servidor.")
        return;
      }
      await axios.delete(`/user/${id}`);
      return true;
    } catch (e) {
      if (e.response.data)
        throw Error(e.response.data.message);
      throw Error(e.message);
    }
  }
}