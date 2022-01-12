import React, { useEffect, useState } from 'react'
import { Form, FormGroup,ModalHeader, ModalBody,Label,Modal, Input, Col, Button} from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';

export const Mainmodal = ({is_open,is_toggle,Allbuckets,create_bucket,edit_bucket}) => {

    const [formdata,setformdata]=useState({name:'',body:'',bucket:'',color:'#4df0b4'})
    const [newbucket,setnewbucket]=useState(Allbuckets?.length===0?true:false);

    useEffect(()=>{
        if(Allbuckets?.length>0)
        {
            setnewbucket(false)
        }
    },[Allbuckets?.length>0])
    const handlechange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
    }

        if(edit_bucket.id!=='' && formdata.name==='' && formdata.body==='' && formdata.bucket===''){
        setformdata({name:edit_bucket.data.name,body:edit_bucket.data.body,bucket:edit_bucket.data.bucket,color:edit_bucket.data.color})
        }


    const flip=()=>{
        if(newbucket)setnewbucket(false);
        else setnewbucket(true);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        for(let i of Allbuckets)
        {
            if(i.data[0].bucket===formdata.bucket)
            {
                create_bucket(formdata,i.id,uuidv4());
                is_toggle();
                setformdata({name:'',body:'',bucket:'',color:'#4df0b4'})
                return;
            }
        }
        create_bucket(formdata,uuidv4(),uuidv4());
        is_toggle();
        setformdata({name:'',body:'',bucket:'',color:'#4df0b4'})
    }
    return (
        <React.Fragment>
            <Modal isOpen={is_open} toggle={is_toggle}>
            <ModalHeader toggle={is_toggle}>
                Your Idea
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <FormGroup row>
                        <Label htmlFor="name" md={3}>
                        Name
                    </Label>
                    <Col md={6}>
                        <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your Name"
                        value={formdata.name}
                        onChange={(e)=>handlechange(e)}
                        />
                    </Col>
                    </FormGroup>
                {!newbucket?(
                    <FormGroup row>
                        <Label htmlFor="bucket" md={3}>
                        Select Bucket
                        </Label>
                        <Col md={6} className='d-flex align-items-center'>
                        <Input
                            type="select"
                            name="bucket"
                            id="selectedBucketId"
                            value={formdata.bucket}
                            onChange={(e)=>handlechange(e)}
                        >
                            <option value="new" hidden>Select Bucket</option>
                            {Allbuckets.map((val,index)=>{
                                return(
                                <option key={index}>{val.data[0].bucket}</option>
                                )
                            })}
                        </Input>
                        <span style={{cursor:"pointer"}} onClick={()=>flip()}>
                        <i className="far fa-plus-square" style={{fontSize:25,marginLeft:15}}></i></span>
                        </Col>
                    </FormGroup>):(
                  <FormGroup row className='d-flex'>
                  <Label md={3} htmlFor='bucket'>
                   Bucket Name
                    </Label>
                      <Col md={6} className='d-flex align-items-center' >
                    <Input
                      type="text"
                      name="bucket"
                      value={formdata.bucket}
                      style={{marginLeft:"auto",marginRight:"auto"}}
                      placeholder="Enter Bucket Name"
                      onChange={(e)=>handlechange(e)}
                    />
                    <span style={{cursor:"pointer"}} onClick={()=>flip()}>
                        <i className="far fa-minus-square" style={{fontSize:25,marginLeft:15}}></i></span>
                    </Col>
                  </FormGroup>)
                }
                  <FormGroup row>
                <Label htmlFor="body" md={3}>
                  Body
                </Label>
                <Col md={6}>
                  <Input
                    type="textarea"
                    id="body"
                    name="body"
                    rows="6"
                    value={formdata.body}
                    onChange={(e)=>handlechange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="color" md={3}>
                  Page Color
                </Label>
                <Col md={2}>
                  <Input
                    style={{borderRadius:10,width:143}}
                    type="color"
                    id="color"
                    name="color"
                    value={formdata.color}
                    onChange={(e)=>handlechange(e)}
                  />
                </Col>
              </FormGroup><FormGroup row>
              <Label md={4}></Label>
              <Col md={5}>
              <Button type="submit" color="primary">
              Add Highlight
            </Button>
            </Col>  </FormGroup>
                </Form>
            </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
