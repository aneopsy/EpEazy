import {
    GET_NOTIFICATION_MESSAGE,
    GET_NOTIFICATION_ALERT,
    GET_NOTIFICATION_COMING,
} from './reducer';

export function getNotificationMessage() {
    return {
        type: GET_NOTIFICATION_MESSAGE,
        payload: {
            request: {
                url: `/user/notification/message?format=json`,
                timeout: 5000,
            }
        }
    };
}

export function getNotificationAlert() {
    return {
        type: GET_NOTIFICATION_ALERT,
        payload: {
            request: {
                url: `/user/notification/alert?format=json`,
                timeout: 5000,
            }
        }
    };
}

export function getNotificationComing() {
    return {
        type: GET_NOTIFICATION_COMING,
        payload: {
            request: {
                url: `/user/notification/coming?format=json`,
                timeout: 5000,
            }
        }
    };
}