import axios from "../axios";
class ShopsService {
    //Admin 
    getAllShops = () => {
        return axios.get("/shop-or-provider");
    };
}

export default new ShopsService;