import React, { Component } from 'react';

export class TestResults extends Component {
    constructor() {
        super()
        this.state = {
            testResults: null,
            testResultsLoaded: false
        }
    }
    render() {

        const style = {
            minHeight: 900,
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'auto'
        }

        return (
            <div className="py-4 my-4">
                <iframe style={style} className="" src="http://localhost:3000/lcov-report/index.html" title="testResults"/>
            </div>
        )
    }

}

export default TestResults;
