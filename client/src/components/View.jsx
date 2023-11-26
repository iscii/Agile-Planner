import React, { useEffect, useState, useContext } from "react"
// import scenario provider from context
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Artifact = (props) => (
	<tr>
		<td>{props.title}</td>
		<td>{props.description}</td>
		<td>{props.status}</td>
		<td>{props.acceptanceCriteria}</td>
		<td>{props.teamName}</td>
		<td>
			<Link className="btn btn-link" to={`/view/${props.scenarioId}/${props.artifact}/${props._id}`}>Edit</Link> |
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
);

export default function View() {
  // This following section will display the table with the scenarios.
  	const [scenario, setScenario] = useState([])
	const [artifact, setArtifact] = useState('US')
	const [loading, setLoading] = useState(true)
	const params = useParams()
	const id = params.id

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

	const artifactsList = () => {
		switch (artifact) {
			case 'US':
				return scenario.userStories.map((story, i) => {
					return <Artifact scenarioId={scenario._id} artifact={artifact} {...story} key={i} />
				});
			case 'F':
				return scenario.features.map((feature, i) => {
					return <Artifact scenarioId={scenario._id} artifact={artifact} {...feature} key={i} />
				});
			case 'B':
				return scenario.bugs.map((bug, i) => {
					return <Artifact scenarioId={scenario._id} artifact={artifact} {...bug} key={i} />
				});
			case 'CR':
				return scenario.changeRequests.map((cr, i) => {
					return <Artifact scenarioId={scenario._id} artifact={artifact} {...cr} key={i} />
				});
			default:
				return <div>Artifact does not exist</div>
		}
	}
  
  return (
    <div className="content-container view">
			<div className="info">
				<h3>
					<div>
						Scenario Info
					</div>	
				</h3>
				<div className="info-content">
					{	loading ?
						<div>
							Loading...
						</div> :
						<>
							<span>{scenario.title ?? "No Title"}</span>
							<span>{scenario.description ?? "No Description"}</span>
						</>
					}
				</div>
			</div>
			<div className="artifacts">
				<h3>
					<div>
						<button className='selected' onClick={() => setArtifact('US')}>User Stories</button>
						<button onClick={() => setArtifact('F')}>Features</button>
						<button onClick={() => setArtifact('B')}>Bugs</button>
						<button onClick={() => setArtifact('CR')}>CRs</button>
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
							<th>Team Name</th>
							<th>Action</th>
						</tr>
						</thead>
						<tbody>
							{	loading ?
								<tr>
									<td colSpan="6">Loading...</td>
								</tr>
								:
								artifactsList()
							}
						</tbody>
					</table>
				</div>
			</div>
    </div>
  )
}
