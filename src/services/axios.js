import axios from 'axios';


const API_URL="http://localhost:8085/api/v1/"

export default axios.create({
    baseURL:API_URL,
    headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})