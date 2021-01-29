const colorsArr = [
    [95, 0, 255, 0, 'fff'],
    [85, 76, 159, 38, 'fff'],
    [70, 180, 190, 0, 'fff'],
    [50, 212, 149, 32, 'fff'],
    [0, 255, 0, 0, 'fff']
]

let rStart = 0;
let gStart = 0;
let bStart = 0;

let rEnd, gEnd, bEnd, step, textColor;

let r = rStart;
let g = gStart;
let b = bStart;

// bodyEl.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

export const colorTransition = (element, percentage) => {

    if (percentage > colorsArr[0][0]) {
        rEnd = colorsArr[0][1];
        gEnd = colorsArr[0][2];
        bEnd = colorsArr[0][3];
        textColor = colorsArr[0][4];
    } else if (percentage > colorsArr[1][0]) {
        rEnd = colorsArr[1][1];
        gEnd = colorsArr[1][2];
        bEnd = colorsArr[1][3];
        textColor = colorsArr[1][4];
    } else if (percentage > colorsArr[2][0]) {
        rEnd = colorsArr[2][1];
        gEnd = colorsArr[2][2];
        bEnd = colorsArr[2][3];
        textColor = colorsArr[2][4];
    } else if (percentage > colorsArr[3][0]) {
        rEnd = colorsArr[3][1];
        gEnd = colorsArr[3][2];
        bEnd = colorsArr[3][3];
        textColor = colorsArr[3][4];
    } else if (percentage > colorsArr[4][0]) {
        rEnd = colorsArr[4][1];
        gEnd = colorsArr[4][2];
        bEnd = colorsArr[4][3];
        textColor = colorsArr[4][4];
    }

    let rDiff = Number(parseFloat((rEnd - r) / 100).toFixed(2));
    let gDiff = Number(parseFloat((gEnd - g) / 100).toFixed(2));
    let bDiff = Number(parseFloat((bEnd - b) / 100).toFixed(2));

    step = 0;

    element.style.color = `#${textColor}`;

    let change = setInterval(_ => {

        if (step < 100) {

            element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            r = Number(parseFloat(r + rDiff).toFixed(2));
            g = Number(parseFloat(g + gDiff).toFixed(2));
            b = Number(parseFloat(b + bDiff).toFixed(2));
            step++;
        } else {
            clearInterval(change);
        }

    }, 7);

}