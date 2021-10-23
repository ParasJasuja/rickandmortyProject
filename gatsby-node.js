const path = require("path")

const axios = require("axios")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const integerList = (start, length) =>
    Array.from({ length: length }, (v, k) => k + start)

  const rickMortyURL = `https://rickandmortyapi.com/api/character/${integerList(
    1,
    671
  )}`

  const rickMorty = await axios.get(rickMortyURL)
  const query = await axios.get(rickMortyURL)
  rickMorty.data.forEach(character => {
    const nodeContent = JSON.stringify(character)
    const nodeMeta = {
      id: character.id.toString(),
      //       //id: createNodeId(`char-data-${character.id}`),
      parent: null,
      children: [],
      internal: {
        type: `Characters`,
        content: nodeContent,
        contentDigest: createContentDigest(character),
      },
    }
    const node = Object.assign({}, character, nodeMeta)
    createNode(node)
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allCharacters {
        nodes {
          id
          name
        }
        totalCount
      }
    }
  `)
  //creating characterList pages
  const totalCharacters = data.allCharacters.totalCount
  const characterListTemplate = path.resolve(
    "./src/templates/character-list.js"
  )
  const characterPerPage = 20
  const noOfPages = Math.ceil(totalCharacters / characterPerPage)
  Array.from({ length: noOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/characters` : `/characters/${i + 1}`,
      component: characterListTemplate,
      context: {
        limit: characterPerPage,
        skip: i * characterPerPage,
        noOfPages,
        currentPage: i + 1,
      },
    })
  })
  const characterTemplate = path.resolve("./src/templates/character.js")
  const characters = data.allCharacters.nodes
  characters.forEach(ch => {
    createPage({
      path: `/character/${ch.name}${ch.id}`,
      component: characterTemplate,
      context: {
        id: `${ch.id}`,
      },
    })
  })
}
