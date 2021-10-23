import { Link } from "gatsby"
import React from "react"

const Layout = props => {
  return (
    <div>
      <div className="navbar">
        <div>
          <Link to="/">Home</Link>
        </div>
        {props.search && (
          <form>
            <input
              type="search"
              placeholder="Search"
              onChange={e => {
                props.setCharacterSearch(e.target.value)
              }}
              value={props.characterSearch}
            />
          </form>
        )}
        <div>
          <Link to="/characters">Characters</Link>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Layout
