import * as React from "react"
import { Link } from "gatsby"
import "../scss/styles.scss"

const NotFoundPage = () => (
  <div className="not-found-page">
    <h1>404</h1>
    <p>Page Not Found</p>
    <p>
      <Link to="/">Go back to home</Link>
    </p>
  </div>
)

export default NotFoundPage
