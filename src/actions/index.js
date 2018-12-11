import axios from 'axios';
import { USER_LOGIN_SUCCESS, 
         LOGIN_SYSTEM_ERROR, 
         AUTH_LOADING, 
         LOGOUT, 
         COOKIE_CHECKED, 
         SELECT_POPOK} from './types'

export const onUserRegister = ({username, email, phone, password}) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || email === '' || phone === '' || password === '' ) {
            dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!'})
        }
        else {
            axios.get('http://localhost:1997/users',{
                params: {
                    username
                }
            }).then((res) => {
                if(res.data.length === 0){
                    axios.post('http://localhost:1997/users',{
                    username, email, password, phone
                    })
                    .then((res) => {
                        console.log(res)
                        dispatch({type: USER_LOGIN_SUCCESS, payload: username})
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch({type: LOGIN_SYSTEM_ERROR, payload: 'System Error'})
                    })
                }
                else{
                    dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'Username has been taken'})
                }

            }).catch((err) =>{
                dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'System Error'})
            })  
        }
    }
}

export const onUserLogout = () => {
    return { type: LOGOUT }
}
//action creator adalah function yg digunakan utk kebutuhan merubah global state
//dan dispatch dikirim ke redux thunk gunanya spy bisa return, tidak hny objek tp bisa berupa return function, function tsb dikirim ke redux thunk,
export const onUserLogin = ({ username, password }) => {//objek username & password terima 1 parameter lg, krn sdh di destructuring maka tidak perlu bikin variabel lg di bawah, isi text box dikirim ke funct ini.
    return (dispatch) => {//funct ini blm dipakai tp hny dibuat
        //gunanya dispatch adalah function yg dikirim dari action ke reducer, dlm baris dibawah ini adalah utk masuk ke reducer dgn type auth loading, dan action ini kirim ke semua reducer yg menunjuk pada case yg dituju
        //return hny bisa
        dispatch({ type: AUTH_LOADING }) // tombol berubah jadi loading
        // setTimeout(() => loginYok(dispatch,username,password), 2000);
        loginYok(dispatch,username,password);//penjelasannya adalah dispatch sebuah function, username & password adalah string, ini dipakai lagi utk 
        //jd parameter di function loginYok
    }
}

var loginYok = (dispatch,username,password) => {
    //get ke api dgn tabel user berdasarkan username & password, cek data dr texbox ada atau tidak di database
    axios.get('http://localhost:1997/users', {
            params: {
                username,
                password
            }
            //jika tidak ada error sistem maka akan masuk ke .then dibawah
        }).then((res) => {//.then adalah function dgn paramater res tp function res blm dijalankan, akan dijalankan ketika akan memberikan response
            console.log(res)
            //res adalah response objek berisi properti array data & ada status
            //jika tidak ada dalam database maka akan berisi objek array kosong
            if (res.data.length > 0) {//yg diambil dalam response adalah properti data
                //dispatch utk mengirim action ke reducer
                //redux thunk utk melakukan asynchronous & melakukan dispatch lebih dari 1x
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, username }//objek yg berisi email & username
                    //
                })
            }
            else {
                //return action dgn type dibawah ini
                dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'Username or password invalid' })
            }
            //jika error sistem masuk .catch
        }).catch((err) => {
            console.log(err)
            dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'System Error' })
        })
}

export const keepLogin = (username) =>{
    return (dispatch) => {
        axios.get('http://localhost:1997/users', {
            params: {
                username
            }
            //untuk mengecek di API user login tersebut ada atau tidak di API
        }).then((res) => {
            //res objek data adlah array
            if(res.data.length > 0){
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: { email: res.data[0].email, username }
                })
            }
        })
    }
}

export const cookieChecked = () => {
    return { type : COOKIE_CHECKED }
}



//dari komponen ke action creator kirim function lagi ke semua reducer trs dikirim ke case yg dituju

// export const onUserLogin = ({ username, password }) => {
//     return (dispatch) => {
//         dispatch({ type: AUTH_LOADING })
//         //ambil data di fake api json
//         axios.get('http://localhost:1997/users', {
//             //ambil properti username & password di data.json
//             params: {
//                 username,
//                 password
//             }
//         }).then((res) => {
//             console.log(res)
//             if(res.data.length > 0) {
//                 dispatch({type: USER_LOGIN_SUCCESS, payload: username})
//             }
//             else {
//                 dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'Username or password invalid'})
//             }
//         }).catch((err) => {
//             console.log(err)
//             dispatch({type: LOGIN_SYSTEM_ERROR, payload: 'System error'})
//         })
//     }
// }

export const select_popok = (selectedPopok) => {
    return {
        type: SELECT_POPOK,
        payload: selectedPopok
    }
}




//dengan menggunakan redux-thunk sbg middleware spy action creator bisa melakukan asynchronous, kedua action creator bisa ->
//melakukan kirim lebih dari 1 action