import React, { useEffect, useState, useContext } from "react"
// import scenario provider from context
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Features = (props) => (
	<>
	</>
);
const Stories = (props) => (
	<>
	</>
);
const Bugs = (props) => (
	<>
	</>
);
const CRs = (props) => (
	<>
	</>
);

export default function View() {
  // This following section will display the table with the scenarios.
  const [scenario, setScenario] = useState([])
	const [content, setContent] = useState([])
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
				bugs: [],
				changeRequests: [],
				features: [],
				userStories: []
			}
			setScenario(scenario)
		}
		getScenario();
	}, []);

	const btnFunc = (e) => {
		// create array of components and render
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
					<span>{scenario.title ?? "No Title"}</span>
					<span>{scenario.description ?? "No Description"}</span>
				</div>
			</div>
			<div className="content">
				<h3>
					<div>
						<button>User Stories</button>
						<button>Features</button>
						<button>Bugs</button>
						<button>CRs</button>
					</div>
				</h3>
				<div className="content-content">
					<table>
						{/* <Content/> */}
						{/* fill with converted features/userstores/bugs/cr list components */}
					</table>
				</div>
			</div>
    </div>
  )
}
