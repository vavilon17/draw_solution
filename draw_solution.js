function draw(weight, height, padding) {

    let errorMsg = validate(weight, height, padding);
    if (errorMsg !== "") {
        console.error(errorMsg);
        return [];
    }

    // init and fill array with spaces
    let resultArray = new Array(height);
    for (let i = 0; i < height; i++) {
        resultArray[i] = new Array(weight);
        for (let j = 0; j < weight; j++) {
            resultArray[i][j] = drawSigns[0];
        }
    }

    //
    function fillShape(left, up) {
        // we stop when reach the middle of the shape
        if (left >= weight / 2 || up >= height / 2) {
            return;
        }

        fillColumns(left, up, height - up);
        fillRows(up, left, weight - left);

        // we do a recursive call by narrowing bounds
        fillShape(left + padding / 2 + 1, up + padding / 2 + 1);
    }

    /**
     * fills symmetrical vercial parts with a specific padding
     */
    function fillColumns(row, up, down) {
        for (let j = up; j < down; j++) {
            resultArray[j][row] = drawSigns[2];
            resultArray[j][weight - row - 1] = drawSigns[2];
        }
    }

    /**
     * fills symmetrical horizontal parts with a specific padding
     */
    function fillRows(column, left, right) {
        for (let i = left; i < right; i++) {
            resultArray[column][i] = drawSigns[1];
            resultArray[height - column - 1][i] = drawSigns[1];
        }
    }

    fillShape(0, 0);

    return resultArray;
}

let drawSigns = {
    0: ' ',
    1: '-',
    2: '|'
};

/**
 * Function validates input and returns a velation error message if any.
 * Empty string result means there were no any validation errors
 */
function validate(width, height, padding) {
    if (width % 2 !== 0 || width < 20) {
        return "Width should be even and >=20";
    }
    if (height % 2 !== 0 || height < 20) {
        return "Height should be even and >=20";
    }
    if (padding % 2 !== 0 || padding < 4) {
        return "Padding should be even and >=4";
    }
    return "";
}

/**
 * Testing function which prints the figure to the console with given params
 */
function printShape(shape, w, h) {
    for (var j = 0; j < h; j++) {
        let row = "";
        for (var i = 0; i < w; i++) {
            row += shape[j][i];
        }
        console.log(row);
    }
}

let params = {
    w: 20,
    h: 20,
    p: 4
};

/**
 * Example of the usage
 *
 var shape = draw(params.w, params.h, params.p);
 printShape(shape, params.w, params.h);
 */