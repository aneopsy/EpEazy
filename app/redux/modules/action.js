import {
    GET_ACTIVITIES,
    GET_MODULES,
} from './reducer';

export function getModules() {
    return {
        type: GET_MODULES,
        payload: {
            request: {
                url: `/user/module/board?format=json&start=2018-11-05&end=2018-11-12`,
                timeout: 5000,
            }
        }
    };
}

export function getActivities() {
    return {
        type: GET_ACTIVITIES,
        payload: {
            request: {
                url: `/user/module/board?format=json&start=2018-11-05&end=2018-11-12`,
                timeout: 5000,
            }
        }
    };
}