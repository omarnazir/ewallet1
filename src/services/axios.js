import axios from 'axios';

// const API_URL = "http://10.154.11.117:8088/api/v1/"


const API_URL = "http://localhost:8088/api/v1/"
export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
})