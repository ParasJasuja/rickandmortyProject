import * as React from "react"
import { graphql, Link } from "gatsby"
import GridContainer from "../components/GridContainer"
import CharacterCard from "../components/CharacterCard"
import Layout from "../components/Layout"
import "../scss/styles.scss"

const IndexPage = ({ data }) => {
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  const types = []
  const status = []
  const species = []
  characters.forEach(ch => {
    if (!types.includes(ch.type) && ch.type !== "") {
      types.push(ch.type)
    }
  })
  characters.forEach(ch => {
    if (!status.includes(ch.status) && ch.status !== "") {
      status.push(ch.status)
    }
  })
  characters.forEach(ch => {
    if (!species.includes(ch.species) && ch.species !== "") {
      species.push(ch.species)
    }
  })
  const [charactersList, setCharactersList] = React.useState(characters)
  const [filterValue, setFilterValue] = React.useState("any")

  React.useEffect(() => {
    let newCharacterList = []
    const filterList = e => {
      if (filterValue === "any") {
        newCharacterList = characters
      } else {
        newCharacterList = characters.filter(ch => {
          return (
            ch.type.toLowerCase() === filterValue ||
            ch.status.toLowerCase() === filterValue ||
            ch.species.toLowerCase() === filterValue
          )
        })
        console.log(filterValue)
      }
      setCharactersList(newCharacterList.slice(0, 20))
    }
    filterList()
  }, [filterValue])
  return (
    <Layout characters={characters} setCharactersList={setCharactersList}>
      <section>
        <h2 className="heading">Few Characters</h2>
        <div className="filter-container">
          <h3>Filter</h3>
          <select
            value={filterValue}
            onChange={e => setFilterValue(e.target.value)}
          >
            <option value="any">Any</option>
            <optgroup label="Type">
              {types.map(t => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </optgroup>
            <optgroup label="Status">
              {status.map(s => (
                <option key={s} value={s.toLowerCase()}>
                  {s}
                </option>
              ))}
            </optgroup>
            <optgroup label="Species">
              {species.map(s => (
                <option key={s} value={s.toLowerCase()}>
                  {s}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <GridContainer>
          {charactersList.map(ch => {
            return <CharacterCard key={ch.id} character={ch} />
          })}
        </GridContainer>
      </section>
      <Link to="/characters" className="view-more">
        View More
      </Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query fewCharacters {
    allCharacters {
      nodes {
        id
        name
        image
        type
        status
        species
      }
    }
  }
`
