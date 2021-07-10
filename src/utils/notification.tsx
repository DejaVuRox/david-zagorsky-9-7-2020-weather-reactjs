import {Notification} from '../components/antd/antd'

export const errorNotification = (errorMsg: string) => {
    Notification['error']({
        message: 'Something went wrong',
        description: errorMsg
    })
}
