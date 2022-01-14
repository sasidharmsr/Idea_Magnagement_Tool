import logo from './logo.svg';
import {Index} from './Components/index'
import Rect from './Components/rectanle'
import React, { useState } from 'react'
import "./index.css"
import { Button } from 'reactstrap';
import styled from 'styled-components';

function App() {
  const [dimensions,setdimensions]=useState([]);

  const [rectanglezone,setrectanglezone]=useState(false);
  const togglee=()=>{
    if(rectanglezone)setrectanglezone(false);
    else setrectanglezone(true);
  }

  const temp_map=new Map();
  const [locations,setlocations]=useState(temp_map);
  const [modalbool,setmodalbool]=useState(false);

  const funn=(x)=>{
    setTimeout(()=>{
        //console.log(data.buckets[0].id)
       // console.log(document.getElementById(data.buckets[0].id).getBoundingClientRect())
        const temp_maap=locations;
        temp_maap.set(x,document.getElementById(x).getBoundingClientRect());
        setlocations(temp_maap)
    },10)
}
const uhyg=()=>{
  setrectanglezone(false)
}
  const onSelect=(rec)=>{
      let arr=[];
      for(let i of locations)
      {
     //   console.log(i);
        if((rec.x<=i[1].x && rec.x+rec.w>=i[1].x) && (rec.y<=i[1].y && rec.y+rec.h>=i[1].y))
        {
          arr.push(i[0].substring(3));
        }
        else if((i[1].x<=rec.x && i[1].x+i[1].width>=rec.x )&& (i[1].y<=rec.y && i[1].y+i[1].height>=rec.y))
        {
          arr.push(i[0].substring(3));
        }
      }
      if(arr.length>0){
        setmodalbool(true);
        setdimensions(arr);
      }
  }
if(rectanglezone){
  return (
    <div>
      <div className='d-flex justify-content-center m-3'>
      <button onClick={()=>uhyg()} className='buttont'><i class="fas fa-times"></i></button>
      </div>
    <div style={{position:"absolute" ,marginTop:20 }}>
      <Index samplee={funn} togglee={togglee} zone={rectanglezone} dataa={dimensions} boo={modalbool} is_toggleed={()=>{modalbool?setmodalbool(false):setmodalbool(true)}}/>
    </div>
    <Rect onSelected={onSelect} />
    </div>
  );
}
else
{
  return (
      <Index samplee={funn} togglee={togglee} dataa={dimensions} zone={rectanglezone} boo={modalbool} is_toggleed={()=>{modalbool?setmodalbool(false):setmodalbool(true)}}/>
  );
}
}
export default App;
