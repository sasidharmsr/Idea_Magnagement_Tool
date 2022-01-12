import React from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components'

export const Info = ({data,delet,updat,boo}) => {

    const Note=styled.div`
    background-color: ${data.color};
    padding: 12px;
    margin: 10px;
    height:220px;
    font-size: medium;
    border-radius: 5px;
    `
    const Heading=styled.div`
    background-color:#886bb4;
    padding:3px;
    color:white;
    width:120px;
    height:30px;
    text-align:center;
    border-radius: 5px;
    display:${boo?"":"none"}
    `
    const Content=styled.div`
    overflow-y: auto;
    height: 120px;
    `

    return (
        <Note>
            <Heading>{data.bucket}</Heading>
            <Content  className="mt-3">
            {data.body}
            </Content>
            <div className='d-flex justify-content-between'>
            <p style={{fontWeight:500}}>- {data.name}</p>
            <div>
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
        </Note>
    )
}
