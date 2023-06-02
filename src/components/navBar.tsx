import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Outlet, Link } from "react-router-dom";

function NavBar(props: any) {

    const [createPop, setCreatePop] = useState(false)

    function pop(){
        setCreatePop(!createPop)
    }

    function Bar(props: any) {
        return(
            <div className = "w-full bg-nav flex items-center justify-between text-white pl-5 pr-5" style={{height: "60px"}}>
                <div className='flex'>
                    <Link to = "/" className="font-title text-xl hover: cursor-pointer">JAC Schedule Builder</Link>
                    <Link to = "/create" className="flex justify-center items-center font-navButton text-lg ml-8 hover: cursor-pointer">
                        <div className="">Create</div>
                        {createPop? <FontAwesomeIcon icon={faChevronDown} style={{color: "#ffffff", marginLeft: "5px", marginTop: "0px"}} /> : <FontAwesomeIcon icon={faChevronUp} style={{color: "#ffffff", marginLeft: "5px", marginTop: "0px"}} />}
                </Link>
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
        <Bar word = "Log In" handleHome = {props.handleHome} handleCreate = {props.handleCreate} handleClick = {props.handleLogin}></Bar>
        )
    }

    return (
        <Bar word = "Settings" handleHome = {props.handleHome} handleCreate = {props.handleCreate} handleClick = {props.handleLogin}></Bar>
    )
}

export default NavBar