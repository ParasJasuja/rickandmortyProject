import * as React from "react"
import { graphql, Link } from "gatsby"

const IndexPage = ({ data }) => {
  // const info = props.data.rickandmortyapi.characters.info
  //   ? props.data.rickandmortyapi.characters.info
  //   : []
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  return (
    <div>
      <section></section>
      <section>
        <h2>Few Characters</h2>
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
      </section>
      <Link to="/characters">View More...</Link>
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
