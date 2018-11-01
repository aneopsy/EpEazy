export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

export default function reducer(state = {
    profile: undefined
}, action) {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state,
                loading: true
            };
        case GET_PROFILE_SUCCESS: {
            return { ...state,
                loading: false,
                profile: action.payload.data
            };
        }
        case GET_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching profile'
            };
        default:
            return state;
    }
}

export function getProfile() {
    return {
        type: GET_PROFILE,
        payload: {
            request: {
                url: `/user?format=json`
            }
        }
    };
}