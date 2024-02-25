//成行显示
function WriteTextsH(arr1, x, y, hei, scale) {
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

//绘制题目
function WriteText(str1, x, y, hei, scale) {
    scale = scale || 60;
    hei = hei * scale;
    let fontHei = hei + "px";
    window.game.ctx.font = "normal " + fontHei + " Arial";
    window.game.ctx.fillStyle = "#000000";
    //window.game.ctx.fillText(str1, x * scale, y * scale);
    let lines = str1.split('\n');
    let lineHei = hei +10;
    for (let j = 0; j < lines.length; j++) {
        window.game.ctx.fillText(lines[j], x * scale, y * scale + (j * lineHei));
    }
    return { txt: str1, x: x, y: y, h: hei, s: scale };
}

export {
    WriteText,
    WriteTextsH
}