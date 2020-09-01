import axios from 'axios'
import { LOGIN_USER } from './types'

export function loginUser(dataToSubmit) {
    const req = axios.post('/api/users/login', dataToSubmit)
        .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: req,

    }
}