import googleIcon from "../assets/google_icon.png"
import facebookIcon from "../assets/Facebook_icon.png"


function LoginPage(props: any) {
    return(
        <div className="flex justify-center mt-8 text-white">
            <div className="bg-nav flex flex-col items-center" style = {{
            borderRadius: "10px",
            width: "40vw",
            padding: "30px"
            }}>
               <div className="font-title" style={{fontSize: "2vw", textAlign: "center", marginBottom: "40px"}}>Log In</div>
               <div className="bg-list text-center text-white border-list border-2 p-2 rounded-md hover: cursor-pointer flex flex-row justify-center items-center space-x-2" style={{width: "40%", marginBottom: "20px", fontSize: "1vw"}}><img width = "15%" src= {googleIcon}></img><div>Sign in with Google</div></div>
               <div className="bg-list text-center text-white border-list border-2 p-2 rounded-md hover: cursor-pointer flex flex-row justify-center items-center space-x-2" style={{width: "40%", marginBottom: "20px", fontSize: "1vw"}}><img width = "15%" src= {facebookIcon}></img><div>Sign in with Facebook</div></div>
                {props.error !== ""? <div className = "flex flex-row items-center bg-danger justify-between p-4 rounded-md  "style={{width: "50%", height: "40px"}}>{props.error}<div className="hover:cursor-pointer " onClick = {() => props.setError("")}style={{fontWeight: "bold", fontSize: "20px"}}>&times;</div></div> : <></>}
               <form>
                    <div className="flex flex-col justify-center" style={{marginBottom: "10px"}}>
                            <div style={{marginBottom: "10px"}}>Email</div>
                            <input defaultValue={props.username} onChange = {event => {props.handleUsername(event)}} className="bg-list rounded-md" style={{height: "50px", padding: "10px", width: "30vw"}}></input>
                    </div>
                    <div className="flex flex-col justify-center" style={{marginBottom: "40px"}}>
                            <div style={{marginBottom: "10px"}}>Password</div>
                            <input defaultValue = {props.password} onChange = {event => {props.handlePassword(event)}} type = "password" className="bg-list rounded-md" style={{height: "50px", padding: "10px", width: "30vw"}}></input>
                    </div>
                    <button type = "submit" onClick = {event => {props.handleLogin(event)}} className="bg-list text-center text-white border-list border-2 p-2 rounded-md hover: cursor-pointer" style={{width: "30vw"}}>Log In</button>
                    <div className="flex justify-center mt-10 mb-5">
                        <div>Don't have an account?</div>
                        <div className = "hover: cursor-pointer underline ml-2" onClick={() => {props.switchPage(1); props.setError("")}}>Sign Up</div>
                    </div>
               </form>
            </div>
     </div>)
}

export default LoginPage