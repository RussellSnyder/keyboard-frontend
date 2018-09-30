import ApolloClient from "apollo-boost";

import gql from "graphql-tag";
import 'unfetch/polyfill'

const client = new ApolloClient({
    uri: "http://localhost:4000/"
});


const getAllSongData = () => {
    return client.query({
        query: gql`
            {
              songs {
                    id
                    title
                    tempo
                    keysPlayed
                    keysPlayedLength
                    keysPlayedOnset
                }
            }
  `
    })
}

export {getAllSongData};