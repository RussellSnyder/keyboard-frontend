import React from 'react'
import renderer from 'react-test-renderer'

import { convertBeatFractionToMilliSeconds, convertMilliSecondsToBeatFraction} from './Utils'

it('Should convert beats to ms', () => {
    expect(convertBeatFractionToMilliSeconds(0.25, 120)).toEqual(500)
    expect(convertBeatFractionToMilliSeconds(1, 120)).toEqual(2000)
});

it('Should convert ms to beats', () => {
    expect(convertMilliSecondsToBeatFraction(500, 120)).toEqual(0.25)
    expect(convertMilliSecondsToBeatFraction(2000, 120)).toEqual(1)
    expect(convertMilliSecondsToBeatFraction(500, 60)).toEqual(0.125)
    expect(convertMilliSecondsToBeatFraction(500, 240)).toEqual(0.5)
    expect(convertMilliSecondsToBeatFraction(3000, 240)).toEqual(3)
});

