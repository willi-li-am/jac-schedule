import { useState } from "react"
import Signup from "./signup"
import LoginPage from "./loginPage"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Login(props: any) { //Make it that it doesnt return you to homepage

    const navigate = useNavigate()

    const account: any = {
        "Admin": "Password"
      }

    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(event: any):void {
        if (props.loggedIn) {
          navigate(props.lastPage)
        }
        else if (account[username] === password){
          props.setLoggedIn(!props.loggedIn) //do authentication and what not, hash the password
          navigate(props.lastPage)
        }
        else if(username === "" || password === ""){
            setError("Empty Email or Password")
        }
        else {
            setError("Invalid Email or Password")
        }
        event.preventDefault()
      }

    function handleSignup(event: any) {
        event.preventDefault()
        //Make an account type shit
    }

    function handlePassword(event: any): void {
        setPassword( event.target.value )
      }
    
      function handleUsername(event: any): void {
        setUsername( event.target.value )
      }

    const pages: any = {
        "login": 0,
        "signup": 1,
        "settingUp": 2
    }

    return(
        <div>
            {props.loginPage === pages["login"]? <LoginPage error = {error} setError = {setError} username = {username} password = {password} switchPage = {props.switchPage} handleUsername= {handleUsername} handlePassword = {handlePassword} handleLogin = {handleLogin}></LoginPage>:<></>}
            {props.loginPage === pages["signup"]? <Signup error = {error} setError = {setError} username = {username} password = {password} switchPage = {props.switchPage} handleUsername = {handleUsername} handlePassword = {handlePassword} handleSignup = {handleSignup}></Signup> : <></>}
        </div>
    )
    
}

export default Login