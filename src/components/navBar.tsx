function NavBar(props: any) {

    function Bar(props: any) {
        return(
            <div className = "w-full bg-nav flex items-center text-white" style={{height: "60px"}}>
                <div onClick = {props.handleHome} className="font-title text-xl ml-5 hover: cursor-pointer">JAC Schedule Builder</div>
                <div onClick={props.handleCreate} className="flex font-navButton text-lg ml-8 hover: cursor-pointer">
                    <div className="">Create</div>
                    <div className="ml-1 rotate-90">{'>'}</div>
                </div>
                <div onClick={props.handleClick} className="bg-navButton mr-0 text-black border-2 border-none h-8 rounded-xl w-24 flex justify-center items-center text-white hover: cursor-pointer bg-selected" style={{marginLeft: ("69vw")}}>
                    <div>{props.word}</div>
                </div>
            </div>
        )
    }
    
    if (props.loggedIn === 0) {
        return( //placeholder arrow, change to different one when internet is on
        <Bar word = "Log In" handleHome = {props.handleHome} handleCreate = {props.handleCreate} handleClick = {props.handleLogin}></Bar>
        )
    }

    return (
        <Bar word = "Settings" handleHome = {props.handleHome} handleCreate = {props.handleCreate} handleClick = {props.handleLogin}></Bar>
    )
}

export default NavBar