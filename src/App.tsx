import React from 'react';
import './App.css';
import { useState } from 'react';
import NavBar from './components/navBar';
import Settings from './components/settings';
import Login from './components/login';
import CoursePick from './components/coursePick';
import HomePage from './components/homePage';

function App() { //add routes to make current page stuff so if reload, still on schedule page

  const page = {
    "home": 0,
    "schedule": 1,
    "settings": 2,
    "login": 3
  }

  const [loggedIn, setLoggedIn] = useState(0)
  const [currentPage, setCurrentPage] = useState(0) //0 for homepage, 1 for schedule, 2 for settings
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginPage, setLoginPage] = useState(0)

  function switchLoginPage(target: number) {
    if (target === 1) {
        setLoginPage(1)
    }
    else if (target === 0) {
        setLoginPage(0)
    }
  }   


  function handlePassword(event: any): void {
    setPassword( event.target.value )
  }

  function handleUsername(event: any): void {
    setUsername( event.target.value )
  }

  const account: any = {
    "Admin": "Password"
  }

  function handleSignup() {
    console.log(username)
    console.log(password)
  }

  function handleLoginSetting():void {
    if (loggedIn === 0) { //function to log in
      setCurrentPage(3)
    }
    else if (loggedIn === 1){ //function to log out
      setCurrentPage(2)
    }
  }

  function handleLogin(event: any):void {
    if (loggedIn === 1) {
      setCurrentPage(0)
    }
    else if (account[username] === password){
      setLoggedIn(1) //do authentication and what not, hash the password
      setCurrentPage(0)
    }
    else if(username === "" || password === ""){
      alert("Empty Email or Password")
    }
    else {
      alert("Invalid Email or Password")
    }
    event.preventDefault()
  }
  //function to check cookies if logged in
  //function to set logged in when user logs in

  function handleCreate():void {
    setLoginPage(0)
    setCurrentPage(1)
  }

  function handleHome(): void {
    setLoginPage(0)
    setCurrentPage(0)
  }

  function NavBarFull() {
    return (
      <NavBar handleHome = {handleHome} handleCreate = {handleCreate} handleLogin = {handleLoginSetting} loggedIn = {loggedIn}></NavBar> 
    )
  }

  function handleLogOut():void {
    setLoginPage(0)
    setLoggedIn(0)
    setCurrentPage(0)
  }

  return (
    <div className='w-screen h-screen bg-dark'>
      {currentPage === page["home"]? <><NavBarFull></NavBarFull><HomePage></HomePage></> : <></>}
      {currentPage === page["schedule"]?
      <div>
        <NavBarFull></NavBarFull>
        <CoursePick></CoursePick>
      </div>  
      : <></>}
      {currentPage === page["settings"]? 
      <div>
          <NavBarFull></NavBarFull>
          <Settings handleLogOut = {handleLogOut}></Settings>
      </div> : <></>}
      {currentPage === page["login"]? 
      <div>
          <NavBarFull></NavBarFull>
          <Login password = {password} username = {username} switchPage = {switchLoginPage} loginPage = {loginPage} handleSignup = {handleSignup} handleUsername = {handleUsername} handlePassword = {handlePassword} handleLogin = {handleLogin}></Login>
      </div> : <></>}
    </div>
  );
}

export default App;

//add loading screen to everything that accesses backend