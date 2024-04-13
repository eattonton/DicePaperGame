import TT from "./tt"

//绘制直线
function DrawLine(x1, y1, x2, y2, wid, scale, strColor = "black", strStyle = "solid") {
    scale = scale || 60;
    wid = wid || 0.1;
    TT.ctx.lineWidth = wid * scale;
    TT.ctx.strokeStyle = strColor || "black";
    //开始一个新的绘制路径
    TT.ctx.beginPath();
    if (strStyle == "dash") {
        TT.ctx.setLineDash([0.1 * scale, 0.3 * scale]); // 设置虚线样式
        TT.ctx.lineDashOffset = 0; // 设置虚线起始偏移量
    }
    else {
        TT.ctx.setLineDash([]); // 设置实线样式
    }
    TT.ctx.moveTo(x1 * scale, y1 * scale);
    TT.ctx.lineTo(x2 * scale, y2 * scale);
    TT.ctx.lineCap = "square";
    TT.ctx.stroke();
    //关闭当前的绘制路径
    TT.ctx.closePath();
}

//绘制圆
function DrawCircle(cx, cy, radius, wid, scale, strColor, strFill) {
    scale = scale || 60;
    wid = wid || 0.1;
    TT.ctx.beginPath();
    TT.ctx.setLineDash([]); // 设置实线样式
    TT.ctx.lineWidth = wid * scale;
    TT.ctx.strokeStyle = strColor || "black";
    TT.ctx.arc(cx * scale, cy * scale, radius * scale, 0, 2 * Math.PI, false);
    TT.ctx.stroke();
    if (strFill) {
        TT.ctx.fillStyle = strFill || '#9fd9ef';
        TT.ctx.fill();
    }
    //关闭当前的绘制路径
    TT.ctx.closePath();
}

//绘制矩形
function DrawRect(x, y, w, h, wid, scale, strColor, strFill) {
    scale = scale || 60;
    wid = wid || 0.1;
    if (strFill != "") {
        /*填充矩形方法：fillRect(x,y,w,h)*/
       // this.context2D.fillStyle = 'blue';
       // this.context2D.fillRect(x * scale, y * scale, w * scale, h * scale);
    }
    /*描边矩形方法：strokeRect(x,y,w,h)*/
    TT.ctx.strokeStyle = strColor || "black";
    TT.ctx.lineWidth = wid * scale;
    TT.ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
}

 //绘制方格
 function DrawSquare(x0, y0, width, strColor = "black", strStyle = "solid") {
    let linW = 0.04;
    let linScale = 60;
    DrawLine(x0, y0, x0 + width, y0, linW, linScale, strColor, strStyle);
    DrawLine(x0 + width, y0, x0 + width, y0 + width, linW, linScale, strColor, strStyle);
    DrawLine(x0 + width, y0 + width, x0, y0 + width, linW, linScale, strColor, strStyle);
    DrawLine(x0, y0 + width, x0, y0, linW, linScale, strColor, strStyle);
}

export{
    DrawLine,
    DrawCircle,
    DrawRect,
    DrawSquare
}