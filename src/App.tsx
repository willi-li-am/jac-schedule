import React, { useRef } from 'react';
import './App.css';
import { useState } from 'react';
import NavBar from './components/navBar';
import Settings from './components/settings';
import Login from './components/login';
import CoursePick from './components/coursePick';
import HomePage from './components/homePage';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NoPage from './components/noPage';
import Schedule from './components/schedule';
import { Analytics } from '@vercel/analytics/react';
import { isMobile, isTablet } from 'react-device-detect';
import MobileHome from './components/mobileHomePage';
import CreateMobile from './components/createUnavailable';
import HomePageTop from './components/homePageTop';
import Disclaimer from './components/disclaimer';

function App() { //add routes to make current page stuff so if reload, still on schedule page

    class trieNode {
        childrenList: string[]
        children: { [key: string]: trieNode }
        
        constructor(){
            this.childrenList = []
            this.children = {}
        
        }
        }
        
    class trieTree {
        root: trieNode
        
        constructor(){
            this.root = new trieNode()
        }
        
        insert(word: string) {
            let node = this.root
        
            for (let i = 0; i < word.length; i++){
                if (!(word[i] in node.children)){
                    node.children[word[i]] = new trieNode()
                }
                node = node.children[word[i]];
                if (!(node.childrenList.includes(word))){
                    node.childrenList.push(word)
                }
            }
        }
        
        suggest(input: string) {
            let node = this.root
        
            for (let i = 0; i < input.length; i++){
                if (!(input[i] in node.children)){
                    return null
                }
                node = node.children[input[i]]
                if (i === input.length - 1){
                    return node.childrenList
                }
            }
        }
    }

    const autoComplete: any = useRef(new trieTree())

  const navigate = useNavigate()

  const page = {
    "home": 0,
    "schedule": 1,
    "settings": 2,
    "login": 3
  }
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  //global
  const [update, setUpdate] = useState(false)
  const [lastPage, setLastPage] = useState("/")
  //login
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginPage, setLoginPage] = useState(0)
  //coursePick
  const [courseList, setCourseList] = useState("")
  const inputCode = useRef(null)
  const [courseInfo, setCourseInfo]:any = useState("") //change to hashmap
  const [courseInfoCache, setCourseInfoCache]: any = useState({})
  const [coursePicked, setCoursePicked]:any = useState([])
  const [schedule, setSchedule]: any = useState({
    M: [],
    T: [],
    W: [],
    R: [],
    F: []
  }) //dont save the schedule (do it on frontend)
  const [courseIndexPicked, setCourseIndexPicked]: any = useState({}) //use the section instead of index (makes it easier)

  const [colorList, setColorList]:any = useState({})

  function removeCourseCode(code:string) {
    let index = coursePicked.indexOf(code)

    if (code in courseIndexPicked){
      let courseIndex = courseIndexPicked[code]
      let course = courseInfo[index][courseIndex]
      let scheduleObj = schedule
      let coursePickedObj = courseIndexPicked
      for (const day in scheduleObj) {

          const targetElementIndex = scheduleObj[day].indexOf(course["schedule"][day]);
          scheduleObj[day].splice(targetElementIndex)
          
      }
    
      delete coursePickedObj[code]
    
      setSchedule(scheduleObj)
      setCourseIndexPicked(coursePickedObj)
    }

    let courseArr = coursePicked
    courseArr.splice(index, 1)
    setCoursePicked(courseArr)

    let courseInfoVar = courseInfo
    courseInfoVar.splice(index, 1)
    setCourseInfo(courseInfoVar)

    setUpdate(!update)
  }

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
    navigate(lastPage)
  }

  function clearCourse() {
    let scheduleObj = {
      M: [],
      T: [],
      W: [],
      R: [],
      F: []
    }
    setCourseIndexPicked({})
    setSchedule(scheduleObj)
  }

  function addCourse(course: any, code: any, index: number) {
    let scheduleObj = schedule
    let coursePickedObj = courseIndexPicked

    for (const day in scheduleObj) {
        scheduleObj[day].push(course["schedule"][day])
    }

    coursePickedObj[code] = index

    setSchedule(scheduleObj)
    setCourseIndexPicked(coursePickedObj)
    setUpdate(!update)
}

