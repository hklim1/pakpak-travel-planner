import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllUserTrips } from '../firebaseUtils';
import { useEffect } from 'react';

export default function UpcomingTrips3() {
    // useEffect(() => {
    //     getAllUserTrips.then((userData)=>{
    //         console.log(userData)
    // })
    // }, []);

    async function getThings() {
        const myThings = await getAllUserTrips();
        return myThings
      }

    console.log(getThings())

    return(
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="warning">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  );
}