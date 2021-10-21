import { Link } from "gatsby"
import React from "react"

const CharacterCard = props => {
  const character = props.character
  return (
    <div className="character-card">
      <Link to={"/character/" + character.name} key={character.id}>
        <div>
          <div className="character-image-container">
            <img
              className="character-image"
              src={character.image}
              alt={character.name}
            />
          </div>
          <h2>{character.name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default CharacterCard
