export function formatUTCOffset(hours) {
    return (hours >= 0) ? `+${hours}` : `${hours}`;
}

export function shallowCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

//если строка слишком длинная - укорачиваем
export function truncateString(str, maxLen) {
    return (str.length > maxLen) ? str.slice(0, maxLen) + '...' : str;
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}