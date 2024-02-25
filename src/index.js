import pngQr from "./assets/qr.png"
import pngAnt1 from "./assets/ant1.png"
import pngAnt2 from "./assets/ant2.png"
import pngLeaf from "./assets/leaf.png"
import pngBucket from "./assets/bucket.png"
import { TW_AddLoadEvent } from "./js/twloader"
import { Toast, Dialog } from "./js/ttui"
import { CCrossTableData, CDrawCrossTable } from "./js/crosstable"
import { WriteText } from "./js/textutil"
import { DrawImage } from "./js/imageutil"
import { GetRandQueueInRange } from "./js/math"

const TT = {};
window.game = TT;

TW_AddLoadEvent(Start);

//游戏规则

//////////////////////
//程序入口
////////////////////
function Start() {
    TT.canvas = document.getElementById("board");
    TT.ctx = TT.canvas.getContext("2d");
    TT.width = TT.canvas.width;
    TT.height = TT.canvas.height;

    //添加事件
    SetupBtnClick('btn1', () => { GoToUrl(1); });
    SetupBtnClick('btn2', () => { CreateA4(2); });
 
}

function SetupBtnClick(btnName, cb) {
    document.getElementById(btnName).addEventListener('click', cb);;
}
 
var m_hard = 1;
var m_mode = 1;
var m_move = 1;   //移动次数

/** @type {CDrawCrossTable} */
var m_DrawTB = null;  //绘制对象

//跳转
function GoToUrl(category){
    if(category == 1){
        location.href = "./dice.html";
    }
}
//生成题目
function CreateA4(hard, mode, move) {
    m_hard = hard;
    m_mode = mode || 1;
    m_move = move || 1;
    var toastDlg = new Toast({
        text: "生成中"
    });
    toastDlg.Show();
    TT.ctx.fillStyle = "white";
    TT.ctx.fillRect(0, 0, TT.width, TT.height);
    //title
    WriteText("围住小蚂蚁", 7.5, 1.5, 1.0);
    //绘制内容
    CreateTrapAnts();
    //二维码
    DrawImage(pngQr, [10, 10, 150, 150],1, () => {
        toastDlg.Close();
        ShowImageDlg();
    });
}

//显示生成的题目图片，长按保存
function ShowImageDlg() {
    let strImg = "<img ";
    strImg += "src=" + TT.canvas.toDataURL('png', 1.0);
    strImg += " style='width:350px;height:500px;'></img>";
    let dlg1 = new Dialog({
        title: "长按图片，保存下载",
        text: strImg
    });

    dlg1.Show();
}

function CreateTrapAnts(){
    //绘制对象
    m_DrawTB = new CDrawCrossTable(TT.ctx);
    //生成题目
    let tbData = new CCrossTableData();
    let gameData = [['A',3],['B',3],['C',4],['D',4]];
    for(let i=0;i<=3;i++){
        let posx = i%2==1?13:3.3;
        let posy = parseInt(i/2)==1?13.4:5;
        m_DrawTB.DrawTable(tbData,posx,posy);
        //随机产生一个数组
        let posArr = GetRandQueueInRange(gameData[i][1],0,35);
        posArr.forEach((val)=>{
            m_DrawTB.DrawImageAnt1(pngAnt1,...tbData.GetGridPosition(val%6,parseInt(val/6)));
        })
        m_DrawTB.DrawImageAnt2(pngAnt2,...tbData.GetGridPosition(5,0));
        m_DrawTB.DrawImageLeaf(gameData[i][0],pngLeaf,...tbData.GetGridPosition(0,0));
    }
    //写规则
    let rule = "    小时候蹲在家门口拨弄着地上的一群小蚂蚁，能玩一下午。《围住小蚂蚁》参考\n";
    rule +="“围住疯狂的公牛”开发，一款PNP(打印即玩)游戏。把它打印出来，用河(直线)围住\n";
    rule += "方格中的小蚂蚁。规则就这么简单,让我们像小时候一样无忧无虑的玩吧。\n";
    rule += "1、画小河\n";
    rule += "    在每个回合掷3个骰子，并从中选择2个。骰子点数代表周围的水桶(黑点)编号。\n";
    rule += "从一边一个水桶编号到另一边水桶编号结束，画一条河(直线)。请注意，小河不能\n";
    rule += "穿过小蚂蚁中心点！正常每个水桶只能用一次。\n";
    rule += "2、有相同点数\n";
    rule += "    相同点数对应的水桶编号能用两次(但不超过两次)。对于两个一样的骰子，使用\n";
    rule += "第三个骰子作为另一边。\n";
    rule += "3、跳过\n";
    rule += "    每个水桶(黑点)最多两条小河(直线)，否则无法再使用，或则选择放弃这次投掷，\n";
    rule += "就需要划掉一个“水桶道具”，如果所有“水桶道具”都划完，当前方格结束。\n";
    rule += "4、游戏结束\n";
    rule += "    每只小蚂蚁完全单独封闭在小河内(直线)，当小蚂蚁无法再被围，就完成一个方格。\n";
    rule += "完成最后一个方格D，游戏结束。\n";
    rule += "5、计算分数\n";
    rule += "   被围的蚂蚁数，剩余的水桶(黑点)数，剩余的水桶道具，按照分数公式统计。\n";
    rule += "未完成的方格只统计被围的蚂蚁数，未使用的水桶数不计入成绩。";
    WriteText(rule, 1, 20.2, 0.3);

    //添加水桶道具
    WriteText("水桶道具", 13.5, 20.2, 0.6);
    DrawImage(pngBucket,[14,20.5,1,1*1.8],0,null);
    DrawImage(pngBucket,[16,20.5,1,1*1.8],0,null);
    DrawImage(pngBucket,[18,20.5,1,1*1.8],0,null);
    //统计分数
    WriteText("A-->(  ) X 3 + (  )=(   )", 13.5, 23, 0.6);
    WriteText("B-->(  ) X 3 + (  )=(   )", 13.5, 23.8, 0.6);
    WriteText("C-->(  ) X 4 + (  )=(   )", 13.5, 24.6, 0.6);
    WriteText("D-->(  ) X 4 + (  )=(   )", 13.5, 25.4, 0.6);
    WriteText("被围蚂蚁", 14.4, 26, 0.3);
    WriteText("未用黑点", 16.8, 26, 0.3);
    WriteText("剩余水\n桶道具", 13.5, 26.8, 0.5);
    WriteText("(  ) X 3 =(   )", 15.8, 27.2, 0.6);
    WriteText("总分...(     )", 15.2, 28.6, 0.8);
}