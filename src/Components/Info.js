import React from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components'

export const Info = ({data,id,delet,updat,boo,sample}) => {

  // console.log()

  const fun=()=>{
    if(!boo)return;
    //console.log(document.getElementById("msr"+id))
    sample("msr"+id)
  }

    return (
        <div id={"msr"+id} style={{backgroundColor:data.color,padding:12,margin:10,height:220,borderRadius:5}}>
            <div className={boo?"":"none"} style={{padding:3,backgroundColor:"#886bb4",textAlign:"center",height:30,borderRadius:5,color:"white",width:120}}>{data.bucket}</div>
            <div  className="mt-3" style={{overflowY:"auto",height:120}}>
            {data.body}
            </div>
            <div className='d-flex justify-content-between'>
            <p style={{fontWeight:500}}>- {data.name}</p>
            <div onClick={fun()}>
            <Button color="link" onClick={()=> delet(data.id)}>
                <span className="fa fa-trash fa-sm"></span>
            </Button>
            <Button color="link" onClick={()=>updat(data.id)}>
                <span className="fa fa-pencil fa-sm"></span>
            </Button>
            </div>
            </div>
            {/* <Button color="link" >
                <span className="fa fa-trash fa-sm"></span>
            </Button>
            <Button color="link">
                <span className="fa fa-pencil fa-sm"></span>
            </Button> */}
        </div>
    )
}
