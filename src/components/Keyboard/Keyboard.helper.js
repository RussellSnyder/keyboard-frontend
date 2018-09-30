const getInitialKeyboardNoteStateObjects = () => {
    return {
        "C4": {
            on: false
        },
        "Db4": {
            on: false
        },
        "D4": {
            on: false
        },
        "Eb4": {
            on: false
        },
        "E4": {
            on: false
        },
        "F4": {
            on: false
        },
        "Gb4": {
            on: false
        },
        "G4": {
            on: false
        },
        "Ab4": {
            on: false
        },
        "A4": {
            on: false
        },
        "Bb4": {
            on: false
        },
        "B4": {
            on: false
        },
        "C5": {
            on: false
        },
        "Db5": {
            on: false
        },
        "D5": {
            on: false
        },
        "Eb5": {
            on: false
        },
        "E5": {
            on: false
        },
        "F5": {
            on: false
        },
        "Gb5": {
            on: false
        },
        "G5": {
            on: false
        },
        "Ab5": {
            on: false
        },
        "A5": {
            on: false
        },
        "Bb5": {
            on: false
        },
        "B5": {
            on: false
        }
    }
}

const translateDownKeysOnKeyboard = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    // console.log(code);
    let note = null;

    switch (code) {
        case 65:
            note = "C4";
            break;
        case 83:
            note = "D4";
            break;
        case 68:
            note = "E4";
            break;
        case 70:
            note = "F4";
            break;
        case 71:
            note = "G4";
            break;
        case 72:
            note = "A4";
            break;
        case 74:
            note = "B4";
            break;
        case 75:
            note = "C5";
            break;
        case 87:
            note = "Db4";
            break;
        case 69:
            note = "Eb4";
            break;
        case 84:
            note = "Gb4";
            break;
        case 89:
            note = "Ab4";
            break;
        case 85:
            note = "Bb4";
            break;
        case 79:
            note = "Db5";
            break;
        case 80:
            note = "Eb5";
            break;
        case 76:
            note = "D5";
            break;
        case 186:
            note = "E5";
            break;
        case 222:
            note = "F5";
            break;
        case 221:
            note = "Gb5";
            break;
    }

    return note;
}


export {translateDownKeysOnKeyboard, getInitialKeyboardNoteStateObjects}