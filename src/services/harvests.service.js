import axios from "./axios"
export class HarvestsService {
    //Admin 
    getAllFarmersHarvests(){
        return axios.get("/farmer-harvests")

    }

    getAllHarvetByFarmer(id){
        return axios.get("/farmer-harvests/"+id+"/farmer")
    }
}
export default new HarvestsService();