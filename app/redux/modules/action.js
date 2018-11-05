import {
    GET_ACTIVITIES,
    GET_MODULES,
} from './reducer';

export function getModules() {
    return {
        type: GET_MODULES,
        payload: {
            request: {
                url: `/module/board?format=json&start=2018-11-05&end=2018-11-12`,
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
                url: `/course/filter?format=json&preload=1&location%5B%5D=FR&location%5B%5D=FR%2FPAR&course%5B%5D=master%2Fclassic&scolaryear%5B%5D=2018`,
                timeout: 5000,
            }
        }
    };
}