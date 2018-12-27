import axios from 'axios';

import { production } from '../shared/utils/stringConstants';

const Instance = axios.create({
    baseURL: process.env.NODE_ENV === production ? 'https://pacific-savannah-54771.herokuapp.com' : 'http://localhost:4000'
});

export default Instance;