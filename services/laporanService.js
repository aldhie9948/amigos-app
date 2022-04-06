import axios from "axios";
const baseURL = "/api/laporan";

const get = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const save = async (obj) => {
  const response = await axios.post(baseURL, obj);
  return response.data;
};

const update = async (obj) => {
  const response = await axios.put(`${baseURL}/${obj.id}`, obj);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

// eslint-disable-next-line
export default { get, save, update, remove };
