export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export function toDate(timestamp) {
    const date=new Date(timestamp)
    return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+' at '+date.getHours()+':'+date.getMinutes()
}
