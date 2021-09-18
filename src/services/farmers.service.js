import axios from "./axios"
export class FarmersService {
    //Admin 
    getAllFarmers(){
        return axios.get("/farmers")

    }
}
export default new FarmersService();