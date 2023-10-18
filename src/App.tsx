// import { useState } from 'react'
// import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Heading from "./components/Heading";
import Container from 'react-bootstrap/esm/Container'; 
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PlanningPage from "./pages/PlanningPage";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";

function App(): JSX.Element {

  return (
    <Container style={{ maxWidth: '100%', padding: 0}}>
      <Heading />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/register' element={<FormPage><RegisterForm /></FormPage>}/>
          <Route path='/login' element={<FormPage><LoginForm /></FormPage>}/>
          <Route path='/plan' element={<PlanningPage />}/>
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
