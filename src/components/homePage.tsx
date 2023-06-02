import { useState } from "react"

function HomePage() {

    const [showDisclaimer, setShowDisclaimer] = useState(true)

    return(
        <div className="flex flex-col items-center mt-10">
            <div className="text-white font-title" style={{fontSize: "30px"}}>Mock Visual Schedule Builder for CEGEP</div>
            {showDisclaimer?
            <div className = "bg-nav text-white rounded-md p-4 pt-0 mt-6" style={{width: "30vw"}}>
                <div className="flex justify-between items-center"><div className="font-title">Disclaimer:</div><div className="font-title hover:cursor-pointer" onClick={() => {setShowDisclaimer(false)}} style={{fontSize: "30px"}}>&times;</div></div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">This website should only be used to prepare for official course selection found in Omnivox on the date your CEGEP gives you.</div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">For more questions on course registration, ask your academic advisors!</div>
            </div>
            : <></>
            }

        </div>
    )
}

export default HomePage