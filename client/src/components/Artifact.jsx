import React, { useEffect, useState, useContext } from "react"
// import scenario provider from context
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Content() {
  // This following section will display the table with the scenarios.
  const [scenario, setScenario] = useState([])
	const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
	const params = useParams()
	const id = params.id

    // how do we expect to get and view the right scenario?
    // we can pass by index, but not good idea. hoping scenarios have their own ids.
    // then we can surround this in a context and get that item by id (thru url) from the context.
    // but then we dunno which array to render from.
    useEffect(() => {
      async function getScenario() {
        const response = await fetch(`http://localhost:3000/scenarios/${id}`)
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`
          window.alert(message)
          return
        }
        // const scenario = await response.json()
        const scenario = {
          _id: "65611cdb9bb01a63fe01563f",
          userId: '',
          title: 'abc1',
          description: 'abc1',
          acceptanceCriteria: 'abc',
          teamName: '',
          bugs: [{
            _id: "1",
            userId: '',
            title: 'bug1',
            description: 'bug1',
            acceptanceCriteria: 'bug1',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            _id: "2",
            userId: '',
            title: 'bug2',
            description: 'bug2',
            acceptanceCriteria: 'bug2',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          }],
          changeRequests: [{
            _id: "1",
            userId: '',
            title: 'cr1',
            description: 'cr1',
            acceptanceCriteria: 'cr1',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            _id: "2",
            userId: '',
            title: 'cr2',
            description: 'cr2',
            acceptanceCriteria: 'cr2',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          }],
          features: [{
            _id: "1",
            userId: '',
            title: 'f1',
            description: 'f1',
            acceptanceCriteria: 'f1',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            _id: "2",
            userId: '',
            title: 'f2',
            description: 'f2',
            acceptanceCriteria: 'f2',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          }],
          userStories: [{
            _id: "1",
            userId: '',
            title: 'us1',
            description: 'us1',
            acceptanceCriteria: 'us1',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          },
          {
            _id: "2",
            userId: '',
            title: 'us2',
            description: 'us2',
            acceptanceCriteria: 'us2',
            teamName: '',
            comments: [],
            createdAt: '',
            updatedAt: ''
          }]
        }
        setScenario(scenario)
        setLoading(false);
      }
      getScenario();
    }, []);

  return (
    <div className="content-container artifact">
      <form>

      </form>
    </div>
  )
}
