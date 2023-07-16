import jac_logo from "../assets/jac_logo.png"
import dawson_logo from "../assets/dawson_logo.png"

export default function SchoolPick(props: any){
    return(
        <div className="absolute">
            <div className="absolute text-white" style={{width: "100vw", height: "calc(100vh - 60px)", zIndex: "10000000"}}>
                <div className="flex flex-col items-center justify-center">
                    <div className="font-title text-center" style={{fontSize: "50px", marginTop: "40px"}}>Pick a CEGEP</div>
                    <div className="flex flex-row justify-center space-x-16 items-center" style={{width: "60vw", height: "calc(90vh - 200px)"}}>
                        <div onClick={() => props.pickSchool("JAC")} className="flex flex-row justify-between bg-black rounded-md space-x-2 hover:cursor-pointer hover:scale-105 duration-150" style={{height: "60px", padding: "5px", paddingRight: "10px"}}>
                            <img className="flex items-center justify-center object-cover" src = {jac_logo} style={{height: "50px", width: "50px"}}></img>
                            <div className="text-center font-title flex items-center">John Abbott College</div>
                        </div>
                        <div onClick ={()=> props.pickSchool("DAWSON")} className="flex flex-row justify-between bg-black rounded-md space-x-2 hover:cursor-pointer hover:scale-105 duration-150" style={{height: "60px", padding: "5px", paddingRight: "10px"}}>
                            <img className="flex items-center justify-center object-cover" src = {dawson_logo} style={{height: "50px", width: "50px"}}></img>
                            <div className="text-center font-title flex items-center">Dawson College</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bg-darker opacity-90" style={{width: "100vw", height: "calc(100vh - 60px)", zIndex: "10000"}}></div>
        </div>
    )
}