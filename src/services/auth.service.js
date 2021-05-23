import axios from "axios";
const API_URL = "http://localhost:8085/api/v1"

class AuthService {
    login(data) {
        const logindata = {
            username: data.username,
            password: data.password
        }
        return axios.post(API_URL + "/authenticate", logindata).then(res => {
            if(res.data){
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user', res.data.user)
                sessionStorage.setItem('username', res.data.user.username);
                sessionStorage.setItem('user_roles', JSON.stringify(res.data.user.roles))
            }
            return res.data;
        })
    }

     // catch(err => {
        //     console.log(error.response.data)
        //     return err;
        // })

    register(data){
        const registrationUser= {
            fullname:data.fullname,
            email:data.email,
            phonenumber:data.phoneNumber,
            username:data.username,
            password:data.password,
            location:data.physicalAddress,
            customer_type:data.customerType,
            payment_type:data.AccountType,
            nin:data.nin,
            nida_attachment:data.nida_attachment,
            // business_licence,
        }
        return axios.post(API_URL+"/customers",registrationUser)
    }

    logout(){
        sessionStorage.clear();
    }


    registeredUser = {
        "fullname": this.state.fullname,
        "email": this.state.email,
        "phonenumber": this.state.phoneNumber,
        "username": this.state.username,
        "password": this.state.password,
        // "image": "",
        // "status": 1,
        // "third_party": "EWALLET",
        "location": this.state.physicalAddress,
        // "contact_person": "Imani Mwendamseke",
        // "start_date": null,
        // "is_active": 1,
        // "is_deleted": 0,
        // "freelancer_fk": null,
        // "logo_url": "",
        // "side_bar_bg": "",
        // "header_bg": "",
        // "flag": "",
        "customer_type": this.state.customerType,
        // "v_account": "",
        // "monthly_limit": 500,
        // "sms_balance": 0,
        // "total_sms_sent": 0,
        // "total_sms_delivered": 0,
        // "total_sms_failed": 0,
        // "total_sms_purchased": 0,
        // "sms_account": 1,
        // "sms_account_type": "User",
        // "sms_expire": null,
        // "sms_expire_days": 30,
        //*Assign on approval */
        // "tariff_fk": 1,
        "payment_type": this.state.AccountType,
        // "post_paid_approved": 0,
        "nin": this.state.nidaNumber,
        "nida_attachment": this.state.nidaFile,
        // "ind_org": "",
        "business_licence": "",
        /**Set the gateway on approval */
        // "sms_gateway_username": "",
        // "sms_gateway_password": ""
    }
  
  
}
export default new AuthService;