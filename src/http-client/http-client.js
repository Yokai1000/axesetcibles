import axios from "axios";
import { HOSTNAME, PATH } from "../utils/constants";

export class HttpClient {
  httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: HOSTNAME,
      headers: { Authorization: `Api-Key ${process.env.REACT_APP_API_KEY}` },
    });
  }

  async get(params) {
    try {
      return this.httpClient.get(`${PATH}`, {
        params,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
