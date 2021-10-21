import * as React from "react"
import { graphql, Link } from "gatsby"
import CharacterCard from "../components/CharacterCard"
import GridContainer from "../components/GridContainer"

const IndexPage = ({ data, pageContext }) => {
  const characters = data.allCharacters.nodes
  const prev = "/characters/" + (pageContext.currentPage - 1)
  const next = "/characters/" + (pageContext.currentPage + 1)
  console.log(pageContext)
  return (
    <div>
      <h2 className="heading">Character List</h2>
      <GridContainer>
        {characters.map(ch => {
          return <CharacterCard character={ch} />
        })}
      </GridContainer>
      <div className="links">
        {pageContext.currentPage === 1 ? (
          <p>link</p>
        ) : (
          <p>
            <Link to={prev}>prev</Link>
          </p>
        )}
        <p>
          {pageContext.currentPage}/{pageContext.noOfPages}
        </p>
        {pageContext.currentPage === pageContext.noOfPages ? (
          <p>next</p>
        ) : (
          <p>
            <Link to={next}>next</Link>
          </p>
        )}
      </div>
    </div>
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
