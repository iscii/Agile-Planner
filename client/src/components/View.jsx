import React, { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContext"

const Artifact = (props) => {
	// Determine the route based on the artifact type
	let editRoute
	switch (props.artifact) {
		case 'US':
			editRoute = `/updateus/${props.scenarioId}`
			break
		case 'F':
			editRoute = `/updatefeature/${props.scenarioId}`
			break
		case 'B':
			editRoute = `/updatebug/${props.scenarioId}`
			break
		case 'CR':
			editRoute = `/updatecr/${props.scenarioId}`
			break
		default:
			editRoute = '' // default route or handle the case when the artifact type is unknown
	}

	return (
		<tr>
			<td>{props.title}</td>
			<td>{props.description}</td>
			<td>{props.status}</td>
			<td>{props.acceptanceCriteria}</td>
			<td>
				<Link className="btn btn-link" to={editRoute}>Edit</Link>
				{/* |
				<button
					className="btn btn-link"
					onClick={() => {
						props.deleteScenario(props.scenarioId)
					}}
				>
					Delete
				</button> */}
			</td>
		</tr>
	)
}


export default function View() {
	const [scenario, setScenario] = useState(null)
	const [artifact, setArtifact] = useState('US')
	const [loading, setLoading] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		async function getScenario() {
			try {
				const response = await axios.get(`http://localhost:3000/scenario/${id}`)
				setScenario(response.data)
				setLoading(false)
			} catch (error) {
				console.error(error)
				window.alert(error)
			}
		}
		getScenario()
	}, [id])

	const artifactsList = () => {
		if (!scenario) return null // Ensure scenario is loaded

		let artifacts
		switch (artifact) {
			case 'US':
				artifacts = scenario.userStories?.map((story, i) => (
					<Artifact scenarioId={scenario._id} artifact={artifact} {...story} key={i} />
				))
				break
			case 'F':
				artifacts = scenario.features?.map((feature, i) => (
					<Artifact scenarioId={scenario._id} artifact={artifact} {...feature} key={i} />
				))
				break
			case 'B':
				artifacts = scenario.bugs?.map((bug, i) => (
					<Artifact scenarioId={scenario._id} artifact={artifact} {...bug} key={i} />
				))
				break
			case 'CR':
				artifacts = scenario.changeRequests?.map((cr, i) => (
					<Artifact scenarioId={scenario._id} artifact={artifact} {...cr} key={i} />
				))
				break
			default:
				artifacts = <div>Artifact does not exist</div>
		}
		return <>{artifacts}</>
	}


	const changeArtifact = (e, newArtifact) => {
		const tabs = document.querySelectorAll('.artifacts-tabs button')
		tabs.forEach(tab => {
			tab.classList.remove('selected')
		})
		e.target.classList.add('selected')
		setArtifact(newArtifact)
	}

	return (
		<div className="content-container view">
			<div className="info">
				<h3>Scenario Info</h3>
				<div className="info-content">
					{loading ?
						<div>Awaiting New Data</div> :
						scenario && (
							<>
								<div className="infolet">Title: <br /><span>{scenario.title || "N/A"}</span></div>
								<div className="infolet">Description: <br /><span>{scenario.description || "N/A"}</span></div>
								<div className="infolet">Acceptance Criteria: <br /><span>{scenario.acceptanceCriteria || "N/A"}</span></div>
								{/* <div className="infolet">Team Name: <br /><span>{scenario.teamName || "N/A"}</span></div> */}
								<div className="infolet">Status: <br /><span>{scenario.status || "N/A"}</span></div>
							</>
						)
					}
				</div>
			</div>
			<div className="artifacts">
				<h3>
					<div className='artifacts-tabs'>
						<button className='selected' onClick={(e) => changeArtifact(e, 'US')}>User Stories</button>
						<button onClick={(e) => changeArtifact(e, 'F')}>Features</button>
						<button onClick={(e) => changeArtifact(e, 'B')}>Bugs</button>
						<button onClick={(e) => changeArtifact(e, 'CR')}>CRs</button>
					</div>
				</h3>
				<div className="artifacts-content">
					<table className="table" style={{ marginTop: 20 }}>
						<thead>
							<tr>
								<th>Title</th>
								<th>Description</th>
								<th>Status</th>
								<th>Acceptance Criteria</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ?
								<tr><td colSpan="6">Loading...</td></tr> :
								artifactsList()
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
