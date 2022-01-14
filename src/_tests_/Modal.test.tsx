import { events, users } from "../mockdata"
import { mount, shallow } from "enzyme"

import Modal from "../components/Modal"

const handleComment = function (string: string, event: any) {
  const comment = string

  const index = events.indexOf(event)

  events[index].comments.push(comment)

  return events
}

describe("As a user I want to be able to comment on events because I want to be able to discuss the event with others", () => {
  it("is clear which event the user is commenting on", () => {
    const wrapper = shallow(
      <Modal event={events.find((event) => event.id === "66ed22217e81")} />
    )
    const contents = wrapper.text()

    expect(contents).toContain("Lunch meeting")
  })

  it("has comment functionality", () => {
    const event = events.find((event) => event.id === "66ed22217e81")

    const wrapper = mount(
      <Modal event={event} events={events} onComment={() => {}} />
    )
    const form = wrapper.find("form")
    const text = wrapper.find("input[name='text']")
    const comment = "Hi guys!"

    text.simulate("change", {
      target: { name: "text", value: comment },
    })

    form.simulate("submit")

    wrapper.setProps({ events: handleComment(comment, event) })

    expect(wrapper.text()).toContain("Hi guys!")
  })
})

describe("As a user I want to be able to rate events because I want others to see if an event is good or not.", () => {
  it("has rating functionality", () => {
    const wrapper = mount(
      <Modal
        event={events.find((event) => event.id === "66ed22217e82")}
        user={users.find((user) => user.id === "77f322217e83")}
      />
    )

    const input = wrapper.find("input[type='number']")
    const button = wrapper.find("input[type='button']")
    const span = wrapper.find("span[id='rating']")

    expect(span.text()).toContain("Rating:5")

    input.simulate("change", { target: { value: 3 } })
    button.simulate("click")

    expect(span.text()).toContain("Rating:4")
  })
})
