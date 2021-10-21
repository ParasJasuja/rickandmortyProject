import * as React from "react"
import { graphql, Link } from "gatsby"
import GridContainer from "../components/GridContainer"
import CharacterCard from "../components/CharacterCard"

const IndexPage = ({ data }) => {
  // const info = props.data.rickandmortyapi.characters.info
  //   ? props.data.rickandmortyapi.characters.info
  //   : []
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  return (
    <div>
      <section></section>
      <section>
        <h2 className="heading">Few Characters</h2>
        <GridContainer>
          {characters.map(ch => {
            return <CharacterCard character={ch} />
          })}
        </GridContainer>
      </section>
      <Link to="/characters" className="view-more">
        View More...
      </Link>
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query fewCharacters {
    allCharacters(limit: 10, skip: 0) {
      nodes {
        id
        name
        image
      }
    }
  }
`
