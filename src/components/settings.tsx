function Settings(props: any) {
    return(
        <div className="flex justify-center mt-16 text-white">
            <div className="bg-nav " style = {{
            borderRadius: "10px",
            height: "80vh",
            width: "70vw",
            overflowY: "scroll",
            padding: "30px"
            }}>
                <div className="font-title" style={{fontSize: "2vw", textAlign: "center", marginBottom: "40px"}}>Settings</div>
                <div>
                    <div className="font-title" style={{fontSize: "1.5vw", textAlign: "center"}}>Filters</div>
                </div>
                <div className = "flex flex-col items-center space-y-4"style={{marginTop: "40px"}}>
                    <div className="font-title" style={{fontSize: "1.5vw"}}>Account</div>
                    <div className = "font-navButton">
                        <div onClick = {props.handleLogOut} className="bg-nav text-white duration-200 border-danger border-2 p-2 rounded-md hover: cursor-pointer hover:bg-danger">Log Out</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings