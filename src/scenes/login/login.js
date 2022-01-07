import React, { useState } from "react";
import { useAuth } from "../../stores/auth";
import LoginCard from "../../components/cards/login-card/login-card";
import { getAccessToken, getUserProfile } from "../../services/user";
import Styles from "./login.module.css";
import { useNavigate } from "react-router-dom";


export default function Login(){

    const { setToken } = useAuth(state => ({ setToken: state.setToken }))
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        getAccessToken(mail, password)
        .then(res => {
            sessionStorage.setItem("TOKEN", res.token)
            setToken(res.token)
            navigate("/")
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