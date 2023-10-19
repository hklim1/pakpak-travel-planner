import Container from 'react-bootstrap/esm/Container'

interface BodyProps {
    children: JSX.Element[] | JSX.Element
}

export default function Body({ children}: BodyProps) {
  return (
    <Container>
        <div className = 'child-container'>
            {children}
        </div>
    </Container>
  )
}
