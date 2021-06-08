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
        return axios.post("/public/",sender)
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

}
export default new SenderIdService();