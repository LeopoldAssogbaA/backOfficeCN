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
          "Content-Type":
            "application/json; text/html; charset=utf-8; text/plain",
          Connection: "keep-alive",
          "X-Powered-By": "Express",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods":
            "GET, HEAD , DELETE, PUT, OPTIONS, POST, CONNECTIONS",
          "Access-Control-Request-Method": "PUT",
          Host: "app-booking-christ.herokuapp.com",
          "Cache-Control": "no-cache",
          "Accept-Encoding": "gzip, deflate, br",
        },
      }),

    delete: (path) =>
      axios.delete(`${APIURL}${path}`, {
        headers: {
          Accept: "application/json, text/plain,*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type,Accept",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, HEAD,DELETE,PUT,OPTIONS,POST, CONNECTION",
          "Access-Control-Request-Method": "DELETE",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          Host: "app-booking-christ.herokuapp.com",
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
