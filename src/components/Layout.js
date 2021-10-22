import { Link } from "gatsby"
import React, { useEffect, useState } from "react"

const Layout = props => {
  const [characterName, setCharacterName] = useState("")
  const searchCharacter = () => {
    const newCharactersList = props.characters.filter(ch => {
      const name = ch.name.toLowerCase()
      return name.indexOf(characterName.toLowerCase()) > -1
    })
    props.setCharactersList(newCharactersList.slice(0, 20))
  }

  useEffect(() => {
    searchCharacter()
  }, [characterName])
  return (
    <div>
      <div className="navbar">
        <div>
          <Link to="/">Home</Link>
        </div>
        <form>
          <input
            type="search"
            placeholder="Search"
            onChange={e => {
              setCharacterName(e.target.value)
            }}
            value={characterName}
          />
        </form>
        <div>
          <Link to="/characters">Characters</Link>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Layout
