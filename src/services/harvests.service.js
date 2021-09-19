import axios from "./axios"
export class HarvestsService {
    //Admin 
    getAllFarmersHarvests(){
        return axios.get("/farmer-harvests")

    }
}
export default new HarvestsService();