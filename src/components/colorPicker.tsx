import React, { useEffect, useRef } from "react";
import {
  ChromePicker,
  CirclePicker,
  CompactPicker,
  HuePicker,
  SketchPicker,
} from "react-color";

function ColorPicker(props: any) {
  const colorRef: any = useRef();

  useEffect(() => {
    const clickAway = (event: any) => {
      if (
        props.showColor[props.code] &&
        !colorRef.current.contains(event.target)
      ) {
        props.handleColorView(props.code, false);
      }
    };
    document.addEventListener("mousedown", clickAway);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickAway);
    };
  }, [props.showColor[props.code]]);

  return (
    <div
      ref={colorRef}
      style={{ zIndex: "4" }}
      onMouseLeave={() => {
        props.handleColorView(props.code, false);
      }}
    >
      <div
        onClick={() => {
          props.handleColorView(props.code);
        }}
        className="rounded-sm hover:cursor-pointer border-2 border-white"
        style={{
          backgroundColor: props.colorList[props.code].background,
          width: "25px",
          height: "25px",
        }}
      ></div>
      {props.showColor[props.code] ? (
        <div
          className="absolute text-black z-10"
          style={{ marginLeft: "-100px" }}
        >
          <ChromePicker
            disableAlpha
            color={props.colorList[props.code].background}
            onChangeComplete={(input) => props.handleColor(input, props.code)}
          ></ChromePicker>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ColorPicker;
