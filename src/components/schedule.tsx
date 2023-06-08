import { useState } from "react"

function Schedule (props: any) {

    const [showMore, setShowMore] = useState(false)

    function timeToSchedule(schedule: any){
        let time = schedule.split("-")
        let time1 = parseInt(time[0])
        let time2 = parseInt(time[1])
        let hours = Math.floor(time2/100) - Math.floor(time1/100)
        let minutes = ((time2 % 100) - (time1 % 100))/60

        let heightMult = hours + minutes
        let height = "calc(100% * " + heightMult + "/11 + 2px)"
        if (time2 === 19) height = "calc(100% * " + heightMult + "/11 + 3px)"
        
        let timeHeight = (Math.floor(time1/100) + ((time1 % 100)/60)) - 8
        let margin = "calc((100vh - 198px) *" + timeHeight + "/11 - 1px)"

        return([height, margin])
    }

    function ToSchedule(props:any){
        let courseScheduleList = []
        for (const day in props.course["schedule"]) {
            if (day !== "" && day === "M") {
                let format = timeToSchedule(props.course["schedule"][day])
                let height = format[0]
                let margin = format[1]
                
                courseScheduleList.push(<div className="bg-list absolute" style={{width: "20%",backgroundColor: props.color, height: height, marginLeft: "calc(20% * 0 - 1px)", marginTop: margin,  borderBottomWidth: "2px",borderTopWidth: "2px", borderColor: "white"}}>
                    <div style={{marginLeft: "8px", fontSize: "0.9rem", marginTop: "5px"}}>{props.courseCode === "COMPLEMENTARY"? props.course["courseCode"] : props.courseCode}</div>
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.5rem"}}>{props.course["title"]}</div> : <></>}
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.9rem"}}>{props.course["section"]}</div> : <></>}
                </div>)
            }
            else if (day !== "" && day === "T") {
                let format = timeToSchedule(props.course["schedule"][day])
                let height = format[0]
                let margin = format[1]
                
                courseScheduleList.push(<div className="bg-list absolute" style={{width: "20%",backgroundColor: props.color, height: height, marginLeft: "calc(20% * 1)", marginTop: margin, borderWidth: "1px", borderBottomWidth: "2px",borderTopWidth: "2px", borderColor: "white"}}>
                    <div style={{marginLeft: "8px", fontSize: "0.9rem", marginTop: "5px"}}>{props.courseCode === "COMPLEMENTARY"? props.course["courseCode"] : props.courseCode}</div>
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.5rem"}}>{props.course["title"]}</div> : <></>}
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.9rem"}}>{props.course["section"]}</div> : <></>}
                </div>)
            }
            else if (day !== "" && day === "W") {
                let format = timeToSchedule(props.course["schedule"][day])
                let height = format[0]
                let margin = format[1]
                
                courseScheduleList.push(<div className="bg-list absolute" style={{width: "20%", backgroundColor: props.color, height: height, marginLeft: "calc(20% * 2)", marginTop: margin, borderWidth: "1px", borderBottomWidth: "2px",borderTopWidth: "2px", borderColor: "white"}}>
                    <div style={{marginLeft: "8px", fontSize: "0.9rem", marginTop: "5px"}}>{props.courseCode === "COMPLEMENTARY"? props.course["courseCode"] : props.courseCode}</div>
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.5rem"}}>{props.course["title"]}</div> : <></>}
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.9rem"}}>{props.course["section"]}</div> : <></>}
                </div>)
            }
            else if (day !== "" && day === "R") {
                let format = timeToSchedule(props.course["schedule"][day])
                let height = format[0]
                let margin = format[1]
                
                courseScheduleList.push(<div className="bg-list absolute" style={{width: "20%",backgroundColor: props.color, height: height, marginLeft: "calc(20% * 3)", marginTop: margin, borderWidth: "1px", borderBottomWidth: "2px",borderTopWidth: "2px", borderColor: "white"}}>
                    <div style={{marginLeft: "8px", fontSize: "0.9rem", marginTop: "5px"}}>{props.courseCode === "COMPLEMENTARY"? props.course["courseCode"] : props.courseCode}</div>
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.5rem"}}>{props.course["title"]}</div> : <></>}
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.9rem"}}>{props.course["section"]}</div> : <></>}
                </div>)
            }
            else if (day !== "" && day === "F") {
                let format = timeToSchedule(props.course["schedule"][day])
                let height = format[0]
                let margin = format[1]
                
                courseScheduleList.push(<div className="bg-list absolute" style={{width: "20%",backgroundColor: props.color, height: height, marginLeft: "calc(20% * 4)", marginTop: margin, borderLeftWidth: '1px', borderBottomWidth: "2px",borderTopWidth: "2px", borderColor: "white"}}>
                    <div style={{marginLeft: "8px", fontSize: "0.9rem", marginTop: "5px"}}>{props.courseCode === "COMPLEMENTARY"? props.course["courseCode"] : props.courseCode}</div>
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.5rem"}}>{props.course["title"]}</div> : <></>}
                    {props.course["type"] !== "custom"? <div style={{marginLeft: "8px", fontSize: "0.9rem"}}>{props.course["section"]}</div> : <></>}
                </div>)
            }
        }
        return (<div className="absolute overflow-hidden z-1 select-none" style={{marginLeft: "", width: "calc(70vw - 108px)", height: "calc(100vh - 198px)"}}>{courseScheduleList.map((value) => {
            return(value)
        })}</div>)
    }

    return(
        <div className="flex text-white" style={{marginTop: "10px"}}>
            <div className = "bg-darker border-white flex flex-row"style={{width: "calc(70vw - 40px)", height: "calc(100vh - 150px)", marginLeft: "20px", marginRight: "20px", marginTop: ""}}>
                <div className = "bg-dark" style={{minWidth:"60px", maxWidth: "60px", paddingRight: "10px", height: "100%", borderColor: "grey", fontSize: "16px"}}>
                    <div className="flex flex-col justify-center" style={{marginTop: "18px", height: "calc(100% - 48px)"}}>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>8:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>9:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>10:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>11:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>12:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>13:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>14:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>15:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>16:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>17:00</div>
                    <div className="flex flex-row-reverse items-center" style={{minHeight: "calc(100%/11)", maxHeight:"calc(100%/11)"}}>18:00</div>
                    </div>
                </div>
                <div className="flex flex-col w-full" style={{borderWidth: "4px", borderBottomWidth: "4px", borderColor: "white", width: "100%"}}>
                    <div className="flex flex-row" style={{height: "40px", width: "100%"}}>
                        <div className = "flex items-center justify-center" style={{ textAlign: "center", borderBottomWidth: "1px", borderColor: "white", borderRightWidth: "1px", width: "20%"}}>Mon</div>
                        <div className = "flex items-center justify-center" style={{ textAlign: "center", borderBottomWidth: "1px", borderColor: "white",  borderLeftWidth: "1px", borderRightWidth: "1px", width: "20%"}}>Tue</div>
                        <div className = "flex items-center justify-center" style={{ textAlign: "center", borderBottomWidth: "1px", borderColor: "white",  borderLeftWidth: "1px", borderRightWidth: "1px", width: "20%"}}>Wed</div>
                        <div className = "flex items-center justify-center" style={{ textAlign: "center", borderBottomWidth: "1px", borderColor: "white",  borderLeftWidth: "1px", borderRightWidth: "1px", width: "20%"}}>Thu</div>
                        <div className = "flex items-center justify-center" style={{ textAlign: "center", borderBottomWidth: "1px", borderColor: "white", borderLeftWidth: "1px", width: "20%"}}>Fri</div>
                    </div>
                    <div className="flex flex-col" style={{height: "calc(100% - 40px)"}}>
                        <div className="absolute" style={{marginLeft: "", width: "calc(70vw - 108px)", height: "calc(100vh - 198px)"}}>
                            {props.courseInfo !== "" && props.courseInfo.length !== 0? <div>{(props.coursePicked).map((code: string, index: number) => {
                                    if(code in props.courseIndexPicked){
                                        let courseIndex = props.courseIndexPicked[code]
                                        let course = props.courseInfo[index][courseIndex]
                                        let color = props.colorList[code].background
                                        return (<ToSchedule courseCode = {code} course = {course} color = {color}></ToSchedule>)
                                    }
                                    })}</div> : <></>}
                        </div>
                        <div className="flex flex-row" style={{height: "100%", width: '100%'}}>
                            <div className="flex flex-col" style={{height: "100%", width: '20%', borderRightWidth: "1px", borderColor: "white"}}>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)",  textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey", borderTopColor: "white",  borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white"}}></div>
                            </div>
                            <div className="flex flex-col" style={{height: "100%", width: '20%', borderLeftWidth: "1px", borderRightWidth: "1px", borderColor: "white"}}>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)",  textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey", borderTopColor: "white",  borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white"}}></div>
                            </div>
                            <div className="flex flex-col" style={{height: "100%", width: '20%', borderLeftWidth: "1px", borderRightWidth: "1px", borderColor: "white"}}>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)",  textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey", borderTopColor: "white",  borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white"}}></div>
                            </div>
                            <div className="flex flex-col" style={{height: "100%", width: '20%', borderLeftWidth: "1px", borderRightWidth: "1px", borderColor: "white"}}>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)",  textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey", borderTopColor: "white",  borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white"}}></div>
                            </div>
                            <div className="flex flex-col" style={{height: "100%", width: '20%', borderLeftWidth: "1px", borderColor: "white"}}>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)",  textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey", borderTopColor: "white",  borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderBottomWidth: "1px", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white", borderLeftColor: "white"}}></div>
                                <div className = "flex items-center justify-center" style={{height: "calc(100%/11)", textAlign: "center", borderTopWidth: "1px", borderColor: "grey",   borderRightColor: "white"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div onMouseLeave={() => setShowMore(false)} className="absolute" style = {{right: 0, bottom: 0, marginBottom: "70px", width: "150px", marginRight: "20px"}}>
                <button className="bg-list text-white font-title p-4 rounded-md absolute" style={{width: "150px"}} onClick={() => setShowMore(!showMore)}>Show More</button>
                {showMore? <div className="bg-list absolute" style={{height: "120px", marginTop: "-120px", width: "200px", marginLeft: "-50px"}}>
                    <button className="hover:bg-navButton text-white font-title p-4" style={{width: "200px", height: "60px"}} onClick={props.clearCourse}>Export Course</button>
                    <button className="hover:bg-navButton text-white font-title p-4" style={{width: "200px", height: "60px"}} onClick={props.clearCourse}>&times; Clear All</button>
                </div> : <></>}
            </div>
            
        </div>
    )
}

export default Schedule