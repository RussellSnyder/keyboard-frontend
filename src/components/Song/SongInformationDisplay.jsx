import React from 'react';


const SongInformationDisplay = (data) => {
    let info;

    if (!data) {
        info = <div>Data Coming soon</div>
    } else {
        let {title, tempo, keysPlayed, keysPlayedLength, keysPlayedOnset} = data
        info = (
            <div className="song">
                <h2>{title}</h2>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Tempo:</strong> {tempo} BPM</li>
                    <li className="list-group-item"><strong>Keys Played:</strong> {keysPlayed.join(", ")}</li>
                    <li className="list-group-item"><strong>Keys Played Durations:</strong> {keysPlayedLength.join(", ")}</li>
                    <li className="list-group-item"><strong>Keys Played Onset Times:</strong> {keysPlayedOnset.join(", ")}</li>
                </ul>
            </div>
        )
    }

    return info
}

export default SongInformationDisplay;
