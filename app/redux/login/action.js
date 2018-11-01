import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REMEMBER_ME,
} from './reducer';

export function userLogin(user) {
    return {
        type: LOGIN,
        payload: {
            request: {
                url: `/login`,
                method: 'post',
                withCredentials: true,
                data: {
                    login: user.login,
                    password: user.password,
                    format: "json"
                },
            }
        }
    };
}

export function userLoginError(error) {
    return {
        type: LOGIN_FAILED,
        payload: error
    };
}

export function rememberMe(value) {
    return {
        type: REMEMBER_ME,
        payload: value
    };
}