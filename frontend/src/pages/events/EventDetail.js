import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../../components/EventItem";
import EventsList from "../../components/EventsList";
import { loadEvents } from "./Events";
import { Suspense } from "react";

export default function EventDetail(){
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    { (loadedEvent) =>  <EventItem event={loadedEvent} /> }
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    { (loadedEvents) => <EventsList events={loadedEvents} />} 
                </Await>
            </Suspense>
        </>
    )
}

async function loadEvent(params){
    const id = params.id;
    
    const response = await fetch(`http://localhost:8080/events/${id}`);

    if(!response.ok){
        return new Response(JSON.stringify({ message: 'Could not fetch details for selected event.' }), { status: 500 });
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

export async function loader({params}){
    return {
        event: await loadEvent(params), 
        events: loadEvents(),
    }
}

export async function action({ request, params }){
    const id = params.id;

    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: request.method
    });

    if(!response.ok){
        return new Response(JSON.stringify({ message: 'Could not delete details for selected event.' }), { status: 500 });
    }
    
    return redirect('/events');
}