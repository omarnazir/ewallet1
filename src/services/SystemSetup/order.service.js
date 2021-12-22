import axios from "../axios";
class OrderService {
    //Admin 
    getAllOrders = () => {
        return axios.get("/farmer-input-order/all");
    };

    declineOrder = (id) => {
        const data = {
            id: id
        };
        return axios.put('/farmer-input-order/decline', data);
    };

    approveOrder = (id) => {
        const data = {
            id: id
        }

        return axios.put("/farmer-input-order/approve", data)
    }
}

export default new OrderService;