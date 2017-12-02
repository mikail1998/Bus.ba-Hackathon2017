import {NotificationManager} from 'react-notifications';

class Notification{
    static show({type, title, message, next}, status) {
        switch (type) {
            case 0:
                NotificationManager.info(message, title, 3000, next);
                break;
            case 1:
                NotificationManager.success(message, title, 3000, next);
                break;
            case 2:
                NotificationManager.warning(message, title, 3000, next);
                break;
            case 3:
                NotificationManager.error(message, title, 3000, next);
                break;
            default:
                break;
        }

    }
}

export default Notification;