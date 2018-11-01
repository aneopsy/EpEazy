export const GET_NOTIFICATION_MESSAGE = 'GET_NOTIFICATION_MESSAGE';
export const GET_NOTIFICATION_MESSAGE_SUCCESS = 'GET_NOTIFICATION_MESSAGE_SUCCESS';
export const GET_NOTIFICATION_MESSAGE_FAIL = 'GET_NOTIFICATION_MESSAGE_FAIL';

export const GET_NOTIFICATION_ALERT = 'GET_NOTIFICATION_ALERT';
export const GET_NOTIFICATION_ALERT_SUCCESS = 'GET_NOTIFICATION_ALERT_SUCCESS';
export const GET_NOTIFICATION_ALERT_FAIL = 'GET_NOTIFICATION_ALERT_FAIL';

export const GET_NOTIFICATION_COMING = 'GET_NOTIFICATION_COMING';
export const GET_NOTIFICATION_COMING_SUCCESS = 'GET_NOTIFICATION_COMING_SUCCESS';
export const GET_NOTIFICATION_COMING_FAIL = 'GET_NOTIFICATION_COMING_FAIL';

export default function reducer(state = {
        message: [],
        alert: [],
        coming: [],
}, action) {
    switch (action.type) {
        //MESSAGE
        case GET_NOTIFICATION_MESSAGE:
            return { ...state,
                loading: true
            };
        case GET_NOTIFICATION_MESSAGE_SUCCESS:
            {
                return { ...state,
                    loading: false,
                    message: Object.keys(action.payload.data).length ? action.payload.data : []
                };
            }
        case GET_NOTIFICATION_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching notification message'
            };
            //ALERT
        case GET_NOTIFICATION_ALERT:
            return { ...state,
                loading: true
            };
        case GET_NOTIFICATION_ALERT_SUCCESS:
            {
                return { ...state,
                    loading: false,
                    alert: Object.keys(action.payload.data).length ? action.payload.data : []
                };
            }
        case GET_NOTIFICATION_ALERT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching notification alert'
            };
            //COMING
        case GET_NOTIFICATION_COMING:
            return { ...state,
                loading: true
            };
        case GET_NOTIFICATION_COMING_SUCCESS:
            {
                return { ...state,
                    loading: false,
                    coming: Object.keys(action.payload.data).length ? action.payload.data : []
                };
            }
        case GET_NOTIFICATION_COMING_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching notification coming'
            };
        default:
            return state;
    }
}