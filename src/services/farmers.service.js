import axios from "./axios"
export class FarmersService {
    //Admin 
    async getAllFarmers(){
        return await axios.get("/farmers/full")
    }
}
export default new FarmersService();