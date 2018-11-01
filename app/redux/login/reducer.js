export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const REMEMBER_ME = 'REMEMBER_ME';

export default function reducer(state = {
    user: null,
    loading: false,
    error: null,
    isLoggingIn: false,
    rememberMe: false,
}, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            {
                return { ...state,
                    loading: false,
                    isLoggingIn: true,
                    user: { ...action.payload.data,
                        accessToken: action.payload.headers['set-cookie'][0]
                    },
                };
            }
        case LOGIN_FAIL:
            {
                console.log(action)
                return { ...state,
                    loading: false,
                    error: action.error
                };
            }
        case LOGOUT:
            {
                return { ...state,
                    loading: true,
                    isLoggingIn: false,
                };
            }
        case REMEMBER_ME:
            return { ...state,
                rememberMe: action.payload
            };
        default:
            return state;
    }
}