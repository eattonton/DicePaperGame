import TT from "./tt"
//绘制图片
function DrawImage(img0, params,scale, cb) {
    scale = scale || 60;
    let imgObj = new Image();
    imgObj.src = img0;
    imgObj.onload = () => {
        TT.ctx.drawImage(imgObj, params[0]*scale, params[1]*scale, params[2]*scale, params[3]*scale);
        if (typeof cb == "function") {
            cb();
        }
    };
}

export{
    DrawImage
}