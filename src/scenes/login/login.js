import React, { useState } from "react";
import { useAuth } from "../../stores/auth";
import LoginCard from "../../components/cards/login-card/login-card";
import { getAccessToken, getUserProfile } from "../../services/user";
import Styles from "./login.module.css";


export default function Login(){

    const { setToken } = useAuth(state => ({ setToken: state.setToken }))
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
        getAccessToken(mail, password)
        .then(res => {
            setToken(res.token)
        })
    }

    return(
        <>
           <LoginCard 
           login={login} 
           mail={mail}
           setMail={setMail}
           setPassword={setPassword}
           password={password}/>
        </>
    )
}