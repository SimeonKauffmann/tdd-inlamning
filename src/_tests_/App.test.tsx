import { render as TLRender, fireEvent, screen } from "@testing-library/react"
import { render, shallow } from "enzyme"

import App from "../App"
import EventCard from "../components/EventCard"
import React from "react"
import { events } from "../mockdata"
import moment from "moment"

it("smoke test", () => {
  TLRender(<App />)
})

describe("As a user I want to be able to see events because I want to get information about them.", () => {
  it("shows events from the mockdata", () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(EventCard)).toHaveLength(3)
  })
  it("displays each events title, date and time", () => {
    const wrapper = render(<App />)
    expect(wrapper.find(".event").first().text()).toContain("After work")
    expect(wrapper.find(".event").first().text()).toContain("18:00")
  })
})

describe("As a user I want to be able to register for other peoples events because I want to make sure I get a place at the event.", () => {
  it("has a button to join event", () => {
    TLRender(<App />)
    const button = screen.getByTestId("66ed22217e82")
    const attendingEvent = events[0].attending.length
    fireEvent.click(button)
    expect(events[0].attending.length).toBe(attendingEvent + 1)
  })
  it("can unjoin an event by clicking the same button", () => {
    TLRender(<App />)
    const button = screen.getByTestId("66ed22217e81")
    const attendingEvent = events[1].attending.length
    fireEvent.click(button)
    expect(events[1].attending.length).toBe(attendingEvent - 1)
  })
  it("cannot join/unjoin past events", () => {
    TLRender(<App />)
    const button = screen.getByTestId("66ed22217e83")
    expect(button).toBeDisabled()
  })
})

describe("As a user I want to see upcoming events in order of coming soonest because they are most relevant to me.", () => {
  it("is in order of date", () => {
    const wrapper = render(<App />)
    const events = wrapper.find(".event")

    expect(events.first().text()).toContain("After work")
    expect(events.last().text()).toContain("morning yoga")
  })
})

describe("As a user I want to be able to show that my event is online or on-site because I want the people to be know.", () => {
  it("shows if an event is online or on-site", () => {
    const wrapper = render(<App />)
    const events = wrapper.find(".event")

    expect(events.first().text()).toContain("online")
    expect(events.last().text()).toContain("The Office")
  })
})

describe("As a user I want to be able to see past events because I want to remember which events I have been to.", () => {
  it("shows past events", () => {
    const wrapper = render(<App />)
    const event = wrapper.find(".event").last().text()

    const index = event.indexOf("Date")
    const date = event.slice(index + 6, index + 14)

    expect(moment(date, "Do MMM").fromNow()).toContain("2 days ago")
  })
})
