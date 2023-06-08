import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Outlet, Link } from "react-router-dom";

function NavBar(props: any) {

    const [createPop, setCreatePop] = useState(false)

    function Bar(props: any) {
        return(
            <div className = "sticky top-0 w-full bg-nav flex items-center justify-between text-white pl-5 pr-5" style={{height: "60px"}}>
                <div className='flex'>
                    <Link to = "/" className="font-title text-xl hover: cursor-pointer">JAC Schedule Builder</Link>
                    <div>
                        <div onClick = {() => {setCreatePop(!createPop)}}className="flex justify-center items-center font-navButton text-lg ml-8 hover: cursor-pointer select-none">
                        {props.loggedIn? <div className="">Create</div> : <Link to = "/create">Create</Link>}
                        {props.loggedIn? <>{createPop? <FontAwesomeIcon icon={faChevronDown} style={{color: "#ffffff", marginLeft: "5px", marginTop: "0px"}} /> : <FontAwesomeIcon icon={faChevronUp} style={{color: "#ffffff", marginLeft: "5px", marginTop: "0px"}} />}</> : <></>}
                        </div>
                        {props.loggedIn? <>{createPop? <div className='absolute bg-dark flex flex-col items-center justify-end' style={{ width: "200px", marginTop: "19px"}}>
                            <Link style={{height: "60px", width: "200px", padding: "10px", marginBottom: "3px"}} className='bg-nav flex justify-center items-center hover:bg-slate-700 duration-200' to = "/create">Create New Schedule</Link>
{/*Change Link Here*/}                            <div style={{height: "60px",  width: "200px", padding: "10px"}} className='bg-nav flex justify-center items-center hover:cursor-pointer hover:bg-slate-700 duration-200' >Saved Schedules</div>   
                        </div> : <></>} </>: <></>} 
                    </div>
                </div>
                {props.word == "Log In"? <Link to = "/login" className="bg-navButton mr-0 border-2 border-none h-8 rounded-xl w-24 flex justify-center items-center text-white hover: cursor-pointer bg-selected">
                    <div>{props.word}</div>
                </Link> :
                <Link to = "/settings" className="bg-navButton mr-0 border-2 border-none h-8 rounded-xl w-24 flex justify-center items-center text-white hover: cursor-pointer bg-selected">
                <div>{props.word}</div>
            </Link>}
            </div>
        )
    }
    
    if (!props.loggedIn) {
        return( //placeholder arrow, change to different one when internet is on
        <Bar word = "Log In" loggedIn = {props.loggedIn} handleHome = {props.handleHome} handleCreate = {props.handleCreate} handleClick = {props.handleLogin}></Bar>
        )
    }

    return (
        <Bar word = "Settings" loggedIn = {props.loggedIn} handleHome = {props.handleHome} handleCreate = {props.handleCreate} handleClick = {props.handleLogin}></Bar>
    )
}

export default NavBar