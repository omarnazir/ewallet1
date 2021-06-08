import axios from "axios";
import { API_URL } from "./constants"

class AuthService {
    login(data) {
        const logindata = {
            username: data.username,
            password: data.password
        }
        return axios.post(API_URL + "/auth/login", logindata).then(res => {
            if (res.data) {
                localStorage.clear();
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', res.data.user)
                localStorage.setItem('username', JSON.stringify(res.data.user.username));
                localStorage.setItem('user_roles', JSON.stringify(res.data.user.roles))
                localStorage.setItem('user_plain_roles',res.data.user.roles)
            }
            return res.data;
        })
    }

    register(data) {
        return axios.post(API_URL + "/auth/register", data, { headers: { "Content-Type": "multipart/form-data" } })
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        localStorage.removeItem("user_roles");
        localStorage.removeItem("user_plain_roles");
        localStorage.clear();
    }

    isAuthenticated() {
        let isloggedIn = false;
        const token = localStorage.getItem('token');
        const roles = localStorage.getItem("user_roles")
        const plainRoles = localStorage.getItem("user_plain_roles")
        if (token == null || token.length === 0 || roles ==null || plainRoles==null) {
            isloggedIn = false;
        } else {
            isloggedIn = true
        }
        return isloggedIn;
    }

    getRedirectPath() {
        if (this.isAuthenticated()) {
            // const roles = res.user.roles;
            const roles = localStorage.getItem("user_plain_roles")
            const found = roles.findIndex((row) => row.name == "/admin/dashboard")
            if (found === -1) {
                return "/dashboard";

            } else {
                return "/admin/dashboard";

            }
        }
        else {
            return "/login";
        }
    }

    getUsername() {
        if (this.isAuthenticated()) {
            return localStorage.getItem("username")
        } else {
            return "";
        }
    }


    /*
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

        //**Assign on approval 
        // "tariff_fk": 1,


        "payment_type": this.state.AccountType,
        // "post_paid_approved": 0,
        "nin": this.state.nidaNumber,
        "nida_attachment": this.state.nidaFile,
        // "ind_org": "",
        "business_licence": "",

        /**Set the gateway on approval 
        // "sms_gateway_username": "",
        // "sms_gateway_password": ""
    } **/


}
export default new AuthService;
