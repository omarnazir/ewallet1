import axios from "../axios"
export class CropsTypeService {

    //Admin 
    getAllCropTypes(){
        return axios.get("/crop-types")

    }

}
export default new CropsTypeService();