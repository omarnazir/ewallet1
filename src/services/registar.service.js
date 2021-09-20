import axios from "./axios"
export class RegistarService {

    //Admin 
    getAllRegistars(){
        return axios.get("/registars")

    }
}
export default new RegistarService();