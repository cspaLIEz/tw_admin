export function num_random(min, max) {
    return parseInt(Math.random()*(max-min+1)+min,10);
}