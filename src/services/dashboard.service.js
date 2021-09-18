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

}
export default new DashboardService();