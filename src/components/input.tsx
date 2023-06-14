import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

function CourseInput(props: any){

    //<div style={{width: "170px", marginTop: "5px"}}><ReactSearchAutocomplete maxResults = {5} onSearch={(event) => props.inputCode.current = event} placeholder="Input Course Code" items = {props.itemsList !== null? props.itemsList: []} showIcon = {false} showClear = {false} styling={{border: "none", borderRadius: "none", backgroundColor: "#2C343E", color: "white", hoverBackgroundColor: "#292E34", height: "35px", placeholderColor: "default"}}></ReactSearchAutocomplete></div>

    return(
        <form className="flex flex-row text-white">
            <input ref = {props.inputCode} onChange={(event) => props.inputCode.current.value = event.target.value} className="bg-dark outline-none" style={{width: "170px", marginTop: "5px", height: "35px", textAlign: "center"}}></input>
            <button type = "submit" onClick = {(event) => {props.handleFormSubmit(event, "JAC", props.inputCode.current.value)}} className = "outline-none flex justify-center items-center hover: cursor-pointer bg-nav font-navButton text-center text-white" style={{width: "35px", height: "35px", marginTop:"5px"}}><FontAwesomeIcon style={{height: "20px", width: "20px", color: "#ffffff"}} icon={faArrowRight} /></button>
        </form>
    )
}

export default CourseInput