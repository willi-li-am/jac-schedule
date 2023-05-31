import { useState } from "react"

function CoursePick(props: any) {

    const [courseList, setCourseList] = useState("")
    const [inputCode, setInputCode] = useState("")  
    const [courseInfo, setCourseInfo]:any = useState("")
    const [coursePicked, setCoursePicked]:any = useState([])

    function ListCourses(props: any): any { //find way to map and shit
        let courseListHtml: any
        for (let i = 0; i < courseInfo[0].length; i++) {
            let lesson = props.courseInfo[0][i]
            let teacher = lesson["teacher"]
            courseListHtml = <div>{teacher}</div>
        }

        return (courseListHtml)
    }

    const handleFormChange = (event: any) => {
        let data:string = event.target.value;
        setInputCode(data);
    }

    async function handleFormSubmit (courseList: any, school_id:string) {
        let code = inputCode.toUpperCase()
        let courseInfoJson: any
        for (let i = 0; i < courseList.length; i++){
            if (code === courseList[i]){
  
                await fetch("http://localhost:8080/course/" + school_id + "/" + code)
                    .then((response) => response.json())
                    .then((json) => {courseInfoJson = json})
                let input = [...coursePicked, code]
                setCoursePicked(input)

                let courseInfoInput = [...courseInfo, courseInfoJson]
                setCourseInfo(courseInfoInput)

            }
        }
        return //error or something
    }

    async function getClassList(school_id:string){
        let classList: any
        await fetch("http://localhost:8080/course/search/" + school_id)
            .then((response) => response.json())
            .then((json) => {classList = json})
        setCourseList(classList) //try to fix 2 time fetch
    }

    if (courseList === ""){
        console.log("run")
        setCourseList(" ")
        getClassList("JAC")
    }

    return (
        <div className = "bg-list flex flex-col" style={{width: "20vw", height: "calc(100vh - 60px)"}}>
            <div className="flex flex-row p-4">
                <input onChange={event => handleFormChange(event)} placeholder="Input Course Code"></input>
                <div onClick = {() => handleFormSubmit(courseList, "JAC")} className = "hover: cursor-pointer bg-navButton font-navButton text-center text-white" style={{width: "60px"}}>--{'>'}</div>
            </div>
            {courseInfo !== "" ? <div className="text-white p-4"><ListCourses courseInfo={courseInfo}></ListCourses></div> : <></>}
        </div>
    )
}

export default CoursePick