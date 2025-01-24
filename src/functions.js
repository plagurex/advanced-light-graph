export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function generateColors(count, color) {
    let r = []

    for (let i = 0; i < count; i++) {
        // let s = `hsl(${360 * i / count}deg, ${100}%, 60%)`
        // console.log(s)
        // r.push(s)
        let s = `hsl(${color}, 60%, ${80 - 50 * i / count}%)`
        r.push(s)
    }
    return r
}

export function createSVGElement(type, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}

