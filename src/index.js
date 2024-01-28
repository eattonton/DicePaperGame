import pngDices from "./assets/dice.png"
import mp3DiceOnDesk from "./assets/dice_on_desk.mp3"
//封装选择器
function $(name) {
    //return document.querySelector(name);
    let eles = document.querySelectorAll(name);
    if (eles.length == 1) {
        return eles[0];
    }
    return eles;
}

var m_imgDatas = [];
var m_diceNumber = 1;
var m_humanTotal = 1;
//var m_humanCurrent = 0;
var m_rollTimes = 0;
var m_scoreTotal = 0;

window.onload = () => {
    const buttons = $('.btnSel');
    buttons.forEach(btn => btn.onclick=()=>{
        SelectHumanNum(btn);
    });

    var canvas = $("#canvas1");
    var ctx = canvas.getContext("2d");

    var img1 = new Image();
    img1.src = pngDices;
    img1.onload = () => {
        canvas.width = img1.width;
        canvas.height = img1.height;
        ctx.drawImage(img1, 0, 0, img1.width, img1.height);
        // 提取部分图像，例如左上角 100x100 像素的区域
        m_imgDatas = GetImages(ctx, 100, 100);
        AddImage(0, m_imgDatas[0]);
    }

    //添加btn事件
    $("#startBtn").onclick = () => {
        m_scoreTotal = 0;
        for (let i = 0; i < m_diceNumber; i++) {
            AddAnimation(i, m_imgDatas, [6, 7, 8], ShowDiceResult);
        }
        $("#music").play();
        $('#player').textContent = `当前玩家：${m_rollTimes % m_humanTotal + 1} 号`;
        ++m_rollTimes;
    }
    $("#addLineBtn").onclick = () => {
        AddDiceLine(m_diceNumber++);
    }

    //添加声音
    $("#music").src = mp3DiceOnDesk;
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} sw 
 * @param {number} sh 
 */
function GetImages(ctx, sw, sh) {
    let imgDatas = [];
    for (let sx = 0; sx < ctx.canvas.width; sx += sw) {
        for (let sy = 0; sy < ctx.canvas.height; sy += sh) {
            let imgData = ctx.getImageData(sx, sy, sw, sh);
            imgDatas.push(imgData);
        }
    }

    return imgDatas;
}

/**
 * 插入一个Sprite
 * @param {number} idx 
 * @param {ImageData} imgData 
 */
function AddImage(idx, imgData) {
    var canvas = $("#dice" + idx);
    /** @type {CanvasRenderingContext2D} */
    var ctx = canvas.getContext("2d");

    canvas.width = imgData.width;
    canvas.height = imgData.height;

    ctx.putImageData(imgData, 0, 0);

}

/**
 * 
 * @param {*} idx 
 * @param {*} imgDatas 
 * @param {Array} frames 
 */
function AddAnimation(idx, imgDatas, frames, cb) {
    var canvas = document.getElementById("dice" + idx);
    /** @type {CanvasRenderingContext2D} */
    var ctx = canvas.getContext("2d");

    var diceNum = Math.floor(Math.random() * 6);//产生随机数0-5

    let frameIdx = 0;
    let frameNum = frames.length;
    let timeSeconds = 0;
    let timeTotal = 2000;
    let timeId = setInterval(() => {
        let imgData = imgDatas[frames[(frameIdx++) % frameNum]];
        ctx.putImageData(imgData, 0, 0);
        timeSeconds += 1000 / frameNum;
        if (timeSeconds >= timeTotal) {
            clearInterval(timeId);
            AddImage(idx, imgDatas[diceNum]);
            if (cb && typeof cb === 'function') {
                cb(idx, diceNum);
            }
        }
    }, 1000 / frameNum);
    
}

/**
 * 随机结束后的回调函数
 * @param {number} diceNum 
 */
function ShowDiceResult(idx, diceNum) {
    $('#diceNum' + idx).textContent = `骰子${idx + 1} = ${diceNum + 1}`;
    m_scoreTotal += diceNum+1;
    $('#total').textContent =`合计点数：${m_scoreTotal} 点`;
}

function AddDiceLine(id) {
    let divLineItem = document.createElement('div');
    divLineItem.className = "lineItem";
    $("#diceContainer").appendChild(divLineItem);

    let divCanvas = document.createElement('div');
    divLineItem.appendChild(divCanvas);
    let canvasEle = document.createElement('canvas');
    divCanvas.appendChild(canvasEle);
    canvasEle.id = "dice" + id;
    canvasEle.className = "diceImg";

    let divDiceNum = document.createElement('div');
    divLineItem.appendChild(divDiceNum);
    divDiceNum.className = "itemResult";
    divDiceNum.id = "diceNum" + id;
    divDiceNum.textContent = "骰子" + (id + 1) + " =";

    //添加骰子
    AddImage(id, m_imgDatas[0]);
}

function SelectHumanNum(button) {
    const buttons = $('.btnSel');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    //获得人数
    m_humanTotal =parseInt(button.getAttribute('value'));
 
    m_scoreTotal = 0;
    m_rollTimes = 0;
}


