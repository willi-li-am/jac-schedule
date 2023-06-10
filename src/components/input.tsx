import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { ReactSearchAutocomplete } from "react-search-autocomplete"
import { useRef } from "react"

function CourseInput(props: any){

    const [input, setInput] = useState("")

    return(
        <form className="flex flex-row">
            <div style={{width: "170px", marginTop: "5px"}}><ReactSearchAutocomplete inputDebounce={0} maxResults = {5} inputSearchString= {input} onSearch={(event) => setInput(event)} placeholder="Input Course Code" items = {props.itemsList !== null? props.itemsList: []} showIcon = {false} showClear = {false} styling={{border: "none", borderRadius: "none", backgroundColor: "#2C343E", color: "white", hoverBackgroundColor: "#292E34", height: "35px", placeholderColor: "default"}}></ReactSearchAutocomplete></div>
            <button type = "submit" onClick = {(event) => {props.handleFormSubmit(event, "JAC", input); setInput("")}} className = "outline-none flex justify-center items-center hover: cursor-pointer bg-nav font-navButton text-center text-white" style={{width: "35px", height: "35px", marginTop:"5px"}}><FontAwesomeIcon style={{height: "20px", width: "20px", color: "#ffffff"}} icon={faArrowRight} /></button>
        </form>
    )
}

export default CourseInput