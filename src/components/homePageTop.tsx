import bgPic from "../assets/jacschedulebackground.png"

export default function HomePageTop () {
    return(
        <div className="flex flex-col bg-list items-center justify-center" style={{height: "60vh", backgroundImage: "url("+bgPic+")", backgroundSize: "33.333333vw"}}>
            <div className="text-white font-title mt-10 bg-darker p-2" style={{fontSize: "40px"}}>Mock Visual Schedule Builder for CEGEP</div>
            <div className="text-white italic bg-darker p-2" style={{fontSize: "20px", marginTop: ""}}>"inspiring quote about helping students"</div>
        </div>
    )
}