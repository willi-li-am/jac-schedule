import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import ExportSchedule from "./export";
import CoursePick from "./coursePick";

function Schedule(props: any) {
  const [hoverCourse, setHoverCourse]: any = useState("hi");
  const [showMore, setShowMore] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const moreRef: any = useRef();

  useEffect(() => {}, [props.hoverCourse.current]);

  useEffect(() => {
    const clickAway = (event: any) => {
      if (showMore && !moreRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", clickAway);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickAway);
    };
  }, [showMore]);

  function timeToSchedule(schedule: any) {
    let time = schedule.split("-");
    let time1 = parseInt(time[0]);
    let time2 = parseInt(time[1]);
    let hours = Math.floor(time2 / 100) - Math.floor(time1 / 100);
    let minutes = ((time2 % 100) - (time1 % 100)) / 60;

    let heightMult = hours + minutes;
    let height = "calc(100% * " + heightMult + "/11 + 2px)";
    if (time2 === 19) height = "calc(100% * " + heightMult + "/11 + 3px)";

    let timeHeight = Math.floor(time1 / 100) + (time1 % 100) / 60 - 8;
    let margin = "calc((100vh - 198px) *" + timeHeight + "/11 - 1px)";

    return [height, margin];
  }

  function ToSchedule(props: any) {
    let courseScheduleList = [];
    for (const day in props.course["schedule"]) {
      if (day === "M" && props.course["schedule"][day] != "") {
        let format = timeToSchedule(props.course["schedule"][day]);
        let height = format[0];
        let margin = format[1];

        courseScheduleList.push(
          <div
            className="bg-list absolute"
            style={{
              width: "20%",
              backgroundColor: props.color,
              height: height,
              marginLeft: "calc(20% * 0 - 1px)",
              marginTop: margin,
              borderBottomWidth: "2px",
              borderTopWidth: "2px",
              borderColor: "white",
              opacity: props.course["type"] == "hover" ? "60%" : "100%",
            }}
          >
            <div className="flex justify-center font-title text-center p-1">
              {props.course["type"] !== "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.course["title"]}</div>
              ) : (
                <></>
              )}
              {props.course["type"] === "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.courseCode}</div>
              ) : (
                <></>
              )}
            </div>
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["teacher"]}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.courseCode === "COMPLEMENTARY"
                  ? props.course["courseCode"]
                  : props.courseCode}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["section"]}
              </div>
            ) : (
              <></>
            )}
          </div>,
        );
      } else if (day === "T" && props.course["schedule"][day] != "") {
        let format = timeToSchedule(props.course["schedule"][day]);
        let height = format[0];
        let margin = format[1];

        courseScheduleList.push(
          <div
            className="bg-list absolute"
            style={{
              width: "20%",
              backgroundColor: props.color,
              height: height,
              marginLeft: "calc(20% * 1)",
              marginTop: margin,
              borderWidth: "1px",
              borderBottomWidth: "2px",
              borderTopWidth: "2px",
              borderColor: "white",
              opacity: props.course["type"] === "hover" ? "60%" : "100%",
            }}
          >
            <div className="flex justify-center font-title text-center p-1">
              {props.course["type"] !== "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.course["title"]}</div>
              ) : (
                <></>
              )}
              {props.course["type"] === "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.courseCode}</div>
              ) : (
                <></>
              )}
            </div>
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["teacher"]}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.courseCode === "COMPLEMENTARY"
                  ? props.course["courseCode"]
                  : props.courseCode}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["section"]}
              </div>
            ) : (
              <></>
            )}
          </div>,
        );
      } else if (day === "W" && props.course["schedule"][day] != "") {
        let format = timeToSchedule(props.course["schedule"][day]);
        let height = format[0];
        let margin = format[1];

        courseScheduleList.push(
          <div
            className="bg-list absolute"
            style={{
              width: "20%",
              backgroundColor: props.color,
              height: height,
              marginLeft: "calc(20% * 2)",
              marginTop: margin,
              borderWidth: "1px",
              borderBottomWidth: "2px",
              borderTopWidth: "2px",
              borderColor: "white",
              opacity: props.course["type"] === "hover" ? "60%" : "100%",
            }}
          >
            <div className="flex justify-center font-title text-center p-1">
              {props.course["type"] !== "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.course["title"]}</div>
              ) : (
                <></>
              )}
              {props.course["type"] === "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.courseCode}</div>
              ) : (
                <></>
              )}
            </div>
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["teacher"]}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.courseCode === "COMPLEMENTARY"
                  ? props.course["courseCode"]
                  : props.courseCode}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["section"]}
              </div>
            ) : (
              <></>
            )}
          </div>,
        );
      } else if (day === "R" && props.course["schedule"][day] != "") {
        let format = timeToSchedule(props.course["schedule"][day]);
        let height = format[0];
        let margin = format[1];

        courseScheduleList.push(
          <div
            className="bg-list absolute"
            style={{
              width: "20%",
              backgroundColor: props.color,
              height: height,
              marginLeft: "calc(20% * 3)",
              marginTop: margin,
              borderWidth: "1px",
              borderBottomWidth: "2px",
              borderTopWidth: "2px",
              borderColor: "white",
              opacity: props.course["type"] == "hover" ? "60%" : "100%",
            }}
          >
            <div className="flex justify-center font-title text-center p-1">
              {props.course["type"] !== "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.course["title"]}</div>
              ) : (
                <></>
              )}
              {props.course["type"] === "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.courseCode}</div>
              ) : (
                <></>
              )}
            </div>
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["teacher"]}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.courseCode === "COMPLEMENTARY"
                  ? props.course["courseCode"]
                  : props.courseCode}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["section"]}
              </div>
            ) : (
              <></>
            )}
          </div>,
        );
      } else if (day === "F" && props.course["schedule"][day] != "") {
        let format = timeToSchedule(props.course["schedule"][day]);
        let height = format[0];
        let margin = format[1];

        courseScheduleList.push(
          <div
            className="bg-list absolute"
            style={{
              width: "20%",
              backgroundColor: props.color,
              height: height,
              marginLeft: "calc(20% * 4)",
              marginTop: margin,
              borderLeftWidth: "1px",
              borderBottomWidth: "2px",
              borderTopWidth: "2px",
              borderColor: "white",
              opacity: props.course["type"] == "hover" ? "60%" : "100%",
            }}
          >
            <div className="flex justify-center font-title text-center p-1">
              {props.course["type"] !== "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.course["title"]}</div>
              ) : (
                <></>
              )}
              {props.course["type"] === "custom" ? (
                <div style={{ fontSize: "10%" }}>{props.courseCode}</div>
              ) : (
                <></>
              )}
            </div>
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["teacher"]}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.courseCode === "COMPLEMENTARY"
                  ? props.course["courseCode"]
                  : props.courseCode}
              </div>
            ) : (
              <></>
            )}
            {props.course["type"] !== "custom" ? (
              <div style={{ marginLeft: "8px", fontSize: "0.6rem" }}>
                {props.course["section"]}
              </div>
            ) : (
              <></>
            )}
          </div>,
        );
      }
    }
    return (
      <div
        className="absolute overflow-hidden z-1 select-none"
        style={{
          marginLeft: "",
          width: "calc(70vw - 108px)",
          height: "calc(100vh - 198px)",
        }}
      >
        {courseScheduleList.map((value) => {
          return value;
        })}
      </div>
    );
  }

  return (
    <div className="flex text-white" style={{ marginTop: "10px" }}>
      <div
        className="bg-darker border-white flex flex-row"
        style={{
          width: "calc(70vw - 40px)",
          height: "calc(100vh - 150px)",
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "",
        }}
      >
        <div
          className="bg-dark"
          style={{
            minWidth: "60px",
            maxWidth: "60px",
            paddingRight: "10px",
            height: "calc(100vh - 150px)",
            borderColor: "grey",
            fontSize: "16px",
          }}
        >
          <div
            className="flex flex-col justify-center"
            style={{
              marginTop: "32px",
              height: "calc(100vh - 198px)",
              fontSize: "16px",
            }}
          >
            <div
              className="flex flex-row-reverse"
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              8:00
            </div>
            <div
              className="flex flex-row-reverse"
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              9:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              10:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              11:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              12:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              13:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              14:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              15:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              16:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              17:00
            </div>
            <div
              className="flex flex-row-reverse "
              style={{ minHeight: "calc(100%/11)", maxHeight: "calc(100%/11)" }}
            >
              18:00
            </div>
          </div>
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            borderWidth: "4px",
            borderBottomWidth: "4px",
            borderColor: "white",
            width: "100%",
          }}
        >
          <div
            className="flex flex-row"
            style={{ height: "40px", width: "100%" }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                textAlign: "center",
                borderBottomWidth: "1px",
                borderColor: "white",
                borderRightWidth: "1px",
                width: "20%",
              }}
            >
              Mon
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                textAlign: "center",
                borderBottomWidth: "1px",
                borderColor: "white",
                borderLeftWidth: "1px",
                borderRightWidth: "1px",
                width: "20%",
              }}
            >
              Tue
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                textAlign: "center",
                borderBottomWidth: "1px",
                borderColor: "white",
                borderLeftWidth: "1px",
                borderRightWidth: "1px",
                width: "20%",
              }}
            >
              Wed
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                textAlign: "center",
                borderBottomWidth: "1px",
                borderColor: "white",
                borderLeftWidth: "1px",
                borderRightWidth: "1px",
                width: "20%",
              }}
            >
              Thu
            </div>
            <div
              className="flex items-center justify-center"
              style={{
                textAlign: "center",
                borderBottomWidth: "1px",
                borderColor: "white",
                borderLeftWidth: "1px",
                width: "20%",
              }}
            >
              Fri
            </div>
          </div>
          <div
            className="flex flex-col"
            style={{ height: "calc(100% - 40px)" }}
          >
            <div
              className="absolute"
              style={{
                marginLeft: "",
                width: "calc(70vw - 108px)",
                height: "calc(100vh - 198px)",
              }}
            >
              {props.courseInfo !== "" && props.courseInfo.length !== 0 ? (
                <div>
                  {props.coursePicked.map((code: string, index: number) => {
                    if (code in props.courseIndexPicked) {
                      let courseIndex = props.courseIndexPicked[code];
                      let course = props.courseInfo[index][courseIndex];
                      course["type"] = "course";
                      let color = props.colorList[code].background;
                      return (
                        <ToSchedule
                          courseCode={code}
                          course={course}
                          color={color}
                        ></ToSchedule>
                      );
                    }
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              className="absolute"
              style={{
                marginLeft: "",
                width: "calc(70vw - 108px)",
                height: "calc(100vh - 198px)",
              }}
            >
              {"code" in props.hoverCourse.current &&
              "course" in props.hoverCourse.current ? (
                <ToSchedule
                  courseCode={props.hoverCourse.current["code"]}
                  course={props.hoverCourse.current["course"]}
                  color={
                    props.colorList[props.hoverCourse.current["code"]]
                      .background
                  }
                ></ToSchedule>
              ) : (
                <></>
              )}
            </div>
            <div
              className="flex flex-row"
              style={{ height: "100%", width: "100%" }}
            >
              <div
                className="flex flex-col"
                style={{
                  height: "100%",
                  width: "20%",
                  borderRightWidth: "1px",
                  borderColor: "white",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderTopColor: "white",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                  }}
                ></div>
              </div>
              <div
                className="flex flex-col"
                style={{
                  height: "100%",
                  width: "20%",
                  borderLeftWidth: "1px",
                  borderRightWidth: "1px",
                  borderColor: "white",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderTopColor: "white",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                  }}
                ></div>
              </div>
              <div
                className="flex flex-col"
                style={{
                  height: "100%",
                  width: "20%",
                  borderLeftWidth: "1px",
                  borderRightWidth: "1px",
                  borderColor: "white",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderTopColor: "white",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                  }}
                ></div>
              </div>
              <div
                className="flex flex-col"
                style={{
                  height: "100%",
                  width: "20%",
                  borderLeftWidth: "1px",
                  borderRightWidth: "1px",
                  borderColor: "white",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderTopColor: "white",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                  }}
                ></div>
              </div>
              <div
                className="flex flex-col"
                style={{
                  height: "100%",
                  width: "20%",
                  borderLeftWidth: "1px",
                  borderColor: "white",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderTopColor: "white",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderBottomWidth: "1px",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                    borderLeftColor: "white",
                  }}
                ></div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    height: "calc(100%/11)",
                    textAlign: "center",
                    borderTopWidth: "1px",
                    borderColor: "grey",
                    borderRightColor: "white",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div
        ref={moreRef}
        className="absolute"
        style={{
          right: 0,
          bottom: 0,
          marginBottom: "70px",
          width: "60px",
          marginRight: "20px",
        }}
      >
        <button
          className="bg-list text-white font-title absolute"
          style={{
            width: "60px",
            height: "60px",
            padding: "15px",
            borderRadius: "10px",
          }}
          onClick={() => setShowMore(!showMore)}
        >
          <FontAwesomeIcon
            style={{ width: "30px", height: "30px" }}
            icon={faBars}
          />
        </button>
        {showMore ? (
          <div
            className="bg-list relative border-2 border-white"
            style={{
              height: "120px",
              marginTop: "-120px",
              width: "200px",
              marginLeft: "-140px",
            }}
          >
            <button
              className="hover:bg-navButton text-white font-title p-4"
              style={{ width: "196px", height: "58px" }}
              onClick={() => {
                setShowExport(true);
                setShowMore(false);
              }}
            >
              Export Course
            </button>
            <button
              className="hover:bg-navButton text-white font-title p-4"
              style={{ width: "196px", height: "58px" }}
              onClick={() => {
                props.clearCourse();
                setShowMore(false);
              }}
            >
              &times; Clear All
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {showExport ? (
        <div className="bg-list" style={{ position: "absolute" }}>
          <div
            style={{
              position: "absolute",
              zIndex: 100000,
              width: "40vw",
              height: "60vh",
              marginTop: "20px",
            }}
          >
            <ExportSchedule
              setShowExport={setShowExport}
              courseInfo={props.courseInfo}
              coursePicked={props.coursePicked}
              courseIndexPicked={props.courseIndexPicked}
              colorList={props.colorList}
            ></ExportSchedule>
          </div>
          <div
            className="bg-list"
            style={{
              position: "absolute",
              width: "100vw",
              height: "calc(100vh - 60px)",
              top: "-10px",
              left: "-30vw",
              zIndex: 1000,
              opacity: "70%",
            }}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Schedule;
