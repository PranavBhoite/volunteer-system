import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";

const Events = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();


    const fetchEvents = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('http://localhost:5000/api/events');
          console.log("Fetched events:", response.data);
          setEvents(response.data); // make sure this is an array
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setIsLoading(false);
        }
      };
    
    useEffect(() => {
        fetchEvents();
    }, [])

    return <>
        <div>
            <h1>Upcoming Events</h1>
            <Button onClick={() => {navigate('/eventform')}}>Add New Event</Button>
            {events.length > 0 ? <div>
                {events.map(event => (
                    <Card>
                        <Card.Title>{event.title}</Card.Title>
                    </Card>
                ))}
            </div> :
            <div>
                <h1>There are no events</h1>
            </div>
            }
        </div>
    </>
}

export default Events;