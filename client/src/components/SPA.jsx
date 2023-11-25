import React, { useEffect, useState, useContext } from "react"
// import scenario provider from context
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function SPA() {
  // This following section will display the table with the scenarios.
    const [scenario, setScenario] = useState([])
	const [content, setContent] = useState([])
	const params = useParams()
	const id = params.id

    // how do we expect to get and view the right scenario?
    // we can pass by index, but not good idea. hoping scenarios have their own ids.
    // then we can surround this in a context and get that item by id (thru url) from the context.
    // but then we dunno which array to render from.

	const btnFunc = (e) => {
		// create array of components and render
	}
  
  return (
    <div className="content-container spa">

    </div>
  )
}
