import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"
const Scenario = (props) => (
  <tr>
    <td>{props.scenario.title}</td>
    <td>{props.scenario.description}</td>
    <td>{props.scenario.status}</td>
    <td>{props.scenario.acceptanceCriteria}</td>
    <td>{props.scenario.teamName}</td>
    <td>
      <Link className="btn btn-link" to={`/view/${props.scenario._id}`}>View</Link> |
      <Link className="btn btn-link" to={`/edit/${props.scenario._id}`}>Edit</Link>
      {/* <button
        className="btn btn-link"
        onClick={() => {
          props.deleteScenario(props.scenario._id)
        }}
      >
        Delete
      </button> */}
    </td>
    <td>
      <Link className="btn btn-link" to={`/updateus/${props.scenario._id}`}>User Story</Link> |
      <Link className="btn btn-link" to={`/updatefeature/${props.scenario._id}`}>Feature</Link> |
      <Link className="btn btn-link" to={`/updatebug/${props.scenario._id}`}>Bug</Link> |
      <Link className="btn btn-link" to={`/updatecr/${props.scenario._id}`}>Change Request</Link>
    </td>
  </tr>
)

export default function ScenarioList() {
  const [scenarios, setScenarios] = useState([])
  //const [userId, setUserId] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser ? currentUser.uid : "No user logged in"

  // console.log(`Here is userId: ${userId}`)
  // This method fetches the scenarios from the database.
  useEffect(() => {
    async function getScenarios() {
      const response = await axios.get(`http://localhost:3000/scenarios/${userId}`)
      // console.log(response.data)
      if (!response.status == 200) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      setScenarios(response.data)
    }
    getScenarios()
  }, [scenarios.length])

  // This method will delete a scenario
  async function deleteScenario(id) {
    await fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE"
    })

    const newScenarios = scenarios.filter((el) => el._id !== id)
    setScenarios(newScenarios)
  }

  // This method will map out the scenarios on the table
  function scenarioList() {
    const components = scenarios.map((scenario) => {
      return (
        <Scenario
          scenario={scenario}
          deleteScenario={() => deleteScenario(scenario._id)}
          key={scenario._id}
        />
      )
    })
    return components.reverse();
  }

  // This following section will display the table with the scenarios.
  return (
    <div className="content-container scenariolist">
      <h3>Scenario List</h3>
      <div className="list">
        <table className="table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th width="10%">Title</th>
              <th width="25%">Description</th>
              <th width="5%">Status</th>
              <th width="15%">Acceptance Criteria</th>
              <th width="10%">Team Name</th>
              <th width="10%" className="actions">Action</th>
              <th width="25%" className="actions">Create</th>
            </tr>
          </thead>
          <tbody>{scenarioList()}</tbody>
        </table>
      </div>
    </div>
  )
}
