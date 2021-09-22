import axios from "./axios"
export class DashboardService {

    //Admin 
    getAdminDashboard(){
        return axios.get("/dashboard")

    }

    //Dashobard chart
    getDashboardChartData(){
        return axios.get("/dashboard/chart")
    }

    getUssdSessions(){
        return axios.get("/dashboard/sessions")
    }

}
export default new DashboardService();