import type { EventType } from "../types"
import React from "react"
import moment from "moment"
import { v4 as uuid } from "uuid"

interface Props {
  userId: string
  onNewEvent: (value: EventType[]) => void
  events: EventType[]
}

export default function CreateEvent(props: Props) {
  const [visible, setVisible] = React.useState(false)
  const styles = {
    display: visible ? "unset" : "none",
  }

  function toggleCreateForm() {
    setVisible(!visible)
  }

  const handleAddEvent = React.useCallback(
    (newEvents) => {
      props.onNewEvent(newEvents)
    },
    [props]
  )

  function createEvent(e: any) {
    const title: string = e.target.elements.title.value
    const date = Number(moment(e.target.elements.date.value).format("YYYYMMDD"))
    const start: string = e.target.elements.start.value
    const end: string = e.target.elements.end.value
    const organiser = props.userId
    const location: string = e.target.elements.location.value
    const online: boolean = e.target.elements.online.checked

    const newEvent: EventType = {
      id: uuid(),
      title,
      date,
      start,
      end,
      organiser,
      attending: [],
      rating: 0,
      online,
      location: location,
      comments: [],
    }

    if (e.target.elements.limit.value) {
      newEvent.limit = e.target.elements.limit.value
    }

    e.preventDefault()
    handleAddEvent([...props.events, newEvent])
    toggleCreateForm()
  }

  return (
    <div>
      <input
        type="button"
        id="createButton"
        value="Create Event"
        onClick={toggleCreateForm}
      />
      <div id="createForm" style={styles}>
        <form onSubmit={createEvent}>
          <label htmlFor="Title">
            Title:
            <input type="text" name="title" />
          </label>
          <br />
          <label htmlFor="date">
            Date:
            <input type="date" name="date" />
          </label>
          <br />
          <label htmlFor="start">
            Start Time:
            <input type="time" name="start" />
          </label>
          <br />
          <label htmlFor="end">
            End Time:
            <input type="time" name="end" />
          </label>
          <br />
          <label htmlFor="online">
            Online:
            <input type="checkbox" name="online" />
          </label>
          <br />
          <label htmlFor="location">
            Location:
            <input type="text" name="location" />
          </label>
          <label htmlFor="limit">
            Limit:
            <input type="number" name="limit" />
          </label>

          <br />
          <input type="button" value="Cancel" onClick={toggleCreateForm} />
          <br />
          <input type="submit" value="Create Event" />
        </form>
      </div>
    </div>
  )
}
