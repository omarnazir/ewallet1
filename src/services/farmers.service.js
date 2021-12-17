import axios from "./axios"
export class FarmersService {
    //Admin 
    async getAllFarmers(data){
        return await axios.post("/farmers/full", data)
    }
}
export default new FarmersService();