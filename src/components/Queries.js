import { Link } from "react-router-dom";
import React from 'react';
import ApolloClient from "apollo-boost";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "http://localhost:4000/"
});


const getAllSongs = () => (
    <Query
        query={gql`
            {
              songs {
                    id
                    title
                    tempo
                    keysPlayed
                    keysPlayedLength
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            const songs = (data.songs.map(({ id, title, tempo, keysPlayed, keysPlayedLength }) => (
                <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{title}</td>
                    <td>{tempo}</td>
                    <td>{keysPlayed.join(", ")}</td>
                    <td>{keysPlayedLength.join(", ")}</td>
                    <td><Link to={`song/${id}`}>To Song</Link> &#8599;</td>
                </tr>
            )))

            return (
                <table className="table" id="song-container">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Tempo</th>
                        <th scope="col">Keys Played</th>
                        <th scope="col">Keys Played Length</th>
                        <th scope="col">Link</th>
                    </tr>
                    </thead>
                    <tbody>
                        {songs}
                    </tbody>
                </table>
            );
        }}
    </Query>

);


const getSongData = () => {
    return client.query({
        query: gql`
            {
              songs {
                    id
                    title
                    tempo
                    keysPlayed
                    keysPlayedLength
                }
            }
  `
    })
}

export {getAllSongs, getSongData};