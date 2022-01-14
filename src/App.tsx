import { events as EventsDB, users } from "./mockdata"

import CreateEvent from "./components/CreateEvent"
import EventCard from "./components/EventCard"
import { EventType } from "./types"
import Modal from "./components/Modal"
import React from "react"
import moment from "moment"

function App() {
  const userId = "77f322217e83"
  const todayDate = Number(moment().format("YYYYMMDD"))

  const [selectedEvent, setSelectedEvent] = React.useState("")
  const [events, setEvents] = React.useState<EventType[]>(EventsDB)

  events.sort((event1, event2) => event2.date - event1.date)

  return (
    <>
      <h3>Welcome back {users.find((user) => user.id === userId)?.name}!</h3>
      {selectedEvent === "" ? (
        <div>
          <CreateEvent userId={userId} onNewEvent={setEvents} events={events} />
          <div>
            {events &&
              events.map((event) => (
                <EventCard
                  event={event}
                  userId={userId}
                  today={todayDate}
                  key={event.id}
                  onClick={setSelectedEvent}
                ></EventCard>
              ))}
          </div>
        </div>
      ) : (
        <Modal
          onClose={setSelectedEvent}
          onComment={setEvents}
          event={events.find((event) => event.id === selectedEvent)}
          events={events}
          user={users.find((user) => user.id === userId)}
        />
      )}
    </>
  )
}

export default App
