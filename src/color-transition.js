const colorsArr = [
    [97, 84, 183, 46, 'fff'],
    [94, 70, 149, 38, 'fff'],
    [88, 118, 150, 41, 'fff'],
    [82, 153, 159, 44, 'fff'],
    [79, 191, 139, 43, 'fff'],
    [72, 190, 97, 35, 'fff'],
    [66, 156, 33, 35, 'fff']
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

    // console.log(percentage);

    // for (let x = 0; x<10; x++) {console.log(x)}

    for (let i = 0; percentage > colorsArr[i][0]; i++) {
        console.log('i')
        console.log(i)
        console.log('percentage')
        console.log(percentage)
        console.log('colorsArr[i][0]')
        console.log(colorsArr[i][0])
        
        
        rEnd = colorsArr[i][1];
        gEnd = colorsArr[i][2];
        bEnd = colorsArr[i][3];
        textColor = colorsArr[i][4];
    }

    // if (percentage > colorsArr[0][0]) {
    //     rEnd = colorsArr[0][1];
    //     gEnd = colorsArr[0][2];
    //     bEnd = colorsArr[0][3];
    //     textColor = colorsArr[0][4];
    // } else if (percentage > colorsArr[1][0]) {
    //     rEnd = colorsArr[1][1];
    //     gEnd = colorsArr[1][2];
    //     bEnd = colorsArr[1][3];
    //     textColor = colorsArr[1][4];
    // } else if (percentage > colorsArr[2][0]) {
    //     rEnd = colorsArr[2][1];
    //     gEnd = colorsArr[2][2];
    //     bEnd = colorsArr[2][3];
    //     textColor = colorsArr[2][4];
    // } else if (percentage > colorsArr[3][0]) {
    //     rEnd = colorsArr[3][1];
    //     gEnd = colorsArr[3][2];
    //     bEnd = colorsArr[3][3];
    //     textColor = colorsArr[3][4];
    // } else if (percentage > colorsArr[4][0]) {
    //     rEnd = colorsArr[4][1];
    //     gEnd = colorsArr[4][2];
    //     bEnd = colorsArr[4][3];
    //     textColor = colorsArr[4][4];
    // }

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