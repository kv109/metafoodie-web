const colorsArr = [
    [100, 84, 183, 46, 'fff'],
    [97, 84, 183, 46, 'fff'],
    [90, 70, 149, 38, 'fff'],
    [84, 118, 150, 41, 'fff'],
    [79, 153, 159, 44, 'fff'],
    [73, 191, 139, 43, 'fff'],
    [70, 190, 97, 35, 'fff'],
    [64, 156, 33, 35, 'fff']
]

let rStart = 0;
let gStart = 0;
let bStart = 0;

let rEnd, gEnd, bEnd, step, textColor;

let r = rStart;
let g = gStart;
let b = bStart;

// console.log('Start')

// console.log(rStart)
// console.log(gStart)
// console.log(bStart)

export const colorTransition = (element, percentage) => {

// console.log('percentage')
// console.log(percentage)

    // if (percentage > 0) {

    for (let i = 0; percentage < colorsArr[i][0]; i++) {
        
        rEnd = colorsArr[i+1][1];
        gEnd = colorsArr[i+1][2];
        bEnd = colorsArr[i+1][3];
        textColor = colorsArr[i+1][4];

    // console.log('End')
        
    //     console.log(rEnd)
    //     console.log(gEnd)
    //     console.log(bEnd)

    }

    let rDiff = Number(parseFloat((rEnd - r) / 100).toFixed(2));
    let gDiff = Number(parseFloat((gEnd - g) / 100).toFixed(2));
    let bDiff = Number(parseFloat((bEnd - b) / 100).toFixed(2));

    // console.log('diff')
    // console.log(rDiff)
    // console.log(gDiff)
    // console.log(bDiff)

    step = 0;

    element.style.color = `#${textColor}`;

    let change = setInterval(_ => {

        if (step < 100) {

            element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            r = Number(parseFloat(r + rDiff).toFixed(2));
            g = Number(parseFloat(g + gDiff).toFixed(2));
            b = Number(parseFloat(b + bDiff).toFixed(2));
            // console.log('r,g,b')
            // console.log(r)
            // console.log(g)
            // console.log(b)
            step++;
        } else {
            clearInterval(change);
        }

    }, 7);


}
// else {console.log('brak percentage')}

// }