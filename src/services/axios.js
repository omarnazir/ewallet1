import axios from 'axios';

const API_URL=""

export default axios.create({
    baseURL:'',
    headers:{
        "content-type":'',
        "Authorization":""
    }
})