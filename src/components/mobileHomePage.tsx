import { useState } from "react"

function MobileHome(props: any) {
    if(props.lastPage !== "/") {
        props.setLastPage("/")
    }

    const [showDisclaimer, setShowDisclaimer] = useState(true)

    return(
        <div className="flex flex-col items-center" style={{height: "calc(100vh - 60px)", overflowY: showDisclaimer? 'hidden' : "scroll"}}>
            <div className="text-white font-title mt-10 text-center p-4 pt-0 pb-0" style={{fontSize: "25px"}}>Mock Visual Schedule Builder for CEGEP</div>
            <div className="text-white italic" style={{fontSize: "15px", marginTop: ""}}>"inspiring quote about helping students"</div>
            {showDisclaimer?
            <div className = "absolute" style={{width: "100vw", height: "calc(100vh - 60px)"}}>
            <div className = "bg-nav absolute text-white rounded-md p-2 pt-0 z-40 overflow-hidden" style={{width: "300px", height: "180px", marginTop: "calc(50vh - 200px)", marginLeft: "calc(50vw - 150px)"}}>
                <div className="flex justify-between items-center"><div className="font-title">Disclaimer:</div><div className="font-title hover:cursor-pointer" onClick={() => {setShowDisclaimer(false)}} style={{fontSize: "25px"}}>&times;</div></div>
                <div className="flex items-center justify-center font-navButton text-justify" style={{fontSize: "14px"}}>This website should only be used to prepare for official course selection found in Omnivox on the date your CEGEP gives you.</div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify" style={{fontSize: "14px"}}>For more questions on course registration, ask your academic advisors!</div>
            </div>
            <div className = "absolute z-1" style={{width: "100vw", height: "calc(100vh - 60px)", backgroundColor: "black", opacity: "90%"}}></div>
            </div>
            : <></>
            }
            <div className="text-white mt-10 flex flex-col justify-center items-center">
                <div className="font-title" style={{fontSize: "13px"}}>Current Schedule Information:</div>
                <div className="flex flex-row">
                    <div className="border-2 p-2 border-r-0 flex justify-center text-center items-center" style={{width: "40vw", fontSize: ".8rem"}}>John Abbott College:</div><div className="border-2 p-2 flex justify-center" style={{width: "40vw", fontSize: ".8rem" }}>Fall 2023 (June 15th)</div>
                </div>
                <div className="flex flex-row">
                    <div className="border-2 p-2 border-r-0 border-t-0 flex justify-center text-center items-center" style={{width: "40vw", fontSize: ".8rem"}}>Dawson College:</div><div className="border-2 border-t-0 p-2 flex justify-center" style={{width: "40vw", fontSize: ".8rem" }}>Coming Soon!</div>
                </div>
                <div className="flex flex-row">
                    <div className="border-2 p-2 border-r-0 border-t-0 flex justify-center text-center items-center" style={{width: "40vw", fontSize: ".8rem"}}>Vanier College:</div><div className="border-2 border-t-0 p-2 flex justify-center" style={{width: "40vw", fontSize: ".8rem" }}>Coming Soon!</div>
                </div>
            </div>
            <div className="w-full text-white">
                <div className="bg-list font-title mt-10 p-4" style={{fontSize: "2rem"}}>Schedule Builder</div>
                <div className="bg-darker flex flex-col p-4" style={{fontSize: "1rem"}}><div className="font-title">Schedule Making made Easy</div><div>with <span className = "font-title">everything</span> you need in <span className = "font-title">one</span> place</div></div>
            </div>
            <div className="w-full text-white">
                <div className="bg-list font-title p-4 text-right" style={{fontSize: "2rem"}}>How To Use?</div>
                <div className="bg-darker flex flex-col p-2 pl-4 pt-4" style={{fontSize: "1rem"}}><div><span className="font-title mr-2">1.</span>Click on Create <span style={{fontSize: ".6rem"}}>(only available on computers and tablets)</span></div></div>
                <div className="bg-darker flex flex-col p-2 pl-4" style={{fontSize: "1rem"}}><div><span className="font-title mr-2">2.</span>Input course codes <span style={{fontSize: ".6rem"}}>(progression chart in Omnivox)</span></div></div>
                <div className="bg-darker flex flex-col p-2 pl-4" style={{fontSize: "1rem"}}><div><span className="font-title mr-2">3.</span>Select courses based on your preferences</div></div>
                <div className="bg-darker flex flex-col p-2 pl-4 pb-4" style={{fontSize: "1rem"}}><div><span className="font-title mr-2">4.</span>Enjoy your new schedule</div></div>
            </div>
            <div className="bg-nav text-white font-title" style={{height: "auto", width: "calc(100vw - 8px)", padding: "20px"}}>Made by <a target="_blank" href="https://instagram.com/w.liam.li/" className="text-link underline">William Li</a>,<span className="ml-2"></span>current student at the University of Waterloo and former JAC student for one semester (Fall 2022)</div>
        </div>
    )
}

export default MobileHome