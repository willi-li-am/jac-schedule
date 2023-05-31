import { useState } from "react"
import Signup from "./signup"
import LoginPage from "./loginPage"

function Login(props: any) { //Make it that it doesnt return you to homepage


    const pages: any = {
        "login": 0,
        "signup": 1,
        "settingUp": 2
    }

    return(
        <div>
            {props.loginPage === pages["login"]? <LoginPage username = {props.username} password = {props.password} switchPage = {props.switchPage} handleUsername= {props.handleUsername} handlePassword = {props.handlePassword} handleLogin = {props.handleLogin}></LoginPage>:<></>}
            {props.loginPage === pages["signup"]? <Signup username = {props.username} password = {props.password} switchPage = {props.switchPage} handleUsername = {props.handleUsername} handlePassword = {props.handlePassword} handleSignup = {props.handleSignup}></Signup> : <></>}
        </div>
    )
    
}

export default Login