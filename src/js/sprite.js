function LoadMultiImages(imageUrls,cb) {
    Promise.all(imageUrls.map(LoadOneImage))  
    .then(images => {  
        if (typeof cb == "function") {
            cb(images);
        }
    })  
    .catch(error => {
        console.error('加载图片时出错:', error);  
    });
}

function LoadOneImage(imageSrc) {
    let promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            // 创建canvas元素
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // 设置不可见
            canvas.style.visibility = 'hidden';
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            //const ctx = canvas.getContext('2d');
            // 绘制图片到canvas
            ctx.drawImage(img, 0, 0);
            resolve(ctx);
        }
        img.src = imageSrc;
    });

    return promise;
}

function DrawImageData(imgData) {
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    // 设置不可见
    canvas.style.visibility = 'hidden';
    const ctx = canvas.getContext('2d');
    // 绘制图片到canvas
    ctx.putImageData(imgData, 0, 0);

    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
}

class TTSprite {
    /** @type {Array<ImageData>} */
    imgs = [];
    params = { n: 0, w: 0, h: 0 };
    constructor(ctx, params) {
        if(params){
            this.params = params;
            this.SplitImages(ctx.canvas.width, ctx.canvas.height, ctx);
        }else{
            this.params["n"] = 1;
            this.params["w"] = ctx.canvas.width;
            this.params["h"] = ctx.canvas.height;
            this.imgs.push(ctx.canvas.toDataURL('image/png'));
        }
    }

    SplitImages(imgW, imgH, ctx) {
        let cellW = this.params["w"];
        let cellH = this.params["h"];
        for (let i = 0; i < 100; i++) {
            if (cellH * i >= imgH) break;
            for (let j = 0; j < 100; j++) {
                if (cellW * j >= imgW) break;
                //this.imgs.push(ctx.getImageData(cellW * j, cellH * i, cellW, cellH));
                let imgData = ctx.getImageData(cellW * j, cellH * i, cellW, cellH);
                this.imgs.push(DrawImageData(imgData));
            }
        }

    }
}

export {
    TTSprite,
    LoadOneImage,
    LoadMultiImages
}