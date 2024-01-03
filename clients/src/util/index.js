import { notification } from "antd"
const successNoti = (type) => {
    notification.success({
        message: type,
        style: {
            top: 100,
        },
    });
}
const failedNoti = (type) => {
    notification.error({
        message: type,
        style: {
            top: 100,
        },
    });
}
export { successNoti, failedNoti }