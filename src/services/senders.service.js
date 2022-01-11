import axios from "./axios"
export class SenderIdService {

    //Admin 
    GetAllSenderIds(){
        return axios.get("/sender-ids")

    }

    //Admin
    GetAllPendingSenderIds(){
        return axios.get("/sender-ids/pending")
    }

    //User
    AddSenderId(data){
        const sender={
            senderId:data.senderId
        }
        return axios.post("/sender-ids",sender)
    }

    //AddDefaultSender ->Approved 
    AddDefaultSenderId(data){
        const sender={
            senderId:data.senderId
        }
        return axios.post("/sender-ids/public/",sender)
    }
    
    
    //Aprove Sender Id
    ApproveSenderId(id){
        return axios.put("/sender-ids/approve/"+id)
    }
    
    //Reject Sender Id 
    RejectSenderId(id){
        return axios.put("/sender-ids/reject/"+id)
    }

    DisableSenderId(id){
        return axios.put("/sender-ids/disable/"+id)
    }

    
    logout() {
        // const id=window.localStorage.getItem("userId");
        return axios.get("/users/logout").then(res => {
            if (res.data) {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("userId")
                window.localStorage.removeItem("username");
                window.localStorage.removeItem("user_roles");
                window.localStorage.removeItem("user_plain_roles");
                window.localStorage.clear();
            }
            return res.data;
        },(err)=>{
            window.localStorage.clear();
        })
    }
  

}
export default new SenderIdService();