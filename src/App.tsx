import React from 'react';
import './App.css';
import { useState } from 'react';
import NavBar from './components/navBar';
import Settings from './components/settings';
import Login from './components/login';
import CoursePick from './components/coursePick';
import HomePage from './components/homePage';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import NoPage from './components/noPage';

function App() { //add routes to make current page stuff so if reload, still on schedule page

  const navigate = useNavigate()

  const page = {
    "home": 0,
    "schedule": 1,
    "settings": 2,
    "login": 3
  }

  const [loggedIn, setLoggedIn] = useState(false)
  const [loginPage, setLoginPage] = useState(0)
  const [courseList, setCourseList] = useState("")
  const [inputCode, setInputCode] = useState("")  
  const [courseInfo, setCourseInfo]:any = useState("")
  const [coursePicked, setCoursePicked]:any = useState([])
  const [schedule, setSchedule] = useState({
    M: [],
    T: [],
    W: [],
    R: [],
    F: []
  })
  const [courseIndexPicked, setCourseIndexPicked] = useState({})

  function switchLoginPage(target: number) {
    if (target === 1) {
        setLoginPage(1)
    }
    else if (target === 0) {
        setLoginPage(0)
    }
  }   

  function handleLoginSetting():void {
    if (!loggedIn) { //function to log in
      navigate("/login")
    }
    else if (loggedIn){ //function to log out
      navigate("/settings")
    }
  }


  //function to check cookies if logged in
  //function to set logged in when user logs in

  function handleCreate():void {
    setLoginPage(0)
  }

  function handleHome(): void {
    setLoginPage(0)
    navigate("/")
  }

  function NavBarFull() {
    return (
      <NavBar handleHome = {handleHome} handleCreate = {handleCreate} handleLogin = {handleLoginSetting} loggedIn = {loggedIn}></NavBar> 
    )
  }

  function handleLogOut():void {
    setLoginPage(0)
    setLoggedIn(!loggedIn)
    navigate("/")
  }

  return(

    <Routes>
      <Route path='/' element = {<><NavBarFull></NavBarFull><HomePage></HomePage></>}/>
      <Route path='/create' element={<><NavBarFull></NavBarFull><CoursePick courseIndexPicked = {courseIndexPicked} setCourseIndexPicked = {setCourseIndexPicked} schedule = {schedule} setSchedule = {setSchedule} courseList = {courseList} setCourseList = {setCourseList} inputCode = {inputCode} setInputCode = {setInputCode} courseInfo = {courseInfo} setCourseInfo = {setCourseInfo} coursePicked = {coursePicked} setCoursePicked = {setCoursePicked}></CoursePick></>}/>
      {loggedIn? <Route path='/settings' element = {<><NavBarFull></NavBarFull><Settings handleLogOut = {handleLogOut}></Settings></>}/> : <Route path='/settings' element = {<Navigate to = "/" replace></Navigate>}/>}
      {loggedIn? <Route path = "/login" element = {<Navigate to = "/" replace></Navigate>}></Route> : <Route path='/login' element = {<><NavBarFull></NavBarFull><Login setLoggedIn = {setLoggedIn} loggedIn = {loggedIn} switchPage = {switchLoginPage} loginPage = {loginPage}></Login></>}/> }
      <Route path='*' element = {<><NavBarFull></NavBarFull><NoPage></NoPage></>}></Route>
    </Routes>
    
  )
}

export default App;

//add loading screen to everything that accesses backend