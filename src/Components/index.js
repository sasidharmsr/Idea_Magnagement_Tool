import React, { useEffect, useState } from 'react'
import {Nav} from './nav'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Cookies from "js-cookie";
import {Mainmodal} from './form'
import { Bucket } from './Bucket';
import { Button } from 'reactstrap';

export const Index = () => {
   // Cookies.remove("idea_msr_management");
    const [modalbool,setmodalbool]=useState(false);
    const [showgrp,setshowgrp]=useState(false);
    const [data,setdata]=useState({buckets:[]})
    const [editdata,seteditdata]=useState({id:'',ssid:'',data:[]})


    const fun=()=>{
        setmodalbool(true);
    }

    useEffect(()=>{
        if(Cookies.get("idea_msr_management"))
        {
            setdata(JSON.parse(Cookies.get("idea_msr_management")));
        }
        document.body.style.zoom = "100%";
    },[])

    useEffect(()=>{
        if(data?.buckets.length>0){
        Cookies.remove("idea_msr_management");
        Cookies.set("idea_msr_management", JSON.stringify(data));
        }
    },[data?.buckets?.length>0])


    const create_bucket=(formdata,id,sampleid)=>{
        if(data.buckets.find((index)=>index.id==id))
        {
            const temp=data;
            temp.buckets.forEach((index)=>{
                if(id===index.id){
                    index.data.push({...formdata,id:sampleid})
                }
            })
            setdata(temp);
            if(Cookies.get("idea_msr_management")){
                Cookies.remove("idea_msr_management");
                Cookies.set("idea_msr_management", JSON.stringify(temp));}
        }
        else
        {
            const temp=data;
            temp.buckets.push({id:id,data:[{...formdata,id:sampleid}]});
            if(Cookies.get("idea_msr_management")){
            Cookies.remove("idea_msr_management");
            Cookies.set("idea_msr_management", JSON.stringify(temp));}
            setdata(temp);
        }
        if(editdata.id!=='')
        {
            delet(editdata.id,editdata.ssid);
            seteditdata({id:'',ssid:'',data:[]})
        }
    }
    const updat=(id,sampleid)=>{
        let temp;
        for(let i of data.buckets)
        {
            if(i.id===id)
            {
                for(let j of i.data)
                {
                    if(j.id===sampleid){
                        temp=j;
                }
                }
            }
        }
        seteditdata({id:id,ssid:sampleid,data:temp});
        setmodalbool(true);
    }

    const delet=(id,sampleid)=>{
        const temp={buckets:[]};
        for(let i of data.buckets)
        {
            if(i.id!==id)
            {
                temp.buckets.push(i);
            }
            else if(i.id===id)
            {
                let temp_data=[];
                for(let j of i.data)
                {
                    if(j.id!==sampleid){
                        temp_data.push(j);
                }
                }
                if(temp_data?.length>0)temp.buckets.push({id:i.id,data:temp_data});
            }
        }
        setdata(temp);
        if(Cookies.get("idea_msr_management")){
        Cookies.remove("idea_msr_management");
        Cookies.set("idea_msr_management", JSON.stringify(temp));}
    }


    const Recreate=(id, SampleId,bucketId)=>{
        const temp={buckets:[]};
        let temp_val;
        for(let i of data.buckets)
        {
            if(i.id!==bucketId)
            {
                temp.buckets.push(i);
            }
            else if(i.id===bucketId)
            {
                let temp_data=[];
                for(let j of i.data)
                {
                    if(j.id!==SampleId){
                        temp_data.push(j);
                    }
                    else
                        temp_val=j;
                }
                if(temp_data?.length>0)temp.buckets.push({id:i.id,data:temp_data});
            }
        }

        for(let i of temp.buckets)
        {
            if(i.id===id)
            {
                temp_val.bucket=i.data[0].bucket;
                i.data.push(temp_val);
            }
        }
        setdata(temp);
        if(Cookies.get("idea_msr_management")){
            Cookies.remove("idea_msr_management");
            Cookies.set("idea_msr_management", JSON.stringify(temp));}
    }
    const handleOnDragEnd=(result)=> {
        if (!result.destination ) return;
        const SampleId = result.source.index,
        bucketId = result.source.droppableId;
        // console.log({ SampleId, bucketId });
        const newBucketId = result.destination.droppableId;
        if(bucketId===newBucketId)return;
        //const noteToMove = this.findNoteFromId(SampleId, bucketId);
        //console.log({ noteToMove });
     //   delet(bucketId,SampleId);
        Recreate(newBucketId, SampleId,bucketId);
      }

    //Cookies.remove("idea_msr_management");
    return (
        <div>
            <Nav buck={fun} grp={()=>setshowgrp(true)} yoa={()=>setshowgrp(false)}/>
            <DragDropContext  onDragEnd={handleOnDragEnd}>
            <div className="container-fluid">
            <Mainmodal Allbuckets={data.buckets} edit_bucket={editdata} create_bucket={create_bucket} is_open={modalbool} is_toggle={()=>{modalbool?setmodalbool(false):setmodalbool(true)}}/>
            <React.Fragment>
                <div className='row' style={{display:"flex",flexWrap:"wrap"}}>
                {data?.buckets.map((buck,index)=>{
                    return(
                        <div key={index+"hi"}  style={{ display: "inline-block",width: "47%" }}>
                            <Droppable key={buck.id} droppableId={buck.id}>
                            {
                                (provided)=>(
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                <Bucket allbuckets={buck.data} id={buck.id} showgrp={showgrp} updat={updat} delet={delet} />
                                {provided.placeholder}
                                </div>
                                )
                            }
                            </Droppable>
                        </div>
                    )
                })}
                </div>
            </React.Fragment>
            </div>
            </DragDropContext>
        </div>

    )
}
