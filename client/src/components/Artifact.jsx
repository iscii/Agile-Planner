import React, { useEffect, useState, useContext } from "react"
// import scenario provider from context
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { baseUrl } from "../api/config"

export default function Content() {
  // This following section will display the table with the scenarios.
  const [artifact, setArtifact] = useState(null)
  const [header, setHeader] = useState('')
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const { currentUser } = useContext(AuthContext)
  const userId = currentUser ? currentUser.uid : "No user logged in"
  const artifactType = params.artifact
  const artifactId = params.artifactId

  // how do we expect to get and view the right scenario?
  // we can pass by index, but not good idea. hoping scenarios have their own ids.
  // then we can surround this in a context and get that item by id (thru url) from the context.
  // but then we dunno which array to render from.
  useEffect(() => {
    async function getScenario() {
      const response = await fetch(`${baseUrl}/scenarios/${userId}`)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }
      const scenario = await response.json()
      // const scenario = {
      //   _id: "65611cdb9bb01a63fe01563f",
      //   userId: '',
      //   title: 'abc1',
      //   description: 'abc1',
      //   acceptanceCriteria: 'abc',
      //   teamName: '',
      //   bugs: [{
      //     _id: "1",
      //     userId: '',
      //     title: 'bug1',
      //     description: 'bug1',
      //     acceptanceCriteria: 'bug1',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   },
      //   {
      //     _id: "2",
      //     userId: '',
      //     title: 'bug2',
      //     description: 'bug2',
      //     acceptanceCriteria: 'bug2',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   }],
      //   changeRequests: [{
      //     _id: "1",
      //     userId: '',
      //     title: 'cr1',
      //     description: 'cr1',
      //     acceptanceCriteria: 'cr1',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   },
      //   {
      //     _id: "2",
      //     userId: '',
      //     title: 'cr2',
      //     description: 'cr2',
      //     acceptanceCriteria: 'cr2',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   }],
      //   features: [{
      //     _id: "1",
      //     userId: '',
      //     title: 'f1',
      //     description: 'f1',
      //     acceptanceCriteria: 'f1',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   },
      //   {
      //     _id: "2",
      //     userId: '',
      //     title: 'f2',
      //     description: 'f2',
      //     acceptanceCriteria: 'f2',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   }],
      //   userStories: [{
      //     _id: "1",
      //     userId: '',
      //     title: 'us1',
      //     description: 'us1',
      //     acceptanceCriteria: 'us1',
      //     teamName: 'ddd',
      //     comments: [],
      //     createdAt: 'CA',
      //     updatedAt: 'UA'
      //   },
      //   {
      //     _id: "2",
      //     userId: '',
      //     title: 'us2',
      //     description: 'us2',
      //     acceptanceCriteria: 'us2',
      //     teamName: '',
      //     comments: [],
      //     createdAt: '',
      //     updatedAt: ''
      //   }]
      // }

      let artifactData
      switch (artifactType) {
        case 'US':
          artifactData = scenario.userStories.find((us) => us._id === artifactId)
          setArtifact(artifactData)
          setHeader(`User Story ${artifactData ? artifactData.title : 'Not Found'}`)
          break
        case 'F':
          artifactData = scenario.features.find((f) => f._id === artifactId)
          setArtifact(artifactData)
          setHeader(`Feature ${artifactData ? artifactData.title : 'Not Found'}`)
          break
        case 'CR':
          artifactData = scenario.changeRequests.find((cr) => cr._id === artifactId)
          setArtifact(artifactData)
          setHeader(`Change Request ${artifactData ? artifactData.title : 'Not Found'}`)
          break
        case 'B':
          artifactData = scenario.bugs.find((bug) => bug._id === artifactId)
          setArtifact(artifactData)
          setHeader(`Bug ${artifactData ? artifactData.title : 'Not Found'}`)
          break
        default:
          // Handle the case when artifactType is undefined or not recognized
          setArtifact(null) // or any other appropriate action
          setHeader('Artifact Not Found')
          break
      }

      setLoading(false)
    }

    getScenario()
  }, [])

  return (
    <div className="content-container artifact">
      <h3>{header}</h3>
      {loading ? <div>Loading...</div> :
        <div className='artifact-content'>
          <div className="artifact-form">
            <form>
              <label>
                Title <br />
                <input className="form-control" defaultValue={artifact.title} />
              </label>
              <label>
                Description <br />
                <textarea className="form-control" defaultValue={artifact.description} />
              </label>
              <label>
                Team Name <br />
                <input className="form-control" defaultValue={artifact.teamName} />
              </label>
              <label>
                Acceptance Criteria <br />
                <textarea className="form-control" defaultValue={artifact.acceptanceCriteria} />
              </label>
              {/* <label>
                Comments
                <input/>
              </label> */}
              <input type='submit' className="btn btn-primary mt-4" value='Save' />
            </form>
          </div>
          <div className='right-info'>
            <div className="artifact-info">
              <div>Status: <span>{artifact.status || "N/A"}</span></div>
              <div>Created: <span>{artifact.createdAt || "N/A"}</span></div>
              <div>Updated: <span>{artifact.updatedAt || "N/A"}</span></div>
              <Link to={`/view`}>Back to Scenario</Link>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
