function ExportSchedule (props: any) {
    return(
        <div className="flex justify-center items-center flex-col bg-darker p-4 pt-10">
        <div onClick={() => props.setShowExport(false)} className="absolute hover:cursor-pointer" style={{top: "5px", right: "20px", fontSize: "20px"}}>&times;</div>
        <div className="text-center">Copy & Paste this onto excel or google sheets (preferably google sheets)</div>
        <div className="bg-darker grid grid-cols-4" style={{padding: "20px", height: "auto", columnGap: 0}}>
        {props.courseInfo !== "" && props.courseInfo.length !== 0?
        <>{props.coursePicked.map((code: string, index: number) => {
            if(code in props.courseIndexPicked){
                let courseIndex = props.courseIndexPicked[code]
                let course = props.courseInfo[index][courseIndex]
                let color = props.colorList[code].background
                
                return(
                    <div className="border-2 border-white p-2 text-white mr-0" style = {{height: "100px", width: "130px", backgroundColor: color}}>{code === "COMPLEMENTARY" ? course["courseCode"] : code}<br/>'{course["section"]}</div>
                )
            }
        })}</> : <></>}
        </div>
        </div>
    )
}

export default ExportSchedule