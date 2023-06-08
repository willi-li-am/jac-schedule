import { useState } from "react"
import ColorPicker from "./colorPicker"
import { ClipLoader } from "react-spinners"

function HomePage(props: any) {

    if(props.lastPage !== "/") {
        props.setLastPage("/")
    }

    const [showDisclaimer, setShowDisclaimer] = useState(true)

    return(
        <div className="flex flex-col items-center" style={{height: "calc(100vh - 60px)", overflowY: showDisclaimer? 'hidden' : "scroll"}}>
            <div className="text-white font-title mt-10" style={{fontSize: "40px"}}>Mock Visual Schedule Builder for CEGEP</div>
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
            <div className="text-white w-full flex flex-row" style={{height: "55vh", marginTop: "70px", marginBottom: "120px"}}>
                <div className="font-title bg-list flex items-center justify-center" style={{fontSize: "10vh", width: "55vh", height: "55vh", paddingLeft: "5vh", paddingRight: "5vh"}}>Schedule Builder</div>
                <div className="bg-darker flex flex-col justify-around" style={{height: "55vh", fontSize: "2.5vw", padding: "20px", paddingLeft: "5vw", width: "calc(100vw - 50vh)"}}><div className="font-title">Schedule Making made EASY</div><div>With <span className="font-title">everything</span> you need all in <span className="font-title">one</span> place</div></div>
            </div>
            <div className="text-white w-full flex flex-row" style={{height: "55vh", marginBottom: "70px"}}>
                <div className="bg-darker flex flex-col justify-around" style={{height: "55vh", fontSize: "2.5vw", padding: "20px", paddingLeft: "5vw", width: "calc(100vw - 50vh)"}}><div><span className="font-title mr-2">1.</span> Click on Create</div><div><span className="font-title mr-2">2.</span>  Input Course Codes (Progression Chart on Omnivox)</div><div><span className="font-title mr-2">3.</span>  Select courses based on your Preferences</div><div><span className="font-title mr-2">4.</span>  Enjoy your new schedule</div></div>
                <div className="font-title bg-list flex items-center justify-center" style={{fontSize: "10vh", width: "55vh", height: "55vh", paddingLeft: "10vh", paddingRight: "5vh"}}>How To Use?</div>
            </div>
            <div className="text-white w-full flex flex-row" style={{height: "55vh", marginTop: "70px", marginBottom: "120px"}}>
                <div className="font-title bg-list flex items-center justify-center" style={{fontSize: "10vh", width: "55vh", height: "55vh", paddingLeft: "13vh", paddingRight: "5vh"}}>Extra Stuff</div>
                <div className="bg-darker flex flex-col justify-around" style={{height: "55vh", fontSize: "2.5vw", padding: "20px", paddingLeft: "5vw", width: "calc(100vw - 50vh)"}}><div>Follow <a href="https://www.instagram.com/jac.schedule/" className="text-link underline">@JAC.schedule</a> on Instagram for updates</div><div>Tell your friends and peers about JAC Schedule</div><div className="text-white">If you wanna <span className="line-through">give me money</span> donate here's my <a className="text-link underline" href = "https://paypal.me/Trollermaner">paypal</a></div></div>
            </div>
            <div className="bg-nav text-white font-title" style={{height: "60px", width: "calc(100vw - 8px)", padding: "20px"}}>Made by <a href="https://instagram.com/w.liam.li/" className="text-link underline">William Li</a>,<span className="ml-2"></span>current student at the University of Waterloo and former JAC student for one semester (Fall 2022)</div>
        </div>
    )
}

export default HomePage