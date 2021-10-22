import { graphql } from "gatsby"
import React from "react"
import "../scss/styles.scss"

const character = ({ data, pageContext }) => {
  const ch = data.characters
  return (
    <div className="character-page">
      <h1 className="heading">{ch.name}</h1>
      <div>
        <div className="single-image-container">
          <img src={ch.image} alt={ch.name} loading="lazy" />
        </div>
        <section className="character-details">
          <div className="flex-container">
            <h3>Gender:</h3>
            <p> {ch.gender}</p>
          </div>
          <div className="flex-container">
            <h3>Species:</h3>
            <p> {ch.species}</p>
          </div>
          <div className="flex-container">
            <h3>Status:</h3>
            <p> {ch.status}</p>
          </div>
          <div className="flex-container">
            <h3>Type:</h3>
            <p> {ch.type}</p>
          </div>
        </section>
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
