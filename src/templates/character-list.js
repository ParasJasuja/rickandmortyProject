import * as React from "react"
import { graphql, Link } from "gatsby"

const IndexPage = ({ data, pageContext }) => {
  const characters = data.allCharacters.nodes
  const prev = "/characters/" + (pageContext.currentPage - 1)
  const next = "/characters/" + (pageContext.currentPage + 1)
  console.log(pageContext)
  return (
    <div>
      <h1>Character List</h1>
      {characters.map(ch => {
        return (
          <Link to={"/character/" + ch.name} key={ch.id}>
            <div>
              <img src={ch.image} alt={ch.name} />
              <h2>{ch.name}</h2>
            </div>
          </Link>
        )
      })}
      <div>
        {pageContext.currentPage === 1 ? (
          <p>link</p>
        ) : (
          <Link to={prev}>prev</Link>
        )}
        <p>
          {pageContext.currentPage}/{pageContext.noOfPages}
        </p>
        {pageContext.currentPage === pageContext.noOfPages ? (
          <p>link</p>
        ) : (
          <Link to={next}>next</Link>
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
