import axios from "axios";

const APIURL = "https://app-booking-christ.herokuapp.com/api/";

class Api {
  constructor() {
    if (!Api.instance) {
      Api.instance = this;
    }
    return Api.instance;
  }

  server = {
    fetch: (path) => axios.get(`${APIURL}${path}`),

    create: (path, data) =>
      axios.post(`${APIURL}${path}`, data, {
        headers: { "Content-Type": "application/json" },
      }),

    update: (path, data) =>
      axios.put(`${APIURL}${path}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        },
      }),

    delete: (path) =>
      axios.delete(`${APIURL}${path}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        },
      }),
  };

  fetchCollection = (path) => this.server.fetch(`${path}`);

  fetch = (path, id = null) =>
    this.server.fetch(`${path}${id !== null ? `/${id}` : ""}`);

  update = (path, id = null, data) =>
    this.server.update(`${path}${id !== null ? `/${id}` : ""}`, data);

  updateCollection = (path, data) => this.server.update(`${path}`, data);

  create = (path, data) => this.server.create(`${path}`, data);

  delete = (path, id) => this.server.delete(`${path}/${id}`);
}

const api = new Api();
Object.freeze(api);

export default api;
