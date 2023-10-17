// import { useState } from 'react'
// import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Heading from "./components/Heading";
import Container from 'react-bootstrap/esm/Container'; 
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PlanningPage from "./pages/PlanningPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

function App(): JSX.Element {

  return (
    <Container style={{ maxWidth: '100%', padding: 0}}>
      <Heading />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/plan' element={<PlanningPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
