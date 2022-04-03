import React from "react"
import { Link } from "react-router-dom";

const LandingPage = props => {
  return(
    <div className="outer-container">
      <section className='landing-main'>
        <h1>Welcome to WordSmith</h1>
        <div className="redirect-container">
          <Link
            className="main-page-redirect"
            to="/dictionaries">Go to the Main Page!
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage