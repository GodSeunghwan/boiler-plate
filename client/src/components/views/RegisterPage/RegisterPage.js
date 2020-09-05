import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandle = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandle = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandle = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandle = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandle = (event) => {
        event.preventDefault()

        if(Password !== ConfirmPassword) {
            return alert("비밀번호를 확인해주세요.")
        }
        let body = {
            name: Name,
            email: Email,
            password: Password
        }
        dispatch(registerUser(body))
            .then(res => {
                if (res.payload.success) {
                    alert("회원가입이 완료되었습니다.")
                    props.history.push('/login')
                } else {
                    alert("회원가입에 실패했습니다.")
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
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandle} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandle} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandle} />
                <br />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default RegisterPage
