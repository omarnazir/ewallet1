import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
    ,LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT} from "../types"
import {AuthService} from "../../services"


export const LoginAction=(loginData)=>(dispatch)=>{
    return AuthService.login(loginData).then(
        (data)=>{
            dispatch({
                type:LOGIN_SUCCESS,
                payload:{user:data}
            })
            return Promise.resolve();
        },(err)=>{
            dispatch({
                type:LOGIN_FAIL
            })
            return Promise.reject();
        }
    )
}

export const Logout=()=>(dispatch)=>{
    AuthService.logout();
    dispatch({
        type:LOGOUT
    })
}