import { useLoaderData, json } from 'react-router-dom';
import EventsList from '../../components/EventsList';

function EventsPage() {
    const events = useLoaderData();
    return (<EventsList events={events} />);
}

export default EventsPage;

export async function loader(){
    const response = await fetch('http://localhost:8080/events');
    
    if (!response.ok) {
      // throw new Error({ message: 'Could not fetch events.' });
      // throw new Response(JSON.stringify({ messsage: "could not fetch events." }), { status: 500 });
      return json({ messsage: "could not fetch events." }, { status: 500 })
    } else {
      const resData = await response.json();
      return resData.events;
    }
}