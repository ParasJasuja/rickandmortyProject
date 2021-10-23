import * as React from "react"
import { graphql } from "gatsby"
import GridContainer from "../components/GridContainer"
import CharacterCard from "../components/CharacterCard"
import Layout from "../components/Layout"
import "../scss/styles.scss"
import FilterCharacter from "../components/FilterCharacter"

const IndexPage = ({ data }) => {
  const [characterSearch, setCharacterSearch] = React.useState("")
  const [filterValue, setFilterValue] = React.useState("any")
  const [noOfCharacters, setNoOfCharacters] = React.useState(20)
  const [viewMore, setViewMore] = React.useState(1)
  const characters = data.allCharacters.nodes ? data.allCharacters.nodes : []
  const [charactersList, setCharactersList] = React.useState(characters)
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

  const loadMoreCharacters = () => {
    setNoOfCharacters(prvs => prvs + 20)
  }
  React.useEffect(() => {
    if (characterSearch === "" && filterValue === "any") {
      setCharactersList(characters)
    } else if (characterSearch !== "" && filterValue === "any") {
      const newCharactersList = characters.filter(ch => {
        const name = ch.name.toLowerCase()
        return name.indexOf(characterSearch.toLowerCase()) > -1
      })

      setCharactersList(newCharactersList)
    } else if (characterSearch === "" && filterValue !== "any") {
      const newCharactersList = characters.filter(ch => {
        return (
          ch.type.toLowerCase() === filterValue ||
          ch.status.toLowerCase() === filterValue ||
          ch.species.toLowerCase() === filterValue
        )
      })
      setCharactersList(newCharactersList)
    } else {
      setCharactersList(prvs => prvs)
    }
  }, [noOfCharacters, characterSearch, filterValue])
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    charactersList.length > noOfCharacters
      ? setViewMore(1)
      : charactersList.length < 20
      ? setViewMore(0)
      : setViewMore(-1)
  }, [charactersList])

  return (
    <Layout
      characters={characters}
      setCharactersList={setCharactersList}
      characterSearch={characterSearch}
      setCharacterSearch={setCharacterSearch}
      search
    >
      <section>
        <h2 className="heading">Few Characters</h2>
        <FilterCharacter
          types={types}
          status={status}
          species={species}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        <GridContainer>
          {charactersList.length > 0 ? (
            charactersList.slice(0, noOfCharacters).map(ch => {
              return <CharacterCard key={ch.id} character={ch} />
            })
          ) : (
            <h2 className="heading">No Match Found</h2>
          )}
        </GridContainer>
      </section>
      {viewMore === 1 ? (
        <button className="view-more" onClick={loadMoreCharacters}>
          View More
        </button>
      ) : viewMore === -1 ? (
        <button
          className="view-less"
          onClick={() => {
            setNoOfCharacters(20)
            setViewMore(true)
          }}
        >
          View Less
        </button>
      ) : (
        <p></p>
      )}
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
