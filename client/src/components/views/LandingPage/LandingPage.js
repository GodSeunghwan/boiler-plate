import React from 'react'
import axios from 'axios'

function LandingPage(props) {
    const logoutHandle = () => {
        axios.get('api/users/logout')
            .then(res => {
                if(res.data.success){
                    props.history.push("/login")
                } else {
                    alert("로그아웃 실패")
                }
            })
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <h2>시작 페이지</h2>
            <input onClick={logoutHandle} type="button" value="로그아웃" />
        </div>
    )
}

export default LandingPage