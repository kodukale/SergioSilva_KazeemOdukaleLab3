import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
  const [student, setStudent] = useState({ _id: '', studentNumber: '', firstName: '', lastName: '', 
                address: '', city: '', phoneNumber: '', email: '', program: '', username: '', password: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { studentNumber: student.studentNumber, firstName: student.firstName, 
        lastName: student.lastName, address: student.address, city: student.city,
        phoneNumber: student.phoneNumber, email: student.email, program: student.program,
        password: student.password};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveStudent}>
          <Form.Group>
            <Form.Label> Student Number</Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter student number" value={student.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter your address" value={student.address} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter your city" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone Number" value={student.phoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" row="3" placeholder="Enter Email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter Program" value={student.program} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);
