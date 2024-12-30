import { Row, Col, Container,Form,Button,Table } from "react-bootstrap"; 
import img2 from "./assets/img2.png"; 
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState,useEffect } from "react";

const getLocalData = () => {
    return JSON.parse(localStorage.getItem("Employees")) || []
}
   

export default function patient() { 
  const intialState = {
    id: "",
    fullname: "",
    email: "",
    contactno: "",
    DOB: "",
    gender: "",
    department: "",
    bloodgroup: "",
    address: "",
    insurancename:"",
    insuranceID:"",
    holderfname:"",
    holderlname:"",
    holderDOB:""
}

const [inputForm, setInputForm] = useState(intialState);
const [isEdit, setIsEdit] = useState(false);
const [storage, setStorage] = useState(getLocalData());


const handelChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
        ...inputForm,
        [name]: value
    })
}
const handelSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
        let updateData = storage.map((emp) => {
            if (emp.id == inputForm.id) {
                return inputForm
            } else {
                return emp;
            }
        });
        setStorage(updateData);
        setIsEdit(false);
    } else {
        let id = Math.floor(Math.random() * 10000)
        setStorage([...storage, { ...inputForm, id }])
    }
    setInputForm(intialState)
}
const handelDelete = (id) => {
    let updateData = storage.filter((emp) => emp.id != id)
    setStorage(updateData)
}
const handelEdit = (id) => {
    let employee = storage.find((emp) => emp.id == id)
    setInputForm(employee)
    setIsEdit(true);
}
useEffect(() => {
    localStorage.setItem("Employees", JSON.stringify(storage));
}, [storage]); 
  return ( 
    <Container>
      <div className="border rounded mt-5 p-5" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <div className="d-flex align-items-center justify-content-between"> 
        <div>
          <h2 className="text-center fw-1 mb-4 text-info"  style={{fontSize:'45px'}}>HOSPITAL ADMISSON FORM</h2> 
          <p className="fw-semibold text-secondary ">Welcome to  [SDA Diamond Hospital LTD.].Introduction  Did you know that 92% of people believe that end-of-life care is essential, but sadly only 32% actually take the measures pertaining to the same?  Being able to improve the quality of life of a patient who suffers from….</p>
        </div> 
        <div>
          <img src={img2} alt="img" style={{ width: "450px" }} /> 
        </div>
          </div> 
      <Row>
          <Col className="">
              <Form onSubmit={handelSubmit}>
                  <h3 className="fw-semibold my-5">Personal Details :-</h3>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          FullName:
                      </Form.Label>
                      <Col>
                          <Form.Control type="text" name="fullname" value={inputForm.fullname} onChange={handelChanged} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Email:
                      </Form.Label>
                      <Col sm="4">
                          <Form.Control type="email" name="email" value={inputForm.email} onChange={handelChanged} />
                      </Col>
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          ContactNo:
                      </Form.Label>
                      <Col sm="4">
                          <Form.Control type="number" name="contactno" value={inputForm.contactno} onChange={handelChanged} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          DOB:
                      </Form.Label>
                      <Col sm="4">
                          <Form.Control type="date" name="DOB" value={inputForm.DOB} onChange={handelChanged} />
                      </Col>
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Gender:
                      </Form.Label>
                      <Col sm="1">
                          <Form.Check type="radio" label={"Male"} name="gender" value={"Male"} onChange={handelChanged} />
                      </Col>
                      <Col sm="1">
                          <Form.Check type="radio" label={"Female"} name="gender" value={"Female"} onChange={handelChanged} />
                      </Col>
                      <Col sm="1">
                          <Form.Check type="radio" label={"Other"} name="gender" value={"Other"} onChange={handelChanged} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Department:
                      </Form.Label>
                      <Col sm="4">
                          <Form.Select aria-label="Default select example" name="department" onChange={handelChanged}>
                              <option>Select Department</option>
                              <option value="Cardiology">Cardiology</option>
                              <option value="Neurology">Neurology</option>
                              <option value="Orthopedics">Orthopedics</option>
                              <option value="ENT (Otorhinolaryngology)">ENT (Otorhinolaryngology)</option>
                              <option value="Hematology">Hematology</option>
                              <option value="Gastroenterology">Gastroenterology</option>
                              <option value="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</option>
                          </Form.Select>
                      </Col>
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          BloodGroup:
                      </Form.Label>
                      <Col sm="4">
                      <Form.Select aria-label="Default select example" name="bloodgroup" onChange={handelChanged}>
                              <option>Select Bloodgroup</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                          </Form.Select>
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Address:
                      </Form.Label>
                      <Col sm="10">
                          <Form.Control type="text" name="address" value={inputForm.address} onChange={handelChanged} />
                      </Col>
                  </Form.Group>
                  <h3 className="fw-semibold my-5">Insurance Information :-</h3>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Insurance Company:<br/>
                      </Form.Label>
                      <Col sm="4">
                          <Form.Control type="text" name="insurancename" value={inputForm.insurancename} onChange={handelChanged} />
                      </Col>
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Insurance ID:
                      </Form.Label>
                      <Col sm="4">
                          <Form.Control type="number" name="insuranceID" value={inputForm.insuranceID} onChange={handelChanged} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Policy Holder's Name:<br/>
                      </Form.Label>
                      <Col sm="2">
                          <Form.Control type="text" name="holderfname" value={inputForm.holderfname} onChange={handelChanged} />
                          <p>First Name</p>
                      </Col>
                      <Col sm="2">
                          <Form.Control type="text" name="holderlname" value={inputForm.holderlname} onChange={handelChanged} />
                          <p>Last Name</p>
                      </Col>
                      <Form.Label column sm="2" className="fw-semibold" style={{fontSize:"19px"}}>
                          Policy Holder's DOB:
                      </Form.Label>
                      <Col sm="4">
                          <Form.Control type="date" name="holderDOB" value={inputForm.holderDOB} onChange={handelChanged} />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" >
                      <Form.Label column sm="5">
                      </Form.Label>
                      <Col sm="5">
                          
                          <Button className="button-56 my-5 fs-4 text-black fw-semibold" role="button" type="submit">{isEdit ? "Update" : "Add"} Submit</Button>
                      </Col>
                  </Form.Group>
                  
              </Form>
          </Col>
      </Row>
      <Row>
          <Col>
              <h2 className="text-center fw-bold my-4">View Patient</h2>
              <Table striped bordered hover variant="light">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Full Name</th>
                          <th>Gender</th>
                          <th>Email</th>
                          <th>ContactNo</th>
                          <th>BloodGroup</th>
                          <th>Insurance Company</th>
                          <th>Insurance ID</th>
                          <th>Insurance Holder</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          storage.map((emp) => (
                            <tr>
                                <td>{emp.id}</td>
                                <td>{emp.fullname}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.email}</td>
                                <td>{emp.contactno}</td>
                                <td>{emp.bloodgroup}</td>
                                <td>{emp.insurancename}</td>
                                <td>{emp.insuranceID}</td>
                                <td>{emp.holderfname} {emp.holderlname}</td>
                                <td>
                                    <Button onClick={() => handelEdit(emp.id)}
                                        variant="success">
                                        <FaEdit />
                                    </Button>&emsp;||&emsp;
                                    <Button onClick={() => handelDelete(emp.id)} variant="danger">
                                            <FaTrashAlt />
                                    </Button>
                                </td>
                            </tr>
                          ))
                      }
                  </tbody>
              </Table>
          </Col>
      </Row>
        
      </div> 
    </Container> 
  ); 
}