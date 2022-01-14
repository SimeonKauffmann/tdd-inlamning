import { EventType } from "./types"
import moment from "moment"

const events: Array<EventType> = [
  {
    id: "66ed22217e81",
    date: Number(moment().add(1, "days").format("YYYYMMDD")),
    start: "12:30",
    end: "14:30",
    organiser: "77f322217e81",
    attending: ["77f322217e82", "77f322217e83", "77f322217e84"],
    rating: 0,
    comments: [],
    limit: 5,
    location: "Krokslätt",
    online: false,
    title: "Lunch meeting",
  },
  {
    id: "66ed22217e82",
    date: Number(moment().add(3, "days").format("YYYYMMDD")),
    start: "18:00",
    end: "19:00",
    organiser: "77f322217e83",
    attending: ["77f322217e81", "77f322217e82"],
    rating: 0,
    comments: [],
    online: true,
    title: "After work",
  },
  {
    id: "66ed22217e83",
    date: Number(moment().subtract(1, "days").format("YYYYMMDD")),
    start: "09:00",
    end: "13:00",
    organiser: "77f322217e84",
    attending: ["77f322217e83"],
    rating: 0,
    comments: ["a comment", "i wanna comment too"],
    online: false,
    location: "The Office",
    title: "Monday morning yoga drop in",
  },
]

const users = [
  {
    id: "77f322217e81",
    name: "Karl Tobiasson",
    ratings: [
      { event: "66ed22217e83", rating: 3 },
      { event: "66ed22217e81", rating: 4 },
    ],
  },
  {
    id: "77f322217e82",
    name: "Ali Svensson",
    ratings: [
      { event: "66ed22217e83", rating: 2 },
      { event: "66ed22217e81", rating: 2 },
    ],
  },
  {
    id: "77f322217e83",
    name: "John Smith",
    ratings: [{ event: "66ed22217e83", rating: 5 }],
  },
  {
    id: "77f322217e84",
    name: "Fatima Smith",
    ratings: [
      { event: "66ed22217e83", rating: 5 },
      { event: "66ed22217e82", rating: 5 },
    ],
  },
]

export { users, events }
