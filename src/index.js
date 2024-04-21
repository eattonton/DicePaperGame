import pngQr from "./assets/qr.png"
import TT from "./js/tt"
import { TW_AddLoadEvent } from "./js/twloader"
import { Toast, Dialog } from "./js/ttui"
import { DrawImage } from "./js/imageutil"
import { CreateTrapAnts } from "./game/trapant"
import {DrawBingGoFruits} from "./game/fruits"

import pngNumbersflip from "./assets/numbersflip.jpg"
import { LoadMultiImages, TTSprite } from "./js/sprite"

var A4Direction = "v";
const A4Width = 1240;
const A4Height = 1754;

TW_AddLoadEvent(Start);

//////////////////////
//程序入口
////////////////////
function Start() {
    //添加事件
    SetupBtnClick('btn1', () => { GoToUrl(1); });
    SetupBtnClick('btn2', () => { CreateA4(2); });
    SetupBtnClick('btn3', () => { CreateA4(3); });
    SetupBtnClick('btn4', () => { CreateA4(4); });
}

function SetupBtnClick(btnName, cb) {
    document.getElementById(btnName).addEventListener('click', cb);;
}

var m_mode = 1;
var toastDlg;
//跳转
function GoToUrl(category) {
    if (category == 1) {
        location.href = "./dice.html";
    }
}
//生成题目
function CreateA4(mode) {
    m_mode = mode || 1;
    toastDlg = new Toast({
        text: "生成中"
    });
    toastDlg.Show();

    if (m_mode == 2) {
        InitCanvas('v');
        //绘制围住小蚂蚁
        CreateTrapAnts();
        ShowQr([10, 10, 150, 150], 1);
    } else if (m_mode == 3) {
        InitCanvas('w');
        DrawBingGoFruits(()=>{
            //结束绘制
            ShowQr([1500, 1080, 150, 150], 1);
        });
    } else if(m_mode == 4){
        InitCanvas('v');
        LoadMultiImages([pngNumbersflip],(ctxArr)=>{
            let spriteA = new TTSprite(ctxArr[0]);
            DrawImage(spriteA.imgs[0],[0,0,1240,1754],1,()=>{
                ShowQr([10, 10, 150, 150], 1);
            })
        })
        
    }

}
 
function ShowQr(params, scale = 60) {
    setTimeout(() => {
        //二维码
        DrawImage(pngQr, params, scale, () => {
            toastDlg.Close();
            ShowImageDlg();
        });
    }, 10);

}

//旋转画图
function InitCanvas(direction = "v") {
    TT.canvas = document.getElementById("board");
    if (A4Direction != direction) {
        A4Direction = direction;
        if (A4Direction == "w") {
            [TT.canvas.width, TT.canvas.height] = [A4Height, A4Width];
        } else {
            [TT.canvas.width, TT.canvas.height] = [A4Width, A4Height];
        }
    }
    TT.ctx = TT.canvas.getContext("2d");
    TT.width = TT.canvas.width;
    TT.height = TT.canvas.height;

    TT.ctx.fillStyle = "white";
    TT.ctx.fillRect(0, 0, TT.width, TT.height);

}

//显示生成的题目图片，长按保存
function ShowImageDlg() {
    let dlgWidth = 350;
    let dlgHeight = 500;

    if (A4Direction == "w") {
        [dlgWidth, dlgHeight] = [350, 280];
    }

    let strImg = "<img ";
    strImg += "src=" + TT.canvas.toDataURL('png', 1.0);
    strImg += " style='width:" + dlgWidth + "px;height:" + dlgHeight + "px;'></img>";
    let dlg1 = new Dialog({
        title: "长按图片，保存下载",
        text: strImg
    });

    dlg1.Show();
}

