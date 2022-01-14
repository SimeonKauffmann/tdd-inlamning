import type { EventType, UserType } from "../types"

import React from "react"
import moment from "moment"
import { users } from "../mockdata"
import { v4 as uuid } from "uuid"

interface Props {
  onClose: (value: string) => void
  onComment: (value: EventType[]) => void
  event?: EventType
  events: EventType[]
  user?: UserType
}

export default function Modal(props: Props) {
  const eventStyles = {
    border: "solid black 2px",
    backgroundColor: "skyblue",
    margin: "3px",
    padding: "2px",
    width: "70vw",
  }
  const commentStyles = {
    border: "solid black 2px",
    backgroundColor: "light green",
    margin: "4px",
    padding: "1px",
    width: "50vw",
  }

  const [rating, setRating] = React.useState(getRating() || 0)

  const [forceRerender, setForceRerender] = React.useState(0)

  function getRating() {
    const ratings = users
      .map(
        (user) =>
          user.ratings.find((rating) => rating.event === props.event?.id)
            ?.rating
      )
      .filter((value) => value !== undefined)

    let ratingSum
    if (ratings.length > 1) {
      ratingSum = ratings.reduce((a, b) => {
        if (a && b) return a + b
      })
      if (ratingSum) {
        ratingSum = ratingSum / ratings.length
      }
    } else {
      ratingSum = ratings[0]
    }

    return ratingSum
  }

  function handleRatingChange(e: any) {
    setRating(parseInt(e.target.value))
  }

  function handleRating() {
    const index = props.user ? users.indexOf(props.user) : 0

    if (props.event)
      users[index].ratings.push({ event: props.event?.id, rating })

    setRating(getRating() || 0)
    setForceRerender(forceRerender + 1)
  }

  const handleOnClose = React.useCallback(() => {
    props.onClose("")
  }, [props])

  const handleCommentCallback = React.useCallback(
    (events) => {
      props.onComment(events)
    },
    [props]
  )

  const handleComment = function (e: any) {
    const comment: string = e.target.elements.text.value

    const index = props.event ? props.events.indexOf(props.event) : 0

    props.events[index].comments.push(comment)

    handleCommentCallback(props.events)
    setForceRerender(forceRerender + 1)
    e.preventDefault()
  }

  return (
    <div>
      <button onClick={handleOnClose}>Close</button>
      {props.user?.ratings.find(
        (rating) => rating.event === props.event?.id
      ) ? (
        ""
      ) : (
        <span>
          <input
            type="number"
            min="0"
            max="5"
            onChange={handleRatingChange}
            data-testid="number"
          />
          <input
            type="button"
            onClick={handleRating}
            value="rate!"
            data-testid="button"
          />
        </span>
      )}
      <span id="rating" data-testid="rating">
        Rating:
        {rating}
      </span>
      <div style={eventStyles}>
        Event: {props.event?.title}
        <br />
        Date: {moment(props.event?.date, "YYYYMMDD").format("Do MMM")}
        <br />
        Start time: {props.event?.start}
        <br />
        End time: {props.event?.end}
        <br />
        Location: {props.event?.online ? "online" : props.event?.location}
        <br />
        Organiser:
        {users.find((user) => user.id === props.event?.organiser)?.name}
        <br />
        Attending:
        {users
          .filter((user) => props.event?.attending.includes(user.id))
          .map((user) => user.name)
          .join(", ")}
      </div>
      {props.event?.comments.map((comment) => (
        <div className="comment" style={commentStyles} key={uuid()}>
          {comment}
        </div>
      ))}
      <div>
        <form onSubmit={handleComment}>
          <input name="text"></input>
          <input type="submit" value="Comment" />
        </form>
      </div>
    </div>
  )
}
