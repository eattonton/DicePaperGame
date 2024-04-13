import TT from "./tt"
 
function WriteTextsByRow(arr1, x, y, hei, scale) {
    let tbWid = 0;
    let x2 = x;
    let arr2 = [];
    for (let i = 0; i < arr1.length; ++i) {
        x2 = x2 + tbWid;
        let oTxt = WriteText(arr1[i], x2, y, hei, scale);
        //计算宽度
        tbWid = arr1[i].length * hei * 0.8;
        arr2.push(oTxt);
    }

    return arr2;
}
 
function WriteText(str1, x, y, hei, scale) {
    if(str1 instanceof Array){
        return WriteTextsByArr(str1, x, y, hei, scale);
    }
    scale = scale || 60;
    hei = hei * scale;
    let fontHei = hei + "px";
    TT.ctx.font = "normal " + fontHei + " Arial";
    TT.ctx.fillStyle = "#000000";
    let lines = str1.split('\n');
    let lineHei = hei +10;
    for (let j = 0; j < lines.length; j++) {
        TT.ctx.fillText(lines[j], x * scale, y * scale + (j * lineHei));
    }
    return { txt: str1, x: x, y: y, h: hei, s: scale };
}

function WriteTextsByArr(lines, x, y, hei, scale){
    scale = scale || 60;
    hei = hei * scale;
    let fontHei = hei + "px";
    TT.ctx.font = "normal " + fontHei + " Arial";
    TT.ctx.fillStyle = "#000000";
    let arr2 = [];
    let lineHei = hei +10;
    for (let j = 0; j < lines.length; j++) {
        TT.ctx.fillText(lines[j], x * scale, y * scale + (j * lineHei));
        arr2.push({ txt: lines[j], x: x, y: y, h: hei, s: scale });
    }
    return arr2;
}

function SplitByLength(str1,len){
    let arr1 = [];

    for(let i=0;i<str1.length;i+=len){
        arr1.push(str1.slice(i, i+len));
    }

    return arr1;
}

export {
    WriteText,
    WriteTextsByRow,
    WriteTextsByArr,
    SplitByLength
}