function addHoverCourse(course: any, code: any, index: number){

}

function removeCourse(course: any, code: any){
  let scheduleObj = schedule
  let coursePickedObj = courseIndexPicked
  for (const day in scheduleObj) {
      const targetElementIndex = scheduleObj[day].indexOf(course["schedule"][day]);
      scheduleObj[day].splice(targetElementIndex, 1)
  }

  delete coursePickedObj[code]

  setSchedule(scheduleObj)
  setCourseIndexPicked(coursePickedObj)
  setUpdate(!update)
} 

function handleColor(input:any, code: any):void {
  let colors = colorList
  colors[code] = {background: input.hex}

  setColorList(colors)
  setUpdate(!update)
}

  return(
    <>
    <Routes>
      {isMobile && !isTablet?<Route path='/' element = {<><NavBarFull></NavBarFull><MobileHome lastPage = {lastPage} setLastPage = {setLastPage}></MobileHome></>}/> : <Route path='/' element = {<div style={{ height: "100vh", overflowY: showDisclaimer? "hidden" : "auto"}}><Disclaimer setShowDisclaimer = {setShowDisclaimer} showDisclaimer = {showDisclaimer}/><HomePageTop/><NavBarFull></NavBarFull><HomePage lastPage = {lastPage} setLastPage = {setLastPage}></HomePage></div>}/>}
      {isMobile && !isTablet? <Route path='/create' element={<div style={{overflow: "hidden"}}><NavBarFull></NavBarFull><CreateMobile/></div>}/> : <Route path='/create' element={<div style={{overflow: "hidden"}}><NavBarFull></NavBarFull>
        <div className='flex'>
        <CoursePick autoComplete = {autoComplete} handleColor = {handleColor} colorList = {colorList} setColorList = {setColorList} removeCourseCode = {removeCourseCode} courseInfoCache = {courseInfoCache} setCourseInfoCache = {setCourseInfoCache} lastPage = {lastPage} setLastPage = {setLastPage} removeCourse = {removeCourse} addCourse = {addCourse} courseIndexPicked = {courseIndexPicked} setCourseIndexPicked = {setCourseIndexPicked} schedule = {schedule} setSchedule = {setSchedule} courseList = {courseList} setCourseList = {setCourseList} inputCode = {inputCode} courseInfo = {courseInfo} setCourseInfo = {setCourseInfo} coursePicked = {coursePicked} setCoursePicked = {setCoursePicked} setUpdate = {setUpdate} update = {update}></CoursePick><Schedule coursePicked = {coursePicked} courseInfo = {courseInfo} courseIndexPicked = {courseIndexPicked} clearCourse = {clearCourse} colorList = {colorList}></Schedule>
        </div></div>}/>}
        
      {loggedIn? <Route path='/settings' element = {<><NavBarFull></NavBarFull><Settings handleLogOut = {handleLogOut}></Settings></>}/> : <Route path='/settings' element = {<Navigate to = "/" replace></Navigate>}/>}
      {loggedIn? <Route path = "/login" element = {<Navigate to = "/" replace></Navigate>}></Route> : <Route path='/login' element = {<><NavBarFull></NavBarFull><Login lastPage = {lastPage} setLoggedIn = {setLoggedIn} loggedIn = {loggedIn} switchPage = {switchLoginPage} loginPage = {loginPage}></Login></>}/> }
      <Route path='*' element = {<><NavBarFull></NavBarFull><NoPage></NoPage></>}></Route>
    </Routes>
    <Analytics/>
    </>
    
  )
}

export default App;

//add loading screen to everything that accesses backend