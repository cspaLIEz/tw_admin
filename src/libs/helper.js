export function num_random(min, max) {
    return parseInt(Math.random()*(max-min+1)+min,10);
}

export function zeroize(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}