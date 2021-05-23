
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
    ,LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT} from "../types"

const user=JSON.parse(sessionStorage.getItem("user"))
const token=JSON.parse(sessionStorage.getItem("token"))
const username=JSON.parse(sessionStorage.getItem("username"))

let initialState={}
if(user!=null && token !=null & username!=null & token.length>0){
    initialState={
        isLoggedIn:true,
        user:user, 
        username:username
    }
}else{
    initialState={
        isLoggedIn:false,
        user:null,
        username:null
    }
}

export default function (state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn:false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn:true
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn:false,
                user:null,
                username:null
            }
        default:
            return state
    }
}
