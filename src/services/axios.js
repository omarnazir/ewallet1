import axios from 'axios';
import { API_URL } from "../utils/constants";

const token = window.localStorage.getItem('token');
// 'Authorization': `Bearer ${localStorage.getItem('token')}`
export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
       
    }
})

// 'Cache-Control': 'no-cache',
// 'Pragma': 'no-cache',
// 'Expires': '0',