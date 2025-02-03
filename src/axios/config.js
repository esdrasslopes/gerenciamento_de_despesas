import axios from "axios";

export const configFetch = axios.create({
  baseURL: "http://localhost:3000/adm/",
  headers: {
    "Content-type": "application/json",
  },
});
