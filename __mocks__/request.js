const data = {
    "data": {
    "songs": [
        {
            "id": "1",
            "title": "Arpeggios for the Win",
            "tempo": "120",
            "keysPlayed": [
                "C4",
                "D4",
                "E4",
                "C4",
                "E4",
                "D4",
                "C4"
            ],
            "keysPlayedLength": [
                "4n",
                "8n",
                "8n",
                "4n",
                "4n",
                "4n",
                "4n"
            ]
        },
        {
            "id": "2",
            "title": "Minor Victory",
            "tempo": "160",
            "keysPlayed": [
                "C4",
                "D4",
                "Eb4",
                "C4",
                "D4",
                "Eb4",
                "C5",
                "D5",
                "Eb5",
                "C4"
            ],
            "keysPlayedLength": [
                "4n",
                "8n",
                "8n",
                "4n",
                "4n",
                "4t",
                "4t",
                "4t",
                "4n"
            ]
        },
        {
            "id": "3",
            "title": "Fifths to Freedom",
            "tempo": "80",
            "keysPlayed": [
                "C4",
                "G4",
                "C4",
                "G4",
                "Db4",
                "Ab4",
                "Db4",
                "Ab4",
                "C5",
                "C4"
            ],
            "keysPlayedLength": [
                "4t",
                "4t",
                "4t",
                "4t",
                "4t",
                "4t",
                "4t",
                "4t",
                "4t",
                "2n"
            ]
        },
        {
            "id": "4",
            "title": "Lightening Licks",
            "tempo": "80",
            "keysPlayed": [
                "E4",
                "E4",
                "F4",
                "G4",
                "E4",
                "C4",
                "D4",
                "D4",
                "F4",
                "E4",
                "D4",
                "E5",
                "E5",
                "F5",
                "G5",
                "E5",
                "C5",
                "D5",
                "D5",
                "F5",
                "E5",
                "D5"
            ],
            "keysPlayedLength": [
                "8n",
                "8n",
                "8n",
                "8n",
                "4n",
                "8n",
                "4n",
                "8n",
                "8n",
                "8n",
                "4n",
                "8n",
                "8n",
                "8n",
                "8n",
                "4n",
                "8n",
                "4n",
                "8n",
                "8n",
                "8n",
                "4n"
            ]
        },
        {
            "id": "5",
            "title": "Coolio Thing",
            "tempo": "70",
            "keysPlayed": [
                "Eb",
                "Gb",
                "Eb",
                "Gb",
                "Eb",
                "Bb",
                "Eb"
            ],
            "keysPlayedLength": [
                "2n",
                "2n",
                "2n",
                "2n",
                "2n",
                "4n",
                "4n"
            ]
        }
    ]
}
}

export default function request(url) {
    return new Promise((resolve, reject) => {

        const userID = parseInt(url.substr('/data/'.length), 10);
        process.nextTick(
            () =>
                data[userID]
                    ? resolve(data[userID])
                    : reject({
                    error: 'User with ' + userID + ' not found.',
                }),
        );
    });
}