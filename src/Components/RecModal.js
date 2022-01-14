import React, { useEffect, useState } from 'react'
import { Form, FormGroup,ModalHeader, ModalBody,Label,Modal, Input, Col, Button} from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
const UUID = require('uuid-int');

export const Mainmod = ({is_opened,is_toggleed,Allbuckets,grpdata}) => {

    const [formdata,setformdata]=useState('')
    const [newbucket,setnewbucket]=useState(Allbuckets?.length===0?true:false);
    const id = 0;

    const generator = UUID(id);
    
    const uuid = generator.uuid();
    const flip=()=>{
        if(newbucket)setnewbucket(false);
        else setnewbucket(true);
    }
    const handlechange=(e)=>{
        setformdata(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formdata!=='')
        {
            grpdata(formdata,uuidv4());
        }
        is_toggleed();
    }
    return (
        <React.Fragment>
            <Modal isOpen={is_opened} toggle={is_toggleed}>
            <ModalHeader toggle={is_toggleed}>
                Group Your Idea
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={(e)=>handleSubmit(e)}>
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
              <Label md={4}></Label>
              <Col md={5}>
              <Button type="submit" color="primary">
              Save Bucket
            </Button>
            </Col>  </FormGroup>
                </Form>
            </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
