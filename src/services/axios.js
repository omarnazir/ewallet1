import axios from 'axios';

<<<<<<< HEAD
const API_URL="http://localhost:8085/api/v1/"

export default axios.create({
    baseURL:API_URL,
    headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
=======
const API_URL=""

export default axios.create({
    baseURL:'',
    headers:{
        "content-type":'',
        "Authorization":""
>>>>>>> 8c7f9bb2e4f8fc1324ad49477fb98c8ed939f67b
    }
})