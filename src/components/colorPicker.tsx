import React from 'react';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

function colorPicker() {
  const [color, setColor] = useState({background:"#fcba03"})
  function handleColor(input:any):void {
    setColor({background: input.hex})
  }
  return (
    <>
      <div className='bg-dark text-white'>Hello World</div>
      <div className='bg-black text-white'>Hello World</div>
      <SketchPicker color = {color.background} onChange = {handleColor}></SketchPicker>
      <div style={{backgroundColor: color.background, width: "100vw", height: "100vh"}}>Hello</div>
    </>
  );
}