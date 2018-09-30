const getConstants = () => {
    return {
        APPOLLO_CLIENT_URL: "http://localhost:4000/",
    }
}

const getInitialState = () => {
    return {
        SHOW_ALL_SONGS: false,
        loggerLevel: 1,
        apolloClient: null,
    }
}
export {getConstants, getInitialState}