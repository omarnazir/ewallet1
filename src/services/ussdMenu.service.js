import axios from "./axios"
export class UssdMenuService {

    //Admin 
    getAllUssdMenu(){
        return axios.get("/ussd-menus")

    }

   
  

}
export default new UssdMenuService();