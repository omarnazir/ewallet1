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
                console.log(res.data.user.roles)
                localStorage.setItem('user_plain_roles', res.data.user.roles)
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
        if (token == null || token.length === 0 || roles == null) {
            isloggedIn = false;
        } else {
            isloggedIn = true
        }
        return isloggedIn;
    }

    isAuthenticatedAdvanced() {
        const token = localStorage.getItem('token');
        const roles = localStorage.getItem("user_roles")
        if (token == null || token.length === 0 || !Array.isArray(roles)) {
            return "/login"
        } else {
            const found = roles.find((row) => row.name == "/admin-dashboard");
            if (found == undefined) {
                return "/dashboard";

            } else {
                return "/admin-dashboard"
            }
        }
    }

    getRedirectPath() {

        // const roles=res.user.roles;
        const roles = localStorage.getItem("user_roles")
        const token = localStorage.getItem('token');
        if (roles == null || !Array.isArray(roles) || token == null) {
            return "/login"
        } else {
            // roles.filter(role => (role.name === "/admin/dashboard")).length === 0
            // const found=roles.findIndex((row)=>row.name=="/admin/dashboard");
            const found = roles.find((row) => row.name == "/admin-dashboard");
            if (found == undefined) {
                return "/dashboard";

            } else {
                return "/admin-dashboard"
            }
        }

    }

    getUsername() {
        if (this.isAuthenticated()) {
            return localStorage.getItem("username")
        } else {
            return "";
        }
    }


}
export default new AuthService;
