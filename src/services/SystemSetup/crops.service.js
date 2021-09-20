import axios from "../axios"
export class CropsService {

    //Admin 
    getAllCrops(){
        return axios.get("/crops")

    }

}
export default new CropsService();