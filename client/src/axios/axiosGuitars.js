import axios from 'axios';

//http://localhost:4000
const Instance = axios.create({
    baseURL: 'https://pacific-savannah-54771.herokuapp.com'
});

export default Instance;