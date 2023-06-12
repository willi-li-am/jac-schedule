import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUser, faStar, faHashtag, faArrowUpRightFromSquare, faFlask, faTag, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import ColorPicker from "./colorPicker"
import { BeatLoader} from "react-spinners"
import CourseInput from "./input"


function CoursePick(prop: any) {

    const [showColor, setShowColor] :any = useState({})
    const [loading, setLoading]: any = useState(false)
    const [itemsList, setItemsList] = useState(null)

    const inputCode: any = useRef("")

    if(prop.lastPage !== "/create") {
        prop.setLastPage("/create")
    }
    const [update, setUpdate] = useState(false)
    const [viewCustomCourse, setViewCustomCourse] = useState(false)
    const [viewCourseInput, setViewCourseInput] = useState(true)

    const customCourse:any = {
        code: useRef(""),
        MS: useRef(""),
        ME: useRef(""),
        TS: useRef(""),
        TE: useRef(""),
        WS: useRef(""),
        WE: useRef(""),
        RS: useRef(""),
        RE: useRef(""),
        FS: useRef(""),
        FE: useRef("")
    }
    const [viewCourse, setViewCourse]: any = useState({})

    function itemsToList(courseList: string[]) {
        let itemsListList: any = []
        for (let i = 0; i < courseList.length; i++){
            itemsListList.push({id: i, name: courseList[i]})
        }
        setItemsList(itemsListList)
    }

    function sectionMaker(input: number): string{
        if (input/10000 >= 1) return input.toString()
        if (input/1000 >= 1) return ("0" + input)
        if (input/100 >= 1) return ("00" + input)
        if (input/10 >= 1) return ("000" + input)
        return ("0000" + input)
    }
    

    function handleViewCourse(input: string) {
        let viewCourseObj = viewCourse
        if (input in viewCourseObj) {
            viewCourseObj[input] = !viewCourseObj[input]
            setViewCourse(viewCourseObj)
        }
        else {
            viewCourseObj[input] = false
            setViewCourse(viewCourseObj)
        }
        setUpdate(!update)
    }

    function handleCustomInput(event: any, input: number) {
        let textInput = event.target.value
        const dict: any = {
            0: "code",
            1: "MS",
            2: "ME",
            3: "TS",
            4: "TE",
            5: "WS",
            6: "WE",
            7: "RS",
            8: "RE",
            9: "FS",
            10: "FE"
        }

        if (input !== 0) {
            let newInput = textInput[textInput.length - 1]
            let oldInput = textInput.slice(0, -1)
            
            if (textInput.length < 5){
                if (textInput === ""){
                    customCourse[dict[input]].current.value = textInput
                }
                else if(Number.isInteger(parseInt(newInput))) {
                    customCourse[dict[input]].current.value = textInput
                }
                else if(newInput === ":" && !(oldInput.includes(":")) && (oldInput.length >= 1)){
                    customCourse[dict[input]].current.value = textInput
                }
            }
            else if ((textInput.length === 5) && textInput.includes(":")){
                if (textInput === ""){
                    customCourse[dict[input]].current.value = textInput
                }
                else if(Number.isInteger(parseInt(newInput))) {
                    customCourse[dict[input]].current.value = textInput
                }
                else if(newInput === ":" && !(oldInput.includes(":")) && (oldInput.length >= 1)){
                    customCourse[dict[input]].current.value = textInput
                }
            }
        }
        else {
            customCourse[dict[input]].current.value = textInput
        }
        setUpdate(!update)
    } 

    function timeWork(dayTime: string) {
        let time: number
        if(customCourse[dayTime].current.value.includes(":")) {
            if(customCourse[dayTime].current.value.length > 3){
                let splitTime = customCourse[dayTime].current.value.split(":")
                let time1 = splitTime[0]
                let time2 = splitTime[1]

                if(time1.length <= 2 && time2.length === 2){
                    if (parseInt(time2) < 60) {
                        if (time1 < 8 && time1 > 0) {
                            time1 = parseInt(time1) + 12
                        }
                        time = (parseInt(time1) * 100) + parseInt(time2)
                        return time
                    }
                    return -1
                }
            }
            return -1
        }
        else if(customCourse[dayTime].current.value.length < 5){
            if(customCourse[dayTime].current.value.length < 3){
                let timeNum = parseInt(customCourse[dayTime].current.value)
                if (timeNum > 7 && timeNum < 20) {
                    time = parseInt(customCourse[dayTime].current.value) * 100
                    return time
                }
                else if(timeNum < 8 && timeNum > 0) {
                    time = (timeNum + 12) * 100
                    return time
                }
                return -1
            }
            else if (customCourse[dayTime].current.value.length >= 3) {
                time = parseInt(customCourse[dayTime].current.value)
                if (time >= 800 && time <=1900 && (time % 100 < 60)){
                    return time
                }
                else if (time >= 100 && time <= 700){
                    time += 1200
                    return time
                }
                return -1
            }
        }
        return -1
    }

    function combineTime(timeS: number, timeE: number) {
        let timeStart = timeS.toString()
        let timeEnd = timeE.toString()
        if (timeS/1000 < 1) timeStart = "0" + timeStart
        if (timeE/1000 < 1) timeEnd = "0" + timeEnd
        return (timeStart + "-" + timeEnd)
    }

    function handleCustomSubmit(event: any) {
        event.preventDefault()
        let code = customCourse["code"].current.value.toUpperCase()
        if (prop.courseList.includes(code)) return alert("This course code already exists")
        let courseObj: any = {
            teacher: "DNE",
            rating: "DNE",
            title: code,
            section: "00001",
            schedule: {
                M: "",
                T: "",
                W: "",
                R: "",
                F: ""
            },
            type: "custom"
        }
        //check if time works or not, it dont and check if course already exists, reset time values but not course code!

        //first check which cases are empty and which arent

        //if it works add to whatever

        //1-2 numbers * 100, 3 numbers just parseInt, 4-5 numbers (includes ":"? first part * 100, + second part : parseInt) 
        //possible errors, if 5 numbers no ":", 4 numbers but > 2400, split(":"), first contains more than 3 numbers, second contains less than 2 digits


        if (code === "") return alert("Please input a course")

        if (code.length < 8) return alert("Please input a course with at least 8 characters ")

        let empty = 0

        if (customCourse["MS"].current.value === "" && customCourse["ME"].current.value === "") {
            empty++
        }
        else if (customCourse["MS"].current.value !== "" && customCourse["ME"].current.value !== ""){
            let timeStart = timeWork("MS")
            let timeEnd = timeWork("ME")

            if (timeStart === -1 || timeEnd === -1 || timeStart >= timeEnd) return alert("Please fix Monday's schedule (use 24hr format)")
            if (timeEnd - timeStart < 100) return alert("Courses can't be this short, send me proof if there are")

            let time = combineTime(timeStart, timeEnd)
            courseObj["schedule"]["M"] = time
        }
        else {
            return alert("Please fix Monday's schedule (use 24hr format)")
        }

        if (customCourse["TS"].current.value === "" && customCourse["TE"].current.value === "") {
            empty++
        }
        else if (customCourse["TS"].current.value !== "" && customCourse["TE"].current.value !== ""){
            let timeStart = timeWork("TS")
            let timeEnd = timeWork("TE")

            if (timeStart === -1 || timeEnd === -1 || timeStart >= timeEnd) return alert("Please fix Tuesday's schedule (use 24hr format)")
            if (timeEnd - timeStart < 100) return alert("Courses can't be this short, send me proof if there are")

            let time = combineTime(timeStart, timeEnd)
            courseObj["schedule"]["T"] = time
        }
        else {
            return alert("Please fix Tuesday's schedule (use 24hr format)")
        }
        if (customCourse["WS"].current.value === "" && customCourse["WE"].current.value === "") {
            empty++
        }
        else if (customCourse["WS"].current.value !== "" && customCourse["WE"].current.value !== ""){
            let timeStart = timeWork("WS")
            let timeEnd = timeWork("WE")

            if (timeStart === -1 || timeEnd === -1 || timeStart >= timeEnd) return alert("Please fix Wednesday's schedule (use 24hr format)")
            if (timeEnd - timeStart < 100) return alert("Courses can't be this short, send me proof if there are")

            let time = combineTime(timeStart, timeEnd)
            courseObj["schedule"]["W"] = time
        }
        else {
            return alert("Please fix Wednesday's schedule (use 24hr format)")
        }
        if (customCourse["RS"].current.value === "" && customCourse["RE"].current.value === "") {
            empty++
        }
        else if (customCourse["RS"].current.value !== "" && customCourse["RE"].current.value !== ""){
            let timeStart = timeWork("RS")
            let timeEnd = timeWork("RE")

            if (timeStart === -1 || timeEnd === -1 || timeStart >= timeEnd) return alert("Please fix Thursday's schedule (use 24hr format)")
            if (timeEnd - timeStart < 100) return alert("Courses can't be this short, send me proof if there are")

            let time = combineTime(timeStart, timeEnd)
            courseObj["schedule"]["R"] = time
        }
        else {
            return alert("Please fix Thursday's schedule (use 24hr format)")
        }

        if (customCourse["FS"].current.value === "" && customCourse["FE"].current.value === "") {
            empty++
        }
        else if (customCourse["FS"].current.value !== "" && customCourse["FE"].current.value !== ""){
            let timeStart = timeWork("FS")
            let timeEnd = timeWork("FE")

            if (timeStart === -1 || timeEnd === -1 || timeStart >= timeEnd) return alert("Please fix Friday's schedule (use 24hr format)")
            if (timeEnd - timeStart < 100) return alert("Courses can't be this short, send me proof if there are")

            let time = combineTime(timeStart, timeEnd)
            courseObj["schedule"]["F"] = time
        }
        else {
            return alert("Please fix Friday's schedule (use 24hr format)")
        }

        if(empty === 5) return alert("Please fill in the time")

        let index = 0

        if (code in prop.courseInfoCache && !(prop.coursePicked.includes(code))) {

            let input = [code, ...prop.coursePicked]
            prop.setCoursePicked(input)
            
            let cache = prop.courseInfoCache

            let courseInfoJson =  [...cache[code], courseObj]
            let courseInfoInput = [courseInfoJson, ...prop.courseInfo]
            prop.setCourseInfo(courseInfoInput)
            
            index = cache[code].length
            courseObj["section"] = sectionMaker(index + 1)
            
            cache[code] = [...cache[code], courseObj]
            prop.setCourseInfoCache(cache)
        }

        else if (!(prop.coursePicked.includes(code))){
            let input = [code, ...prop.coursePicked]
            prop.setCoursePicked(input)
        
            let courseInfoJson =  [courseObj]
            let courseInfoInput = [courseInfoJson, ...prop.courseInfo]
            prop.setCourseInfo(courseInfoInput)

            let cache = prop.courseInfoCache
            cache[code] = courseInfoJson
            prop.setCourseInfoCache(cache)

            let colors = prop.colorList
            colors[code] = {background: "#394351"}
            prop.setColorList(colors)
        }
        
        else {
            let indexCode = prop.coursePicked.indexOf(code)
            index = prop.courseInfo[indexCode].length
            courseObj["section"] = sectionMaker(index + 1)
            let courseInfoList = prop.courseInfo
            courseInfoList[indexCode].push(courseObj)

            prop.setCourseInfo(courseInfoList)
            
            let cache = prop.courseInfoCache
            cache[code] = [...cache[code], courseObj]
            prop.setCourseInfoCache(cache)
        }
        
        if(compareTime(courseObj) && !(code in prop.courseIndexPicked)){
            let scheduleObj = prop.schedule
            let coursePickedObj = prop.courseIndexPicked
        
            for (const day in scheduleObj) {
                scheduleObj[day].push(courseObj["schedule"][day])
            }
        
            coursePickedObj[code] = index
        
            prop.setSchedule(scheduleObj)
            prop.setCourseIndexPicked(coursePickedObj)
        }
        
        customCourse["MS"].current.value = ""
        customCourse["ME"].current.value = ""
        customCourse["TS"].current.value = ""
        customCourse["TE"].current.value = ""
        customCourse["WS"].current.value = ""
        customCourse["WE"].current.value = ""
        customCourse["RS"].current.value = ""
        customCourse["RE"].current.value = ""
        customCourse["FS"].current.value = ""
        customCourse["FE"].current.value = ""
        prop.setUpdate(!prop.update)

        return courseObj
    } 
    
    useEffect(() => {
        getClassList("JAC")
    }, [])

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
        if (props.value["type"] === "custom"){
            return (<div className= "flex flex-col" key = {props.value["title"] + " " + props.value["section"]} style={{color: props.color, fontSize: "15px"}}>
                <div className=" font-title flex items-center space-x-2"><FontAwesomeIcon title = "course title" style={{height: "13px", width: "13px", color: props.color}} icon = {faTag}></FontAwesomeIcon><div  style={{fontSize: "13px"}}>{props.value["title"]}</div></div>
                <div className=" flex items-center space-x-2"><FontAwesomeIcon title = "section" style={{height: "13px", width: "13px", color: props.color}} icon={faHashtag} /> <div style={{fontSize: "13px"}}>{props.value["section"]}</div></div>
                <div className="flex flex-col">
                    <div className="flex flex-col ml-2" style={{fontSize: "10px"}}>
                    {props.value["schedule"]["M"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Mon</div>
                            <div>{props.value["schedule"]["M"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["T"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Tue</div>
                            <div>{props.value["schedule"]["T"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["W"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Wed</div>
                            <div>{props.value["schedule"]["W"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["R"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Thu</div>
                            <div>{props.value["schedule"]["R"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["F"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Fri</div>
                            <div>{props.value["schedule"]["F"]}</div>
                        </div> : <></>}
                    </div>
                </div>
                </div>)
        }
        return(
            <div className= "flex flex-col" key = {props.value["teacher"] + " " + props.value["title"] + " " + props.value["section"]} style={{color: props.color, fontSize: "15px"}}>
                {props.comp? 
                <div className="flex flex-col">
                    <div className="font-title flex items-center space-x-2"><div className="" style={{fontSize: "13px"}}>{props.value["courseCode"]}</div></div>
                    <div className="font-title flex items-center space-x-2" style={{fontSize: "12px"}}><div className="">Domain: {props.value["domain"]}</div></div>
                    <div className="font-title flex items-center space-x-2" style={{fontSize: "12px"}}><div className="">Ensemble: {props.value["ensemble"]}</div></div>
                </div>
                : <></>}
                <div className=" font-title flex items-center space-x-2"><FontAwesomeIcon title = "rating" style={{height: "13px", width: "13px", color: props.colorm}} icon={faUser} /><div className="" style={{fontSize: "13px"}}>{props.value["teacher"]}</div></div>
                <div className=" flex items-center space-x-2" style={{fontSize: "12px"}}><FontAwesomeIcon title = "rating" style={{height: "13px", width: "13px", color: props.color}} icon={faTag} /><div>{props.value["title"]}</div></div>
                <div className=" flex items-center space-x-2" style={{fontSize: "12px"}}><FontAwesomeIcon title = "rating" style={{height: "13px", width: "13px", color: props.color}} icon={faHashtag} /> <div>{props.value["section"]}</div></div>
                {props.value["rating"] == "DNE"? <div className=" flex items-center space-x-2"><FontAwesomeIcon title = "rating" style={{height: "13px", width: "13px", color: props.color}} icon={faStar} /> <div>Rating Not Available</div></div> : 
                <div>
                <div className=" flex items-center space-x-2"><FontAwesomeIcon title = "rating" style={{height: "13px", width: "13px", color: props.color}} icon={faStar} /><div style={{fontSize: "13px"}}>{props.value["rating"]["rating"]} ({props.value["rating"]["reviews"]} reviews)</div><a className = "underline"target = "_blank" href = {props.value["rating"]["link"]}><FontAwesomeIcon title = "link to ratemyprofessor" style={{height: "13px", width: "13px"}} className="hover:text-link duration-150" icon={faArrowUpRightFromSquare} /></a></div>
                </div>} 
                {!("lab" in props.value)||!("teacher" in props.value["lab"]) ? <></> : <>
                    {props.value["lab"]["teacher"] === props.value["teacher"]? <></>:
                    <>
                    <div className=" font-title">Lab Teacher:</div>
                    <div className="flex flex-col space-y-1 pl-4 mt-2">
                        <div className="font-title flex items-center space-x-2"><FontAwesomeIcon title = "lab teacher" style={{height: "15px", width: "15px", color: props.color}} icon={faFlask} /> <div className="">{props.value["lab"]["teacher"]}</div></div>
                        {props.value["lab"]["rating"] == "DNE"? <div className=" flex items-center space-x-2"><FontAwesomeIcon title = "rating" style={{height: "15px", width: "15px", color: props.color}} icon={faStar} /> <div>Rating Not Available</div></div> : 
                        <div>
                        <div className=" flex items-center space-x-2"><FontAwesomeIcon title = "rating" style={{height: "15px", width: "15px", color: props.color}} icon={faStar} /><div>{props.value["lab"]["rating"]["rating"]} ({props.value["lab"]["rating"]["reviews"]} reviews)</div><a className = "underline"target = "_blank" href = {props.value["lab"]["rating"]["link"]}><FontAwesomeIcon style={{height: "15px", width: "15px"}}  className="hover:text-link duration-150" icon={faArrowUpRightFromSquare} /></a></div>
                        </div>} 
                    </div>
                    </>
                }</>
                }
                 <div className="flex flex-col text-imp">
                    {props.value["details"]["fee"] !== ""? <div style={{fontSize: "12px"}}>Fees: {props.value["details"]["fee"]}$</div> : <></>}
                    {props.value["details"]["restrict"] !== ""? <div style={{fontSize: "12px"}}>Not for {props.value["details"]["restrict"]} students</div> : <></>}
                    {props.value["details"]["exclusive"] !== ""? <div style={{fontSize: "12px"}}>For {props.value["details"]["exclusive"]} students only</div> : <></>}
                    {props.value["details"]["blended"] !== ""? <div style={{fontSize: "12px"}}>Blended Learning</div> : <></>}
                    {props.value["details"]["intensive"] !== ""? <div style={{fontSize: "12px"}}>{props.value["details"]["intensive"]}</div> : <></>}
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col ml-2" style={{fontSize: "10px"}}>
                        {props.value["schedule"]["M"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Mon</div>
                            <div>{props.value["schedule"]["M"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["T"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Tue</div>
                            <div>{props.value["schedule"]["T"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["W"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Wed</div>
                            <div>{props.value["schedule"]["W"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["R"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Thu</div>
                            <div>{props.value["schedule"]["R"]}</div>
                        </div> : <></>}
                        {props.value["schedule"]["F"] !== ""? 
                        <div className="flex flex-row justify-between items-center" style={{width: "82px"}}>
                            <div>Fri</div>
                            <div>{props.value["schedule"]["F"]}</div>
                        </div> : <></>}
                    </div>
                </div>
            </div>
        )
    }

    function handleColorView(code: string, type? :boolean) {
        let viewColor = showColor
        if (type === false) {
            if (viewColor[code] === false) {
                return
            }
            viewColor[code] = false
            setShowColor(viewColor)
            setUpdate(!update)
            return
        }
        if (code in viewColor) viewColor[code] = !viewColor[code]
        else viewColor[code] = true

        setShowColor(viewColor)
        setUpdate(!update)
    }

    function CourseList (props: any) {
        const courseCode = prop.coursePicked[props.listIndex]
        if (courseCode === "COMPLEMENTARY") {
            return(
                <div className="flex flex-col items-center"> 
                <div className="flex flex-row justify-between items-center bg-darker sticky top-0 text-white font-title" style={{width: "calc(30vw - 8px)", height: "40px", fontSize: "17px", zIndex: (prop.coursePicked.length - props.listIndex)}}>
                    <div className="flex items-center justify-center space-x-4"><div onClick = {() => handleViewCourse(courseCode)} id={courseCode} className="ml-4 hover:cursor-pointer flex space-x-2 items-center"><FontAwesomeIcon icon={viewCourse[courseCode] !== false? faChevronDown: faChevronUp}></FontAwesomeIcon><div>{courseCode}</div></div>
                    <div className="relative z-2"><ColorPicker handleColorView = {handleColorView} showColor = {showColor} handleColor = {prop.handleColor} code = {courseCode} setColorList = {prop.setColorList} colorList = {prop.colorList}></ColorPicker></div>
                    </div>
                    
                    <div className="font-title hover:cursor-pointer mr-4" onClick={() => {prop.removeCourseCode(courseCode)}} style={{fontSize: "30px"}}>&times;</div>
                </div>
                {viewCourse[courseCode] !== false? <>{prop.courseInfo[props.listIndex].map((value: any, index: number) => {
                    
                    if (courseCode in prop.courseIndexPicked && index !== prop.courseIndexPicked[courseCode]) return(<></>)

                    if (index === prop.courseIndexPicked[courseCode] && props.listIndex === (prop.courseInfo).length-1) {
                        return(
                            <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                                <CourseInfo  comp = {true} value = {value} color = "#58c75b"></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div>
                            </div>
                        )
                    }

                    if (index === 0 || index === prop.courseIndexPicked[courseCode]){

                        return(
                            <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                                 {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo color = "#58c75b" comp = {true} value = {value}></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <div onClick={() => prop.addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer grid" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{width: "25px", height: "4px", backgroundColor: "white", marginLeft: "7.5px", marginTop: "18px", borderRadius: "5px"}}></div><div style={{width: "4px", height: "25px", backgroundColor: "white", marginLeft: "18px", marginTop: "-22px", borderRadius: "5px"}}></div></div></> : <CourseInfo color = "#ED8A88" comp = {true} value = {value}></CourseInfo>}</>}
                            </div>
                        )
                    }
                    else if (index === (prop.courseInfo[props.listIndex].length - 1) && index === (props.listIndex)) {
                        
                        return(
                            <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker border-t-8 border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                                {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo color = "#58c75b" comp = {true} value = {value}></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <div onClick={() => prop.addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer grid" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{width: "25px", height: "4px", backgroundColor: "white", marginLeft: "7.5px", marginTop: "18px", borderRadius: "5px"}}></div><div style={{width: "4px", height: "25px", backgroundColor: "white", marginLeft: "18px", marginTop: "-22px", borderRadius: "5px"}}></div></div></> : <CourseInfo color = "#ED8A88" comp = {true} value = {value}></CourseInfo>}</>}
                            </div>
                        )
                    }

                    return(
                        <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker border-t-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                             {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo color = "#58c75b" comp = {true} value = {value}></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {true} value = {value}></CourseInfo>
                            <div onClick={() => prop.addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer grid" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{width: "25px", height: "4px", backgroundColor: "white", marginLeft: "7.5px", marginTop: "18px", borderRadius: "5px"}}></div><div style={{width: "4px", height: "25px", backgroundColor: "white", marginLeft: "18px", marginTop: "-22px", borderRadius: "5px"}}></div></div></> : <CourseInfo color = "#ED8A88" comp = {true} value = {value}></CourseInfo>}</>}
                        </div>
                    )
                    })}</> : <></>}
                    </div>
            )
        }
        return (
            <div className="flex flex-col items-center"> 
            <div className="flex flex-row justify-between items-center bg-darker sticky top-0 text-white font-title" style={{width: "calc(30vw - 8px)", height: "40px", fontSize: "17px", zIndex: (prop.coursePicked.length - props.listIndex)}}>
            <div className="flex items-center justify-center space-x-4"><div onClick = {() => handleViewCourse(courseCode)} id={courseCode} className="ml-4 hover:cursor-pointer flex space-x-2 items-center"><FontAwesomeIcon icon={viewCourse[courseCode] !== false? faChevronDown: faChevronUp}></FontAwesomeIcon><div>{courseCode}</div></div>
                    <ColorPicker handleColorView = {handleColorView} showColor = {showColor} handleColor = {prop.handleColor} code = {courseCode} setColorList = {prop.setColorList} colorList = {prop.colorList}></ColorPicker>
                    </div>
                <div className="font-title hover:cursor-pointer mr-4" onClick={() => {prop.removeCourseCode(courseCode)}} style={{fontSize: "30px"}}>&times;</div>
            </div>
            {viewCourse[courseCode] !== false?<>{prop.courseInfo[props.listIndex].map((value: any, index: number) => {

                if (courseCode in prop.courseIndexPicked && index !== prop.courseIndexPicked[courseCode]) return(<></>)

                if (index === prop.courseIndexPicked[courseCode] && props.listIndex === (prop.courseInfo).length-1) {
                    return(
                    <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                        <CourseInfo  comp = {false} value = {value} color = "#58c75b"></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div>
                    </div>
                    ) 
                }

                if (index === 0 || index === prop.courseIndexPicked[courseCode]){
                    return(
                        <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                             {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo color = "#58c75b" comp = {false} value = {value}></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                            <div onClick={() => prop.addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer grid" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{width: "25px", height: "4px", backgroundColor: "white", marginLeft: "7.5px", marginTop: "18px", borderRadius: "5px"}}></div><div style={{width: "4px", height: "25px", backgroundColor: "white", marginLeft: "18px", marginTop: "-22px", borderRadius: "5px"}}></div></div></> : <CourseInfo color = "#ED8A88" comp = {false} value = {value}></CourseInfo>}</>}
                        </div>
                    )
                }
                else if (index === (prop.courseInfo[props.listIndex].length - 1) && props.listIndex === (prop.courseInfo).length-1) {
                    return(
                        <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker border-t-8 border-b-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                            {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo color = "#58c75b" comp = {false} value = {value}></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                        <div onClick={() => prop.addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer grid" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{width: "25px", height: "4px", backgroundColor: "white", marginLeft: "7.5px", marginTop: "18px", borderRadius: "5px"}}></div><div style={{width: "4px", height: "25px", backgroundColor: "white", marginLeft: "18px", marginTop: "-22px", borderRadius: "5px"}}></div></div></> : <CourseInfo color = "#ED8A88" comp = {false} value = {value}></CourseInfo>}</>}
                        </div>
                    )
                }
                return(
                    <div className= {"p-2 pl-4 pr-8 overflow-hidden border-darker border-t-8 flex flex-row items-center justify-between"} style={{width: "calc(30vw - 8px)"}}>
                            {(courseCode in prop.courseIndexPicked)?  <>{index === prop.courseIndexPicked[courseCode]? <><CourseInfo color = "#58c75b" comp = {false} value = {value}></CourseInfo><div onClick={() => prop.removeCourse(value, courseCode)} className="hover:cursor-pointer flex items-center justify-center" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{backgroundColor: "white", width: "25px", height: "4px", borderRadius: "5px"}}></div></div></> : <></>}</>
                            :  <>{(compareTime(value))? <><CourseInfo  comp = {false} value = {value}></CourseInfo>
                                <div onClick={() => prop.addCourse(value, prop.coursePicked[props.listIndex], index)} className="hover:cursor-pointer grid" style={{height: "40px", width: "40px", color: "#ffffff", backgroundColor: "#2C343E", borderRadius:"5px"}}><div style={{width: "25px", height: "4px", backgroundColor: "white", marginLeft: "7.5px", marginTop: "18px", borderRadius: "5px"}}></div><div style={{width: "4px", height: "25px", backgroundColor: "white", marginLeft: "18px", marginTop: "-22px", borderRadius: "5px"}}></div></div></> : <CourseInfo color = "#ED8A88"  comp = {false} value = {value}></CourseInfo>}</>}
                    </div>
                )
            })}</> : <></>}
            </div>
        )
    }

    async function getClassList(school_id:string){
        setLoading(true)
        let response: any
        try{
            response = await fetch("https://api.jacschedule.com/course/search/" + school_id) 
            if (response.status !== 200) response = false
            for(let i = 0; i < 2; i++){
                if (response === false){
                    
                        await fetch("https://api.jacschedule.com/course/search/" + school_id)
                        .then((r) => r.status === 200? response = r : response = false)

                }
                else if (response.status === 200){
                    setTimeout(() => setLoading(false), 200)
                    let json = await response.json()
                    prop.setCourseList(json)

                    itemsToList(json)

                    return json
                }
            }
        } 
        catch{
            setLoading(false)
            alert("Failed to request course information, please try again later")
        }
        setLoading(false)
        alert("Failed to request course information, please try again later")
         //try to fix 2 time fetch
    }


    async function handleFormSubmit (event: any, school_id:string, input: string) {
        setLoading(true)
        event.preventDefault()
        let code = input.toUpperCase()
        let courseInfoJson: any
        let response:any = prop.courseList
        if (prop.courseList === ""){
            response = await getClassList(school_id)
        }
        if (response.includes(code) && !prop.coursePicked.includes(code)){
            if(code in prop.courseInfoCache){

                let input = [code, ...prop.coursePicked]
                prop.setCoursePicked(input)

                let courseInfoJson =  prop.courseInfoCache[code]
                let courseInfoInput = [courseInfoJson, ...prop.courseInfo]
                prop.setCourseInfo(courseInfoInput)
                setLoading(false)
            }
            else {
                try{
                    //fetch again if courselist is empty
            
                    response = await fetch("https://api.jacschedule.com/course/" + school_id + "/" + code)
                    
                    if (response.status !== 200) response = false
                    for(let i = 0; i < 2; i++){
                        if (response === false){
                            
                             await fetch("https://api.jacschedule.com/course/" + school_id + "/" + code)
                                .then((r) => r.status === 200? response = r : response = false)

                        }
                        else if (response.status === 200){
                            courseInfoJson = await response.json()
                            let input = [code, ...prop.coursePicked]
                            prop.setCoursePicked(input)
            
                            let courseInfoInput = [courseInfoJson, ...prop.courseInfo]
                            prop.setCourseInfo(courseInfoInput)

                            let cache = prop.courseInfoCache
                            cache[code] = courseInfoJson
                            prop.setCourseInfoCache(cache)

                            let colors = prop.colorList
                            colors[code] = {background: "#394351"}

                            prop.setColorList(colors)
            
                            setLoading(false)
                            inputCode.current.value = ""
                            return true
                        }
                    }
                }
                catch{
                    setLoading(false)
                    alert("Unable to Retrieve Course Information, please try again")
                }
            }
        }
        else if (prop.coursePicked.includes(code)){
            setLoading(false)
            alert("This course has already been added")
        }
        else {
            setLoading(false)
            alert("Course does not exist. If it does then it may have not been written in format: XXX-XXX-XX or it's a technical program course (add custom course)")
        }
    }


    return (
        <div className="fixed" style={{zIndex: "1000"}}>
        {loading? <div className="absolute" style={{width: "100vw", height: "100vh", marginTop: "-60px", zIndex: 50}}>
            <div className="absolute text-white font-title z-10"><div style={{width: "100vw", height: "100vh", fontSize: "5rem"}} className="flex items-center justify-center"><BeatLoader speedMultiplier={1} color="white" size={40}/></div></div>
            <div className="bg-darker absolute opacity-60" style={{width: "100%", height: "100%"}}></div>
        </div> : <></>}
        <div className="flex flex-col items-center bg-slate-700" style={{width: "30vw", padding: "10px"}}>
        <div className="flex items-center font-title text-white select-none hover:cursor-pointer" style={{  fontSize: "15px"}} onClick={() => setViewCourseInput(!viewCourseInput)}>{viewCourseInput? <FontAwesomeIcon style={{height: "15px", width: "15px", color: "#ffffff", marginRight: "5px"}} icon={faChevronDown}></FontAwesomeIcon>:<FontAwesomeIcon style={{height: "15px", width: "15px", color: "#ffffff", marginRight: "5px"}}  icon={faChevronUp}></FontAwesomeIcon>}Add Course</div>
        {viewCourseInput? <>
        <form className="flex flex-row text-white">
            <input ref = {inputCode} onChange={(event) => inputCode.current.value = event.target.value} className="bg-dark" style={{width: "170px", marginTop: "5px", height: "35px", textAlign: "center"}}></input>
            
            <button type = "submit" onClick = {(event) => {handleFormSubmit(event, "JAC", inputCode.current.value)}} className = "outline-none flex justify-center items-center hover: cursor-pointer bg-nav font-navButton text-center text-white" style={{width: "35px", height: "35px", marginTop:"5px"}}><FontAwesomeIcon style={{height: "20px", width: "20px", color: "#ffffff"}} icon={faArrowRight} /></button>
        </form>
        <form className="flex flex-col justify-center items-center" style={{marginTop: "10px"}}>
            <div className="flex items-center font-title text-white select-none hover:cursor-pointer" style={{marginBottom: "10px", fontSize: "15px"}} onClick={() => setViewCustomCourse(!viewCustomCourse)}>{viewCustomCourse? <FontAwesomeIcon style={{height: "15px", width: "15px", color: "#ffffff", marginRight: "5px"}} icon={faChevronDown}></FontAwesomeIcon>:<FontAwesomeIcon style={{height: "15px", width: "15px", color: "#ffffff", marginRight: "5px"}}  icon={faChevronUp}></FontAwesomeIcon>}Add Custom Course</div>
            {viewCustomCourse? <div className="flex flex-col justify-center items-center" style={{height: "291px"}}>
            <input ref={customCourse["code"]} onChange = {(event) => {handleCustomInput(event, 0)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "143px", padding: "10px"}} placeholder="Course Code"></input>
            <div className="text-white flex items-center space-x-1 mr-11" style={{marginTop: "15px"}}>
                <div style={{width: "40px"}}>Mon</div>
                <input ref={customCourse["MS"]} onChange = {(event) => {handleCustomInput(event, 1)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="Start Time"></input>
                <div className="font-title">-</div>
                <input ref={customCourse["ME"]} onChange = {(event) => {handleCustomInput(event, 2)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="End Time"></input>
            </div>
            <div className="text-white flex items-center space-x-1 mr-11" style={{marginTop: "10px"}}>
                <div style={{width: "40px"}}>Tue</div>
                <input ref = {customCourse["TS"]} onChange = {(event) => {handleCustomInput(event, 3)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="Start Time"></input>
                <div className="font-title">-</div>
                <input ref={customCourse["TE"]} onChange = {(event) => {handleCustomInput(event, 4)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="End Time"></input>
            </div>
            <div className="text-white flex items-center space-x-1 mr-11" style={{marginTop: "10px"}}>
                <div style={{width: "40px"}}>Wed</div>
                <input ref={customCourse["WS"]} onChange = {(event) => {handleCustomInput(event, 5)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="Start Time"></input>
                <div className="font-title">-</div>
                <input ref={customCourse["WE"]} onChange = {(event) => {handleCustomInput(event, 6)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="End Time"></input>
            </div>
            <div className="text-white flex items-center space-x-1 mr-11" style={{marginTop: "10px"}}>
                <div style={{width: "40px"}}>Thu</div>
                <input ref={customCourse["RS"]} onChange = {(event) => {handleCustomInput(event, 7)}} className = "bg-dark text-white outline-none " style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="Start Time"></input>
                <div className="font-title">-</div>
                <input ref={customCourse["RE"]} onChange = {(event) => {handleCustomInput(event, 8)}} className = "bg-dark text-white outline-none" style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="End Time"></input>
            </div>
            <div className="text-white flex items-center space-x-1 mr-11" style={{marginTop: "10px"}}>
                <div style={{width: "40px"}}>Fri</div>
                <input ref={customCourse["FS"]} onChange = {(event) => {handleCustomInput(event, 9)}} className = "bg-dark text-white outline-none " style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="Start Time"></input>
                <div className="font-title">-</div>
                <input ref={customCourse["FE"]} onChange = {(event) => {handleCustomInput(event, 10)}} className = "bg-dark text-white outline-none " style={{height: "30px", textAlign: "center", width: "65px", fontSize:"11px", padding: "5px"}}  placeholder="End Time"></input>
            </div>
            <button className="bg-nav font-title text-white" style={{height: "40px", width: "50px", marginTop: "15px", padding: "8px", marginBottom: "10px"}} type="submit" onClick={(event) => {handleCustomSubmit(event)}}>Add</button> </div>: <></>}
        </form></> : <></>}
        </div>
        <div className = "bg-list flex flex-col overflow-y-scroll items-center fixed" style={{zIndex: -1, width: "30vw", height: viewCourseInput? (viewCustomCourse? "calc(100vh - 476px)" : "calc(100vh - 185px)" ): "calc(100vh - 102.5px)"}}>
            {prop.courseInfo === "" || prop.courseInfo.length === 0? <div className="bg-darker sticky top-0 text-white font-title pt-2 pl-3 pb-2" style={{width: "calc(30vw - 8px)", fontSize: "20px"}}>Course List <span className="font-navButton" style={{fontSize: "15px", marginLeft: "5px"}}>(input a course)</span></div> : <></>}
            {prop.courseInfo !== "" && prop.courseInfo.length !== 0? <div>{prop.courseInfo.map((value: any, index: number) => {
                return(
                    <div className="text-white"><CourseList listIndex = {index}></CourseList></div>
                )
            })}</div> : <></>}
        </div>
        </div>
    )
}

export default CoursePick