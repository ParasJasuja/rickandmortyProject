import * as React from "react"
import { graphql, Link } from "gatsby"
import CharacterCard from "../components/CharacterCard"
import GridContainer from "../components/GridContainer"
import Layout from "../components/Layout"
import "../scss/styles.scss"

const IndexPage = ({ data, pageContext }) => {
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  const [charactersList, setCharactersList] = React.useState(characters)
  const prev = "/characters/" + (pageContext.currentPage - 1)
  const next = "/characters/" + (pageContext.currentPage + 1)

  return (
    <Layout characters={characters} setCharactersList={setCharactersList}>
      <h2 className="heading">Character List</h2>
      <GridContainer>
        {charactersList.length > 0 ? (
          charactersList.map(ch => {
            return <CharacterCard key={ch.id} character={ch} />
          })
        ) : (
          <h2 className="heading">No Match Found</h2>
        )}
      </GridContainer>
      <div className="links">
        {pageContext.currentPage === 1 ? (
          <p className="disabled">prvs</p>
        ) : (
          <p>
            <Link to={prev}>prev</Link>
          </p>
        )}
        <p>
          {pageContext.currentPage}/{pageContext.noOfPages}
        </p>
        {pageContext.currentPage === pageContext.noOfPages ? (
          <p className="disabled">next</p>
        ) : (
          <p>
            <Link to={next}>next</Link>
          </p>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query allCharacters($limit: Int!, $skip: Int!) {
    allCharacters(limit: $limit, skip: $skip) {
      nodes {
        id
        name
        image
      }
    }
  }
`
