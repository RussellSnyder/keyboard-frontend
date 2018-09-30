import {Logger} from "./Logger.component";


it('is is an instance of the Logger Component', () => {
    expect(new Logger()).toBeInstanceOf(Logger)
});

it('takes properties loggerLevel and componentName when passed into Constructor', () => {
    let mockProps = {
        loggerLevel: 0,
        componentName: 'tester'
    }

    let logger = new Logger(mockProps.componentName, mockProps.loggerLevel);

    expect(logger.componentName).toEqual(mockProps.componentName)
    expect(logger.loggerLevel).toEqual(mockProps.loggerLevel)
});

it('log function will return null if loggerLevel is string not matching component or 0', () => {
    // if no logger level, Logger is mute
    let loggerMute = new Logger();
    expect(loggerMute.log()).toEqual(null);

    // if Logger is mute, all logs are null
    let logger0 = new Logger(null, 0, 1);
    expect(logger0.log()).toEqual(null);

    // if logger instance is mute but class if not, all logs are null
    let logger1 = new Logger(null, 1, 1);
    expect(logger1.log(0)).toEqual(null);

    // if logger instance is mute but class if not, all logs are null
    let loggerTest = new Logger(null, 'Test', 'yolo');
    expect(loggerTest.log()).toEqual(null);

});
