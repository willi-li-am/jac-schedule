import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { nodeModuleNameResolver } from "typescript";
import { useEffect, useState, useRef } from "react";

function CourseInput(props: any){

    const [suggestList, setSuggestList] = useState([])
    const [selected, setSelected] = useState(false)
    const inputForm: any = useRef(null)

    useEffect(()=> {
        const clickAway =  (event:any) => {
            if(selected && !inputForm.current.contains(event.target)){
              setSelected(false)
            }
          }
          document.addEventListener("mousedown", clickAway)
      
          return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", clickAway)
          }
    }, [selected])

    return(
        <form ref={inputForm} className="flex flex-row text-white">
  <input
    onSelect={() => setSelected(true)}
    ref={props.inputCode}
    onChange={(event) => {
      props.inputCode.current.value = event.target.value.toUpperCase();
      setTimeout(() => {
        setSuggestList(
          props.autoComplete.current.suggest(event.target.value.toUpperCase())
        );
      }, 100);
    }}
    className="bg-dark outline-none"
    style={{ width: "170px", marginTop: "5px", height: "35px", textAlign: "center" }}
  ></input>
  <button
    type="submit"
    onClick={(event) => {
      props.handleFormSubmit(event, props.school, props.inputCode.current.value);
    }}
    className="outline-none flex justify-center items-center hover: cursor-pointer bg-nav font-navButton text-center text-white"
    style={{ width: "35px", height: "35px", marginTop: "5px" }}
  >
    <FontAwesomeIcon style={{ height: "20px", width: "20px", color: "#ffffff" }} icon={faArrowRight} />
  </button>
  {props.inputCode.current.value === "" || !selected ? (
    <></>
  ) : (
    <div className="bg-list absolute text-center border-2 border-t-0 border-darker" style={{ marginTop: "40px", width: "205px", maxHeight: "200px", overflowY: "auto" }}>
      {suggestList === null ? (
        <div style={{ padding: "5px", userSelect: "none", fontSize: "16px" }}>No results</div>
      ) : (
        <>
          {suggestList && suggestList.map((value, index) => (
            <div
              className="hover:cursor-pointer hover:bg-darker"
              onClick={(event) => {
                if (! (props.coursePicked.includes(value))) {
                    props.handleFormSubmit(event, props.school, value)
                    props.inputCode.current.value = "";
                };
              }}
              style={{ padding: "5px", userSelect: "none", fontSize: "16px", color: props.coursePicked.includes(value)? "red" : "white"}}
              key={index}
            >
              {value}
            </div>
          ))}
        </>
      )}
    </div>
  )}
</form>
    )
}

export default CourseInput