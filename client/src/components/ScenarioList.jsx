import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Scenario = (props) => (
  <tr>
    <td>{props.scenario.title}</td>
    <td>{props.scenario.description}</td>
    <td>{props.scenario.status}</td>
    <td>{props.scenario.acceptanceCriteria}</td>
    <td>{props.scenario.teamName}</td>
    <td>
      <Link className="btn btn-link" to={`/view/${props.scenario._id}`}>View</Link> |
      <Link className="btn btn-link" to={`/edit/${props.scenario._id}`}>Edit</Link> |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteScenario(props.scenario._id)
        }}
      >
        Delete
      </button>
    </td>
  </tr>
)

export default function ScenarioList() {
  const [scenarios, setScenarios] = useState([])

  // This method fetches the scenarios from the database.
  useEffect(() => {
    async function getScenarios() {
      const response = await fetch(`http://localhost:3000/scenarios/:userId`)
      console.log(response)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }
      const scenarios = await response.json()
      // const scenarios = [ //NOTE: MOCK DATA. REMOVE WHEN USER AUTH IS SET UP
      //   {
      //     _id: "65611ac49bb01a63fe01563c",
      //     userId: '',
      //     title: 'dwad',
      //     description: 'awdaw',
      //     acceptanceCriteria: 'awdaw',
      //     teamName: '',
      //     bugs: [],
      //     changeRequests: [],
      //     features: [],
      //     userStories: []
      //   },
      //   {
      //     _id: "65611ad09bb01a63fe01563d",
      //     userId: '',
      //     title: 'ewadaw',
      //     description: 'dawd',
      //     acceptanceCriteria: 'awd',
      //     teamName: 'awd',
      //     bugs: [],
      //     changeRequests: [],
      //     features: [],
      //     userStories: []
      //   },
      //   {
      //     _id: "65611c3e9bb01a63fe01563e",
      //     userId: '',
      //     title: 'dawd',
      //     description: 'awdwa',
      //     acceptanceCriteria: 'awdaw',
      //     teamName: 'daw',
      //     bugs: [],
      //     changeRequests: [],
      //     features: [],
      //     userStories: []
      //   },
      //   {
      //     _id: "65611cdb9bb01a63fe01563f",
      //     userId: '',
      //     title: 'abc1',
      //     description: 'abc1',
      //     acceptanceCriteria: 'abc',
      //     teamName: '',
      //     bugs: [],
      //     changeRequests: [],
      //     features: [],
      //     userStories: []
      //   }
      // ]
      setScenarios(scenarios)
    }
    getScenarios()
  }, [scenarios.length])

  // This method will delete a scenario
  async function deleteScenario(id) {
    await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE"
    })

    const newScenarios = scenarios.filter((el) => el._id !== id)
    setScenarios(newScenarios)
  }

  // This method will map out the scenarios on the table
  function scenarioList() {
    return scenarios.map((scenario) => {
      return (
        <Scenario
          scenario={scenario}
          deleteScenario={() => deleteScenario(scenario._id)}
          key={scenario._id}
        />
      )
    })
  }

  // This following section will display the table with the scenarios.
  return (
    <div className="content-container scenariolist">
      <h3>Scenario List</h3>
      <div className="list">
        <table className="table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Acceptance Criteria</th>
              <th>Team Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{scenarioList()}</tbody>
        </table>
      </div>
    </div>
  )
}
