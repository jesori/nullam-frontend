import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:5180/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;
