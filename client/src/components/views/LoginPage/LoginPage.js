import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandle = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandle = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandle = (event) => {
        event.preventDefault()
        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
        .then(res => {
            if(res.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert("Error")
            }
        })
        
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandle}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandle} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandle} />
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginPage