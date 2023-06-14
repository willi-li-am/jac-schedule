export default function Disclaimer(props: any) {
    return(
        <>
        {props.showDisclaimer?
            <div className = "absolute" style={{width: "100vw", height: "100vh", zIndex: "100"}}>
            <div className = "bg-nav absolute text-white rounded-md p-4 pt-0 z-40" style={{width: "30vw", height: "200px", marginTop: "calc(50vh - 150px)", marginLeft: "35vw"}}>
                <div className="flex justify-between items-center"><div className="font-title">Disclaimer:</div><div className="font-title hover:cursor-pointer" onClick={() => {props.setShowDisclaimer(false)}} style={{fontSize: "30px"}}>&times;</div></div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">This website should only be used to prepare for official course selection found in Omnivox on the date your CEGEP gives you.</div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">For more questions on course registration, ask your academic advisors!</div>
            </div>
            <div className = "absolute z-1" style={{width: "100vw", height: "100vh", backgroundColor: "black", opacity: "90%"}}></div>
            </div>
            : <></>
        }</>
    )
}