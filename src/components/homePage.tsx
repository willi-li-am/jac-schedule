function HomePage() {
    return(
        <div className="flex flex-col items-center mt-10">
            <div className="text-white font-title" style={{fontSize: "30px"}}>Mock Visual Schedule Builder for CEGEP</div>
            <div className = "bg-nav text-white font-title rounded-md p-4 mt-6" style={{width: "30vw"}}>
                Disclaimer:
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">This website should only be used to prepare for official course selection found in Omnivox on the date your CEGEP gives you.</div>
                <div className="flex items-center justify-center font-navButton mt-2 text-justify">For more questions on course registration, ask your academic advisors!</div>
            </div>
        </div>
    )
}

export default HomePage