import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Events, { loader as eventsLoader } from './pages/events/Events';
import MainLayout from './layouts/MainLayout';
import EventDetail, { loader as eventDetailLoader, action as deleteEventAction } from './pages/events/EventDetail';
import EventNew from './pages/events/EventNew';
import EventEdit from './pages/events/EventEdit';
import EventsNavigation from './components/EventsNavigation';
import Error from './pages/Error';
import { action as manipulateEventAction } from './components/EventForm';

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const router = createBrowserRouter(
  [
    {
      path: '/', element: <MainLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomePage /> },
        { 
          path: 'events', element: <EventsNavigation />,
          children: [
            { 
              path: '', 
              element: <Events />, 
              loader: eventsLoader, 
            },
            {
              path: ':id',
              id: 'event-detail',
              loader:  eventDetailLoader,
              children: [
                { 
                  path: '',
                  index: true,
                  element: <EventDetail />,
                  action: deleteEventAction,
                },
                { 
                  path: 'edit', 
                  element: <EventEdit />,
                  action: manipulateEventAction,
                },
              ]
            },
            { 
              path: 'new', 
              element: <EventNew />,
              action: manipulateEventAction,
            },
          ],
        },
      ]
    },
  ]
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
