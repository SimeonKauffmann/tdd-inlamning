import { mount, shallow } from "enzyme"

import App from "../App"
import CreateEvent from "../components/CreateEvent"
import React from "react"
import moment from "moment"

const userId = "77f322217e83"

describe("As a user I want to be able to create my own events because I want to be able to organise my events", () => {
  it("has a button to open a form for creating an event", () => {
    const wrapper = shallow(<CreateEvent userId={userId} />)

    const button = wrapper.find("#createButton")
    const formBefore = wrapper.find("#createForm")

    expect(button).toHaveLength(1)
    expect(formBefore.getElement().props.style).toHaveProperty(
      "display",
      "none"
    )

    button.simulate("click")
    const formAfter = wrapper.find("#createForm")

    expect(formAfter.getElement().props.style).toHaveProperty(
      "display",
      "unset"
    )
  })
  it("has input elements for event title, start and end times,  and a submit button", () => {
    const wrapper = shallow(<CreateEvent userId={userId} />)
    const inputs = wrapper.find("input")
    const button = wrapper.find("input[type='submit']")
    expect(inputs).toHaveLength(10)
    expect(button).toBeTruthy()
  })
  it("creates an event on submit", () => {
    const app = mount(<App />)
    const eventsLength = app.find(".event").length
    const form = app.find("form")

    const dateInput = app.find('input[type="date"]')

    dateInput.simulate("change", {
      target: { name: "date", value: moment().format("YYYY-MM-DD") },
    })

    form.simulate("submit")

    expect(app.find(".event").length).toBe(eventsLength + 1)
  })
})

describe("As a user I want to be able to limit the number of people who can attend the event because I dont want more people to come than I can accomodate.", () => {
  it("has functionality to limit number of people attending", () => {
    const app = mount(<App />)
    const form = app.find("form")
    const dateInput = app.find('input[type="date"]')
    const limitInput = app.find('input[name="limit"]')

    dateInput.simulate("change", {
      target: { name: "date", value: "2023-02-02" },
    })

    limitInput.simulate("change", {
      target: { name: "limit", value: 0 },
    })

    form.simulate("submit")

    const testEvent = app.find(".event").first()

    const joinButton = testEvent.find('input[value="Join"]')

    expect(joinButton.is("[disabled]")).toBe(true)
  })
})
