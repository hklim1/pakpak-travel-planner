import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useRef, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types'

export default function RegisterForm() {
  const navigate = useNavigate()

  const usernameField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const fNameField = useRef<HTMLInputElement>(null)
  const lNameField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [])
  
  async function handleRegisterData(e: FormEvent<HTMLElement>){ //we have a generic formevent and passing in an htmlelement
    e.preventDefault()
    // we're gonna take the data and send it to our application
    const user: User = {
      username: usernameField.current!.value,
      password: passwordField.current!.value,
      email: emailField.current!.value,
    }
    if (fNameField.current!.value) {
      user.first_name = fNameField.current?.value
    }
    if (lNameField.current!.value) {
      user.last_name = lNameField.current?.value
    }
    clearFormData()
    await registerUser(user)
  }

  async function registerUser(user: User){
    const res = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // mode: 'no-cors',
      body: JSON.stringify(user)
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){ 
      window.alert('Register Failed')
    } else navigate('/')
  }

  function clearFormData(){
    usernameField.current!.value = '',
    passwordField.current!.value = '',
    emailField.current!.value = '',
    fNameField.current!.value = '',
    lNameField.current!.value = ''
  }

  // function test(){
  //   console.log('=================HELLO=====================')
  // }

  return (
    <Form className="py-4 px-4" onSubmit={handleRegisterData}>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username*</Form.Label>
                <Form.Control type="username" placeholder="Username" ref={usernameField} required/>
            </Form.Group>
        </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="first-name" placeholder="First Name" ref={fNameField}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="last-name" placeholder="Last Name" ref={lNameField}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control placeholder="Enter Email Address" ref={emailField} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control placeholder="Enter password" style={{ maxWidth:'615px'}} ref={passwordField} required/>
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
  );
}