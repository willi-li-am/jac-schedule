import { useState } from "react"
import ColorPicker from "./colorPicker"

function HomePage(props: any) {

    if(props.lastPage !== "/") {
        props.setLastPage("/")
    }

    const [showDisclaimer, setShowDisclaimer] = useState(true)

    return(
        <div className="flex flex-col items-center">
            <div className="text-white font-title mt-10" style={{fontSize: "30px"}}>Mock Visual Schedule Builder for CEGEP</div>
            <div className="text-white italic" style={{fontSize: "20px", marginTop: ""}}>"inspiring quote about helping students"</div>
            {showDisclaimer?
            <div className = "absolute" style={{width: "100vw", height: "calc(100vh - 60px)"}}>
            <div className = "bg-nav absolute text-white rounded-md p-4 pt-0 z-40" style={{width: "30vw", height: "200px", marginTop: "calc(50vh - 200px)", marginLeft: "35vw"}}>
                <div className="flex justify-between items-center"><div className="font-title">Disclaimer:</div><div className="font-title hover:cursor-pointer" onClick={() => {setShowDisclaimer(false)}} style={{fontSize: "30px"}}>&times;</div></div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">This website should only be used to prepare for official course selection found in Omnivox on the date your CEGEP gives you.</div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">For more questions on course registration, ask your academic advisors!</div>
            </div>
            <div className = "absolute z-1" style={{width: "100vw", height: "calc(100vh - 60px)", backgroundColor: "black", opacity: "90%"}}></div>
            </div>
            : <></>
            }
            <div className="text-white mt-10">
                <div className="font-title">Current Schedule Information:</div>
                <div className="flex flex-row">
                    <div className="border-2 p-2 border-r-0 flex justify-center" style={{width: "200px"}}>John Abbott College:</div><div className="border-2 p-2 flex justify-center" style={{width: "200px"}}>Fall 2023 (May 18th)</div>
                </div>
                <div className="flex flex-row">
                    <div className="border-2 p-2 border-r-0 border-t-0 flex justify-center" style={{width: "200px"}}>Dawson College:</div><div className="border-2 border-t-0 p-2 flex justify-center" style={{width: "200px"}}>Coming Soon</div>
                </div>
                <div className="flex flex-row">
                    <div className="border-2 p-2 border-t-0 border-r-0 flex justify-center" style={{width: "200px"}}>Vanier College:</div><div className="border-2 p-2 flex border-t-0 justify-center" style={{width: "200px"}}>Coming Soon</div>
                </div>
            </div>
            <div className="text-white w-full flex flex-row" style={{height: "400px"}}>
                <div className="font-title bg-list flex items-center justify-center" style={{fontSize: "70px", width: "400px", height: "400px", paddingLeft: "40px"}}>Schedule Builder</div>
                <div className="bg-darker flex flex-col justify-around" style={{height: "400px", fontSize: "40px", padding: "20px", paddingLeft: "40px", width: "calc(100vw - 400px)"}}><div className="font-title">Schedule Making made EASY</div><div>With <span className="font-title">everything</span> you need all in <span className="font-title">one</span> place</div></div>
            </div>
            <div className="text-white">If you wanna give me money here's my <a className="text-link" href = "https://paypal.me/Trollermaner">paypal</a></div>
        </div>
    )
}

export default HomePage