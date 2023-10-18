import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useRef, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types'

export default function LoginForm() {
  const navigate = useNavigate()

  const usernameField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [])
  
  function handleLoginData(e:FormEvent<HTMLElement>){
    e.preventDefault() //this prevents refresh
    const loginInfo: Partial<User> = { //using Partial bc User mandates username/email, but here we areo nly reuqiring one or theo hter
      password: passwordField.current!.value
    }
    if(usernameField.current?.value){
      loginInfo.username = usernameField.current.value
    } else if(emailField.current?.value) {
      loginInfo.email = emailField.current.value
    } else {
      window.alert('Please include Username or Email')
      return
    }
    clearFormData()
    loginUser(loginInfo)
    navigate('/')
  }

  
  async function loginUser(loginInfo: Partial<User>){ //loginInfo here does NOT have to match loginInfo above. We just do it cuz it looks better
    const res = await fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify(loginInfo)
  })
    if(res.ok){
      const data = await res.json()
      const accessToken = data.access_token
      localStorage.setItem('token', accessToken)
      navigate('/')
    } else window.alert('Failed Login')
  }

  function clearFormData(){
    usernameField.current!.value = '',
    passwordField.current!.value = '',
    emailField.current!.value = ''
  }

  return (  
    <Form className="py-4 px-4" onSubmit={handleLoginData}>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" style={{ maxWidth:'450px'}} ref={usernameField} required/>
            </Form.Group>
        </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter Email Address" style={{ maxWidth:'450px'}} ref={emailField} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter password" style={{ maxWidth:'450px'}} ref={passwordField} required/>
      </Form.Group>

      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
  )
}
