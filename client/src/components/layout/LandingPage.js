import React from "react"
import { Link } from "react-router-dom";

const LandingPage = props => {

  const linkToHome = <Link className="main-page-redirect" to="/home">Go to the Main Page!</Link>

  return(
    <div className="outer-container">
      <section className='landing-main'>
        <h1>Welcome to WordSmith</h1>
        <div className="redirect-container">
        {linkToHome}
        </div>
      </section>
    </div>
  )
}

export default LandingPage