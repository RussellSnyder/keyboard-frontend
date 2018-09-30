import React from 'react'
import renderer from 'react-test-renderer'

import {getAllSongData} from './queries'

it('Accesses GraphQL and returns an array of song data which has id, title, tempo, keysPlayed and keysPlayedLength stored', async () => {
    expect.assertions(5);
    return getAllSongData().then(result => {
        let test = result.data.songs[0]
        expect(test).toHaveProperty('id');
        expect(test).toHaveProperty('title');
        expect(test).toHaveProperty('tempo');
        expect(test).toHaveProperty('keysPlayed');
        expect(test).toHaveProperty('keysPlayedLength');
    });
});

