import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3031', // Replace with the base URL of your API
});

export default instance;
