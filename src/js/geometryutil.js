//绘制直线
function DrawLine(x1, y1, x2, y2, wid, scale, strColor = "black", strStyle = "solid") {
    scale = scale || 60;
    wid = wid || 0.1;
    window.game.ctx.lineWidth = wid * scale;
    window.game.ctx.strokeStyle = strColor || "black";
    //开始一个新的绘制路径
    window.game.ctx.beginPath();
    if (strStyle == "dash") {
        window.game.ctx.setLineDash([0.1 * scale, 0.3 * scale]); // 设置虚线样式
        window.game.ctx.lineDashOffset = 0; // 设置虚线起始偏移量
    }
    else {
        window.game.ctx.setLineDash([]); // 设置实线样式
    }
    window.game.ctx.moveTo(x1 * scale, y1 * scale);
    window.game.ctx.lineTo(x2 * scale, y2 * scale);
    window.game.ctx.lineCap = "square";
    window.game.ctx.stroke();
    //关闭当前的绘制路径
    window.game.ctx.closePath();
}

//绘制圆
function DrawCircle(cx, cy, radius, wid, scale, strColor, strFill) {
    scale = scale || 60;
    wid = wid || 0.1;
    window.game.ctx.beginPath();
    window.game.ctx.setLineDash([]); // 设置实线样式
    window.game.ctx.lineWidth = wid * scale;
    window.game.ctx.strokeStyle = strColor || "black";
    window.game.ctx.arc(cx * scale, cy * scale, radius * scale, 0, 2 * Math.PI, false);
    window.game.ctx.stroke();
    if (strFill) {
        window.game.ctx.fillStyle = strFill || '#9fd9ef';
        window.game.ctx.fill();
    }
    //关闭当前的绘制路径
    window.game.ctx.closePath();
}

export{
    DrawLine,
    DrawCircle
}