import axios from 'axios';
import {API_URL} from "./constants";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})