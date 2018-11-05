export const GET_MODULES = 'GET_MODULES';
export const GET_MODULES_SUCCESS = 'GET_MODULES_SUCCESS';
export const GET_MODULES_FAIL = 'GET_MODULES_FAIL';

export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITIES_SUCCESS = 'GET_ACTIVITIES_SUCCESS';
export const GET_ACTIVITIES_FAIL = 'GET_ACTIVITIES_FAIL';

export default function reducer(state = {
        message: [],
        alert: [],
        coming: [],
}, action) {
    switch (action.type) {
        //MESSAGE
        case GET_MODULES:
            return { ...state,
                loading: true
            };
        case GET_MODULES_SUCCESS:
            {
                return { ...state,
                    loading: false,
                    message: Object.keys(action.payload.data).length ? action.payload.data : []
                };
            }
        case GET_MODULES_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching notification message'
            };
            //ALERT
        case GET_ACTIVITIES:
            return { ...state,
                loading: true
            };
        case GET_ACTIVITIES_SUCCESS:
            {
                return { ...state,
                    loading: false,
                    alert: Object.keys(action.payload.data).length ? action.payload.data : []
                };
            }
        case GET_ACTIVITIES_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching notification alert'
            };
        default:
            return state;
    }
}