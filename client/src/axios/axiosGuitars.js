import axios from 'axios';

import { production } from '../shared/utils/stringConstants';

const Instance = axios.create({
    baseURL: process.env.NODE_ENV === production ? 'https://ian-claros-demo-ecommerce.herokuapp.com' : 'http://localhost:4000'
});

export default Instance;