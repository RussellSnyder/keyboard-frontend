const convertBeatFractionToMilliSeconds = (fraction, tempo) => {
    if (fraction <= 0) return 0;
    let oneBeat = 60000 / tempo;
    // we assume 4/4 time for now
    let oneMeasure = oneBeat * 4;
    return oneMeasure * fraction;
}

const convertMilliSecondsToBeatFraction = (milliseconds, tempo) => {
    let oneBeatInMs = 60000 / tempo;
    return milliseconds / oneBeatInMs / 4;
}

export {convertBeatFractionToMilliSeconds, convertMilliSecondsToBeatFraction};