import { useState } from "react"
import arrow from "../assets/arrow-right-solid.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUser, faStar, faPlus, faHashtag, faArrowUpRightFromSquare, faChalkboard, faFlask, faTag, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"

function CoursePick(prop: any) {

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const handleTabClose = (event: any) => {
          event.preventDefault();       
    
          return (event.returnValue =
            'Are you sure you want to exit?');
        };
    
        window.addEventListener('beforeunload', handleTabClose);
    
        return () => {
          window.removeEventListener('beforeunload', handleTabClose);
        };
      }, []
    );

    const handleFormChange = (event: any) => {
        let data:string = event.target.value;
        prop.setInputCode(data);
    }

    function addCourse(course: any, code: any, index: number) {
        let scheduleObj = prop.schedule
        let coursePickedObj = prop.courseIndexPicked

        for (const day in scheduleObj) {
            scheduleObj[day].push(course["schedule"][day])
        }

        coursePickedObj[code] = index

        prop.setSchedule(scheduleObj)
        prop.setCourseIndexPicked(coursePickedObj)
        setUpdate(!update)
    }

    function removeCourse(course: any, code: any){
        let scheduleObj = prop.schedule
        let coursePickedObj = prop.courseIndexPicked
        for (const day in scheduleObj) {
            const targetElementIndex = scheduleObj[day].indexOf(course["schedule"][day]);
            scheduleObj[day].splice(targetElementIndex)
        }

        delete coursePickedObj[code]

        prop.setSchedule(scheduleObj)
        prop.setCourseIndexPicked(coursePickedObj)
        setUpdate(!update)
    }

    function compareTime(course: any) {
        let scheduleObj = prop.schedule
        for (const day in scheduleObj) {
            if(course["schedule"][day] !== "" && scheduleObj[day].length !== 0){
            let t1 = course['schedule'][day]
            let time1 = t1.split("-")
                
                for (let i = 0; i < scheduleObj[day].length; i++) {
                    
                    let t2 = scheduleObj[day][i]
                    let time2 = t2.split("-")

                    let start1 = parseInt(time1[0])
                    let start2 = parseInt(time2[0])

                    let end1 = parseInt(time1[1])
                    let end2 = parseInt(time2[1])

                    if ((start1 < end2) && (start1 >= start2) ) return false //if course starts in between course 2

                    if ((end1 <= end2) && (end1 > start2)) return false //if course ends in between course 2

                    if ((start1 <= start2) && (end1 >= end2)) return false //if course2 is in course1

                
                }
            }
        }

        return true
    }

    function CourseInfo(props: any) { //value property
        return(
            <div className= "flex flex-col space-y-1" key = {props.value["teacher"] + " " + props.value["title"] + " " + props.value["section"]} style={{color: props.color}}>
                {props.comp? 
                <div className="flex flex-col space-y-1">
                    <div className="font-title flex items-center space-x-2"><div className="">{props.value["courseCode"]}</div></div>
                    <div className="font-title flex items-center space-x-2"><div className="">Domain: {props.value["domain"]}</div></div>
                    <div className="font-title flex items-center space-x-2"><div className="">Ensemble: {props.value["ensemble"]}</div></div>
                </div>
                : <></>}
                <div className=" font-title flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faUser} /> <div className="">{props.value["teacher"]}</div></div>
                <div className=" font-title flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon = {faTag}></FontAwesomeIcon><div>{props.value["title"]}</div></div>
                <div className=" flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faHashtag} /> <div>{props.value["section"]}</div></div>
                {props.value["rating"] == "DNE"? <div className=" flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faStar} /> <div>Rating Not Available</div></div> : 
                <div>
                <div className=" flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faStar} /><div>{props.value["rating"]["rating"]} ({props.value["rating"]["reviews"]} reviews)</div><a className = "underline"target = "_blank" href = {props.value["rating"]["link"]}><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faArrowUpRightFromSquare} /></a></div>
                </div>} 
                {!("lab" in props.value)||!("teacher" in props.value["lab"]) ? <></> : <>
                    {props.value["lab"]["teacher"] === props.value["teacher"]? <></>:
                    <>
                    <div className=" font-title">Lab Teacher:</div>
                    <div className="flex flex-col space-y-1 pl-4 mt-2">
                        <div className="font-title flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faFlask} /> <div className="">{props.value["lab"]["teacher"]}</div></div>
                        {props.value["lab"]["rating"] == "DNE"? <div className=" flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faStar} /> <div>Rating Not Available</div></div> : 
                        <div>
                        <div className=" flex items-center space-x-2"><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faStar} /><div>{props.value["lab"]["rating"]["rating"]} ({props.value["lab"]["rating"]["reviews"]} reviews)</div><a className = "underline"target = "_blank" href = {props.value["lab"]["rating"]["link"]}><FontAwesomeIcon style={{height: "15px", width: "15px", color: props.color}} icon={faArrowUpRightFromSquare} /></a></div>
                        </div>} 
                    </div>
                    </>
                }</>
                }
            </div>
        )
    }

    function CourseList (props: any) {
        const courseCode = prop.coursePicked[props.listIndex]
        if (courseCode === "COMPLEMENTARY") {
            return(
                <div className="flex flex-col items-center"> 
                <div className="bg-darker text-white font-title pt-2 pl-3 pb-2" style={{width: "calc(30vw - 8px)", fontSize: "20px"}}>{courseCode}</div>
                {prop.courseInfo[props.listIndex].map((value: any, index: number) => {
                    
                    if (courseCode in prop.courseIndexPicked && index !== prop.courseIndexPicked[courseCode]) return(<></>)

                    if (index === prop.courseIndexPicked[courseCode] && props.listIndex === (prop.courseInfo).length-1) {
                        return(
                            <div className= {"p-4 overflow-hidden border-darker border-t-8 border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                                {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {true} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {true} value = {value}></CourseInfo>}</>}
                            </div>
                        )
                    }

                    if (index === 0 || index === prop.courseIndexPicked[courseCode]){

                        return(
                            <div className= {"p-4 overflow-hidden border-darker flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                                 {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {true} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {true} value = {value}></CourseInfo>}</>}
                            </div>
                        )
                    }
                    else if (index === (prop.courseInfo[props.listIndex].length - 1) && index === (props.listIndex)) {
                        
                        return(
                            <div className= {"p-4 overflow-hidden border-darker border-t-8 border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                                {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {true} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {true} value = {value}></CourseInfo>}</>}
                            </div>
                        )
                    }

                    return(
                        <div className= {"p-4 overflow-hidden border-darker border-t-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                             {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {true} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {true} value = {value}></CourseInfo>}</>}
                        </div>
                    )
                    })}
                    </div>
            )
        }
        return (
            <div className="flex flex-col items-center"> 
            <div className="bg-darker text-white font-title pt-2 pl-3 pb-2" style={{width: "calc(30vw - 8px)", fontSize: "20px"}}>{courseCode}</div>
            {prop.courseInfo[props.listIndex].map((value: any, index: number) => {

                if (courseCode in prop.courseIndexPicked && index !== prop.courseIndexPicked[courseCode]) return(<></>)

                if (index === prop.courseIndexPicked[courseCode] && props.listIndex === (prop.courseInfo).length-1) {
                    return(
                        <div className= {"p-4 overflow-hidden border-darker border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                        {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {false} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                        :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                        <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {false} value = {value}></CourseInfo>}</>}
                    </div>
                    )
                }

                if (index === 0 || index === prop.courseIndexPicked[courseCode]){
                    return(
                        <div className= {"p-4 overflow-hidden border-darker flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                             {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {false} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {false} value = {value}></CourseInfo>}</>}
                        </div>
                    )
                }
                else if (index === (prop.courseInfo[props.listIndex].length - 1) && props.listIndex === (prop.courseInfo).length-1) {
                    return(
                        <div className= {"p-4 overflow-hidden border-darker border-t-8 border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                            {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {false} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo  comp = {false} value = {value}></CourseInfo>}</>}
                        </div>
                    )
                }
                return(
                    <div className= {"p-4 overflow-hidden border-darker border-t-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                            {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo  comp = {false} value = {value}></CourseInfo><FontAwesomeIcon onClick={() => removeCourse(value, courseCode)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faMinus}></FontAwesomeIcon></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                            <FontAwesomeIcon onClick={() => addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", padding:"5px", borderRadius:"5px"}} icon={faPlus}></FontAwesomeIcon></> : <CourseInfo color = "#ED8A88"  comp = {false} value = {value}></CourseInfo>}</>}
                    </div>
                )
            })}
            </div>
        )
    }

    async function handleFormSubmit (event: any, courseList: any, school_id:string) {
        event.preventDefault()
        let code = prop.inputCode.toUpperCase()
        let courseInfoJson: any
        if (courseList.includes(code) && !prop.coursePicked.includes(code)){

            await fetch("http://localhost:8080/course/" + school_id + "/" + code)
                .then((response) => response.json())
                .then((json) => {courseInfoJson = json})
            let input = [code, ...prop.coursePicked]
            prop.setCoursePicked(input)

            let courseInfoInput = [courseInfoJson, ...prop.courseInfo]
            prop.setCourseInfo(courseInfoInput)

            prop.setInputCode("")
        }
    
        return //error or something
    }

    async function getClassList(school_id:string){
        await fetch("http://localhost:8080/course/search/" + school_id)
            .then((response) => response.json())
            .then((json) => {prop.setCourseList(json)})
         //try to fix 2 time fetch
    }

    if (prop.courseList === ""){
        prop.setCourseList(" ")
        getClassList("JAC")
    }


    return (
        <div className = "bg-list flex flex-col overflow-y-scroll items-center" style={{width: "30vw", height: "calc(100vh - 60px)"}}>
            <form className="flex flex-row p-4">
                <input className = "bg-dark text-white outline-none" value = {prop.inputCode} style={{height: "40px", textAlign: "center"}} onChange={event => handleFormChange(event)} placeholder="Input Course Code"></input>
                <button type = "submit"onClick = {(event) => handleFormSubmit(event, prop.courseList, "JAC")} className = "outline-none flex justify-center items-center hover: cursor-pointer bg-nav font-navButton text-center text-white" style={{width: "40px"}}><FontAwesomeIcon style={{height: "20px", width: "20px", color: "#ffffff"}} icon={faArrowRight} /></button>
            </form>
            {prop.courseInfo !== "" ? <div>{prop.courseInfo.map((value: any, index: number) => {
                return(
                    <div className="text-white"><CourseList listIndex = {index}></CourseList></div>
                )
            })}</div> : <></>}
        </div>
    )
}

export default CoursePick