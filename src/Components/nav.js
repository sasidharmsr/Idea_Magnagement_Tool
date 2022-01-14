import React from 'react'
import styled from 'styled-components'

//----------------CSS------------------------>>>//
const Button=styled.button`
    background-color: black;
    color: white;
    width: 135px;
    border-radius: 5px;
    border-width: 0px;
    margin-left: 15px;
    height:40px;
`
const Select=styled.select`
    border-width: 0;
    color: gray;
    font-size: 28px;
    font-weight: 500;
`



export const Nav = ({buck,grp,yoa,toggleez}) => {
    const handleZoomIn=()=>{
        document.body.style.zoom = `${parseInt(document.body.style.zoom) + 10}%`;
    }

    const handleZoomOut=()=>{
        document.body.style.zoom = `${parseInt(document.body.style.zoom) - 10}%`;
    }

    return (
        <div className='container'>
            <div className='row d-flex p-3 mt-3'>
            <div className='d-flex col-12 col-lg-4 align-items-lg-center justify-content-center justify-content-lg-start'>
                <h1 style={{fontSize:24,fontWeight:"bold"}}>Messaging /</h1>
                <Select style={{fontSize:24}}>
                    <option>Affinity Map</option>
                </Select>
            </div>
            <div className='d-flex col-12 mt-3 col-lg-4 align-items-lg-center justify-content-center justify-content-lg-center'>
                <h1 style={{fontSize:30}}>IDEA MANAGEMENT TOOL</h1>
            </div>
            <div className='d-flex col-12 col-lg-4 mt-3 mt-lg-1 justify-content-between justify-content-lg-end'>
                <Button style={{marginLeft:"-20px"}} onClick={()=>grp()}>Group Highlights</Button>
                <Button onClick={()=>yoa()}>Dot Voting</Button>
            </div>
        
            <div className='row d-flex p-3 mt-3 align-items-lg-center justify-content-lg-between'>
            <div className='d-flex col-6  align-items-center  justify-content-start'>
                <h1 style={{fontSize:20,fontWeight:"bold"}}>Filter by :</h1>
                <Button style={{width:70}} title='Filter Based On Names'>Select</Button>
            </div>
            <div className='d-flex col-6 justify-content-end'>
            <Button  style={{width:50}} onClick={()=>buck()}>
            <i className="far fa-sticky-note"></i></Button>
            <Button  style={{width:50}} color="link" className="zoomin" onClick={()=>handleZoomIn()}>
                <span className="fa fa-search-plus fa-lg"></span>
            </Button>
            <Button  style={{width:50}} color="link" className="zoomout" onClick={()=>handleZoomOut()}>
                <span className="fa fa-search-minus fa-lg"></span>
            </Button>
            <Button  style={{width:50}} onClick={()=>toggleez()}>
            <i class="far fa-object-ungroup"></i></Button>
            </div>
            </div>
        {/* <div className='row'>
            <div className='col-12'>
                <div className='d-flex  align-items-center'>
                <h1 style={{fontSize:18,fontWeight:"bold"}}>Filter by:</h1>
                <Button>Select</Button>
                </div>
            </div>
        </div> */}
        </div>
        </div>
    )
}
