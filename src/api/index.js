import axios from "axios";

const request = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN_KEY}`
  }
});

export default {
  get: url => {
    return request.get(url);
  }
};
