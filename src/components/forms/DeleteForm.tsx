import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from './UserForm';
import { deleteUser } from '../../firebaseUtils';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export default function DeleteForm() {
  const navigate = useNavigate()

  const usernameField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)

  async function handleDeleteData(e:FormEvent<HTMLElement>){
    e.preventDefault()
    console.log('IN DELETE FUNC')
    const res = await fetch('http://127.0.0.1:5000/user',{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')!}`
      },
      body:JSON.stringify({
        username: usernameField.current!.value,
        password: passwordField.current!.value
      })
    })
    if(res.ok){
      console.log('good response')
      const data = await res.json()
      console.log(data)
      deleteUser()
      navigate('/logout')
    } else window.alert('Delete Failed')
    console.log('bad response')
  }

  return (
    <>
    <div className="delete-acc-form">
    <h2>Delete Account</h2>
    <Form className="py-4 px-4" onSubmit={handleDeleteData}>
        <Form.Group className="mb-3" controlId="formGridUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Enter Username"
          style={{ maxWidth: "450px" }}
          ref={usernameField}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Enter password"
          style={{ maxWidth: "450px" }}
          ref={passwordField}
          required
          type="password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="my-3">
        Submit
      </Button>
    </Form>
    </div>
    </>   
  )
}