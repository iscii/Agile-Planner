import React, { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../contexts/AuthContext"
export default function Create() {
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser ? currentUser.uid : "No user logged in"	//const currentUser = useContext(UserContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    userId: userId,
    title: "",
    description: "",
    status: "",
    acceptanceCriteria: "",
    teamName: ""
  })

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault()
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newScenario = { ...form }
    await fetch("http://localhost:3000/scenario/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScenario),
    })
      .catch(error => {
        window.alert(error)
        return
      })
    setForm({
      userId: userId,
      title: "",
      description: "",
      status: "",
      acceptanceCriteria: "",
      teamName: ""
    })
    navigate("/scenarios")
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div className="content-container create">
      <h3>Create New Scenario</h3>
      <div className="create-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              value={form.status}
              onChange={(e) => updateForm({ status: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="acceptanceCriteria">Acceptance Criteria</label>
            <textarea
              className="form-control"
              id="acceptanceCriteria"
              value={form.acceptanceCriteria}
              onChange={(e) => updateForm({ acceptanceCriteria: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              value={form.teamName}
              onChange={(e) => updateForm({ teamName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Scenario"
              className="btn btn-primary mt-4"
            />
          </div>
        </form>
      </div>
    </div>
  )
}