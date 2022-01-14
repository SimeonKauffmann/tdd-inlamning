import type { EventType } from "../types"
import React from "react"
import { events } from "../mockdata"
import moment from "moment"

interface Props {
  event: EventType
  today: number
  userId: string
  onClick: (value: string) => void
}
export default function EventCard(props: Props) {
  const handleOnClick = React.useCallback(() => {
    props.onClick(props.event.id)
  }, [props])
  const isAttending = !!props.event.attending.find(
    (attending) => attending === props.userId
  )
    ? true
    : false

  const [joined, setJoined] = React.useState(isAttending)

  const cardStyles = {
    border: "solid black 2px",
    backgroundColor: "skyblue",
    margin: "3px",
    padding: "2px",
    opacity: props.today > props.event.date ? "50%" : "100%",
    width: "70vw",
  }
  const buttonStyles = {
    backgroundColor: joined ? "green" : "lightgreen",
  }

  function onJoinEvent() {
    const eventIndex = events.findIndex((event) => event.id === props.event.id)

    if (!joined) {
      events[eventIndex].attending.push(props.userId)
    } else {
      const attendingIndex = events[eventIndex].attending.findIndex(
        (attending) => attending === props.userId
      )
      events[eventIndex].attending.splice(attendingIndex, 1)
    }

    setJoined(!joined)
    return undefined
  }

  function isDisabled() {
    if (props.today > props.event.date) return true

    if (props.event.limit && props.event.attending.length >= props.event.limit)
      return true

    return false
  }

  const buttonValue = joined ? "Joined" : "Join"

  return (
    <div className="event" style={cardStyles}>
      Event: {props.event.title}
      <br />
      Date: {moment(props.event.date, "YYYYMMDD").format("Do MMM")}
      <br />
      Start time: {props.event.start}
      <br />
      End time: {props.event.end}
      <br />
      Location: {props.event.online ? "online" : props.event.location}
      <input
        type="button"
        value={buttonValue}
        style={buttonStyles}
        data-testid={props.event.id}
        onClick={onJoinEvent}
        disabled={isDisabled()}
      />
      <input type="button" value={"Open Event"} onClick={handleOnClick} />
    </div>
  )
}
