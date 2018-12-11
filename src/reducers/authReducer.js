import { USER_LOGIN_SUCCESS, 
         LOGIN_SYSTEM_ERROR, 
         AUTH_LOADING, 
         LOGOUT,
         COOKIE_CHECKED } from '../actions/types';
//global state diisi dengan objek
const INITIAL_STATE = { username: '', email: '', error: '', loading: false, cookie: false };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case USER_LOGIN_SUCCESS :
        //menggunakan ... untuk merubah value jika ada tetap jika tidak ada menambahkan value
            return { ...INITIAL_STATE, username: action.payload.username, email: action.payload.email, cookie: true }
        case LOGIN_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error: action.payload, cookie: true }
        case AUTH_LOADING :
            //mereturn rubah state loading yg awalnya false jadi true
            return { ...state, loading: true}//merubah state terakhir dari loading false menjadi true
        case LOGOUT :
        //... adalah utk mengambil paramater semua yg ada di initial state
            return { ...INITIAL_STATE, cookie: true } 
        case COOKIE_CHECKED :
            return { ...INITIAL_STATE, cookie: true }
        default :
            return state;
    }
}