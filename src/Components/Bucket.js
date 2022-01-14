import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import {Info} from './Info'

export const Bucket = ({sample,allbuckets,id,showgrp,delet,updat}) => {

    const delteee=(sampleid)=>{
        delet(id,sampleid)
    }

    const editttt=(sampleid)=>{
        updat(id,sampleid)
    }

    if(showgrp===false){
    return (
        <React.Fragment>
            { !showgrp && 
                allbuckets && allbuckets.map((data,index)=>{
                    return(
                        <div key={index+"i"}  style={{ width: "250px", display: "inline-block" }}>
                        <Draggable key={data.id} draggableId={data.id} index={data.id}>
                        {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Info data={data} sample={sample} id={data.id} delet={delteee} updat={editttt} boo={true}/>
                          </div>
                        )}
                        </Draggable>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )}
    else
    {
        return (
            <div style={{ backgroundColor:"#9fb5a3",margin:10,padding:10}}>
        <div
        className="group"
        style={{
          display: !showgrp ? "inline-block" : "contents",
          width: showgrp ? "2px" : "auto",
        }}
      >
          <div className="text-center d-flex justify-content-center" style={{margin:10}}>
            <div
              className="head-box"
              style={{backgroundColor:"white",width:180,height:50,fontSize:25,fontWeight:500,borderRadius:3
                ,borderStyle:"solid",borderWidth:1,
            }}
            >
              {allbuckets[0].bucket}
            </div>
            </div>
          <div style={{ display: showgrp ? "block" : "inline" }}>
              { allbuckets && allbuckets.map((data,index)=>{
                    return(
                        <div key={index+"i"}  style={{ width: "220px", display: "inline-block" }}>
                         <Draggable key={data.id} draggableId={data.id} index={data.id}>
                        {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                            <Info data={data} sample={sample} id={data.id} delet={delteee} updat={editttt} boo={false}/>
                          </div>
                        )}
                        </Draggable>
                        </div>
                    )
                })
            }
            </div>
            </div>
            </div>
        )
    }
}
