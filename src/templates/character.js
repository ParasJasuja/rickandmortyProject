import { graphql } from "gatsby"
import React from "react"

const character = ({ data, pageContext }) => {
  const ch = data.characters
  return (
    <div>
      <h1>Single Character</h1>
      <div>
        <img src={ch.image} alt={ch.name} />
        <h2>{ch.name}</h2>
        <p>Gender: {ch.gender}</p>
        <p>Species: {ch.species}</p>
        <p>Status: {ch.status}</p>
        <p>Type:{ch.type}</p>
      </div>
    </div>
  )
}

export default character

export const pageQuery = graphql`
  query oneCharacter($id: String!) {
    characters(id: { eq: $id }) {
      gender
      id
      image
      name
      species
      status
      type
    }
  }
`
