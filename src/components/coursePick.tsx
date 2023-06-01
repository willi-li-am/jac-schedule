import { useState } from "react"
import arrow from "../assets/arrow-right-solid.png"

function CoursePick(props: any) {

    const [courseList, setCourseList] = useState("")
    const [inputCode, setInputCode] = useState("")  
    const [courseInfo, setCourseInfo]:any = useState("")
    const [coursePicked, setCoursePicked]:any = useState([])

    const handleFormChange = (event: any) => {
        let data:string = event.target.value;
        setInputCode(data);
    }

    function CourseList (props: any) {
        return (
            <div className="flex flex-col items-center"> 
            <div className="font-title" style={{width: "28vw"}}>{coursePicked[props.listIndex]}</div>
            {courseInfo[props.listIndex].map((value: any, index: number) => {
                return(
                    <div className="border-2 p-2 overflow-hidden border-white" style={{width: "28vw"}}>
                        <div>Section: {value["section"]}</div>
                        <div className="text-white">Teacher: {value["teacher"]}</div>
                        {value["rating"] == "DNE"? <div className="text-white">{value["rating"]}</div> : 
                        <div>
                            <div>Rating: {value["rating"]["rating"]}/5</div>
                            <div>{value["rating"]["reviews"]} reviews</div>
                            <a target = "_blank" href = {value["rating"]["link"]}>{value["rating"]["link"]}</a>
                         </div>} 
                    </div>
                )
            })}
            </div>
        )
    }

    async function handleFormSubmit (event: any, courseList: any, school_id:string) {
        event.preventDefault()
        let code = inputCode.toUpperCase()
        let courseInfoJson: any
        if (courseList.includes(code) && !coursePicked.includes(code)){

            await fetch("http://localhost:8080/course/" + school_id + "/" + code)
                .then((response) => response.json())
                .then((json) => {courseInfoJson = json})
            let input = [code, ...coursePicked]
            setCoursePicked(input)

            let courseInfoInput = [courseInfoJson, ...courseInfo]
            setCourseInfo(courseInfoInput)

            setInputCode("")
        }
    
        return //error or something
    }

    async function getClassList(school_id:string){
        await fetch("http://localhost:8080/course/search/" + school_id)
            .then((response) => response.json())
            .then((json) => {setCourseList(json); console.log("hi")})
         //try to fix 2 time fetch
    }

    if (courseList === ""){
        console.log("run")
        setCourseList(" ")
        getClassList("JAC")
    }

    return (
        <div className = "bg-list flex flex-col overflow-y-scroll items-center" style={{width: "30vw", height: "calc(100vh - 60px)"}}>
            <form className="flex flex-row p-4">
                <input className = "bg-dark text-white outline-none"defaultValue = {inputCode} style={{height: "40px", textAlign: "center"}} onChange={event => handleFormChange(event)} placeholder="Input Course Code"></input>
                <button type = "submit"onClick = {(event) => handleFormSubmit(event, courseList, "JAC")} className = "flex justify-center items-center hover: cursor-pointer bg-nav font-navButton text-center text-white" style={{width: "40px"}}><img src={arrow} height="20px" width = "20px"></img></button>
            </form>
            {courseInfo !== "" ? <div>{courseInfo.map((value: any, index: number) => {
                return(
                    <div className="text-white p-4"><CourseList listIndex = {index}></CourseList></div>
                )
            })}</div> : <></>}
        </div>
    )
}

export default CoursePick