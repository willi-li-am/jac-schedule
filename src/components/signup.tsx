function Signup(props: any) {
    return (
        <div className="flex justify-center mt-16 text-white">
        <div className="bg-nav flex flex-col items-center" style = {{
        borderRadius: "10px",
        width: "40vw",
        padding: "30px"
        }}>
           <div className="font-title" style={{fontSize: "2vw", textAlign: "center", marginBottom: "40px"}}>Sign Up</div>
           <form>
                <div className="flex flex-col justify-center" style={{marginBottom: "10px"}}>
                        <div style={{marginBottom: "10px"}}>Email</div>
                        <input defaultValue={props.username} onChange = {event => {props.handleUsername(event)}} className="bg-list rounded-md" style={{height: "50px", padding: "10px", width: "30vw"}}></input>
                </div>
                <div className="flex flex-col justify-center" style={{marginBottom: "40px"}}>
                        <div style={{marginBottom: "10px"}}>Password</div>
                        <input defaultValue = {props.password} onChange = {event => {props.handlePassword(event)}} type = "password" className="bg-list rounded-md" style={{height: "50px", padding: "10px", width: "30vw"}}></input>
                </div>
                <button type = "submit" onClick = {event => {props.handleLogin(event)}} className="bg-list text-center text-white border-list border-2 p-2 rounded-md hover: cursor-pointer" style={{width: "30vw"}}>Sign Up</button>
                <div className="flex justify-center mt-10 mb-5">
                    <div className = "hover: cursor-pointer underline" onClick={() => props.switchPage(0)}>Already have an account?</div>
                </div>
           </form>
        </div>
    </div>)
}

export default Signup