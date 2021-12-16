export function getReadableDateTime(date) {
    date = new Date(date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours() + 5
    const minute = date.getMinutes()

    const millisecondsInMinute = 60 * 1000
    const millisecondsInHour = 60 * 60 * 1000
    const millisecondsInDay = 1000 * 3600 * 24
    const millisecondsInWeek = 1000 * 3600 * 24 * 7

    const timeDifference = Math.abs(date.getTime() - Date.now());
    
    if (timeDifference < millisecondsInMinute) {
        return "less than a minute ago"
    }
    else if (timeDifference < millisecondsInHour) {
        const minuteOffset = Math.floor(timeDifference / millisecondsInMinute)
        if (minuteOffset === 1) {
            return `${minuteOffset} minute ago`
        }
        return `${minuteOffset} minutes ago`
    }
    else if (timeDifference < millisecondsInDay) {
        const hourOffset = Math.floor(timeDifference / millisecondsInHour)
        if (hourOffset === 1) {
            return `${hourOffset} hour ago`
        }
        return `${hourOffset} hour ago`
    }
    else if (timeDifference < millisecondsInWeek) {
        const dayOffset = Math.floor(timeDifference / millisecondsInDay)
        if (dayOffset === 1) {
            return `${dayOffset} day ago`
        }
        return `${dayOffset} days ago`
    }

    return `${day}/${month}/${year}`
}