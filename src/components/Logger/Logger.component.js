// Logger Levels

// int 0  -  Mute
// int 1  -  Only show Global messages
// int 2  -  show higher component interactions
// int 3  -  show all component messages
// string -  Name of the component to show messages from

const LOGGER_STYLES = {
    "Default" : 'background: #222; color: #bada55',
    "PianoKey.component" : 'background: #222; color: #badaEE'
}

export class Logger {
    constructor(componentName, loggerLevel, globalLoggerLevel) {
        this.loggerLevel = loggerLevel ? loggerLevel : 0;
        this.componentName = componentName ? componentName : null;
        this.globalLoggerLevel = globalLoggerLevel ? globalLoggerLevel : null;
    }

    log(level, ...variables) {
        if (this.loggerLevel === 0) return null

        if (typeof level === "string" && this.componentName === level) {
            this.logWithStyle(...variables)
        }

        if (!isNaN(level) && (level > this.loggerLevel)) {
            this.logWithStyle(...variables)
        } else {
            return null
        }
    }


    logWithStyle(...variables) {
        let style = LOGGER_STYLES[this.componentName] ? LOGGER_STYLES[this.componentName] : LOGGER_STYLES["Default"]
        console.log(`%c ${variables.join(", ")}`, style)
    }

}

export default Logger;
