import pngFruit from "../assets/fruits.png"
import pngRussia from "../assets/russia.png"
import pngLogo from "../assets/logo.png"
import { WriteText, SplitByLength } from "../js/textutil"
import { DrawImage } from "../js/imageutil"
import { LoadMultiImages, TTSprite } from "../js/sprite"
import { CDrawTable, CTableData } from "../js/table"
import jsonFruits from "../assets/fruits.json"
import { GetRandQueue, RandomInt } from "../js/math"

var spriteA;
var spriteB;
var spriteLogo;

function DrawBingGoFruits(cb){
    //槟果消消乐
    if (spriteA == undefined) {
        LoadMultiImages([pngFruit, pngRussia, pngLogo], (ctxArr) => {
            spriteA = new TTSprite(ctxArr[0], { w: 118, h: 118 });
            spriteB = new TTSprite(ctxArr[1]);
            spriteLogo = new TTSprite(ctxArr[2]);
            CreateBingGoFruits(cb);
        })
        return;
    }
    CreateBingGoFruits(cb);
}

function CreateBingGoFruits(cb) {
    let fruitIndex = RandomInt(0,17);
    //绘制表格
    let tbData = new CTableData({ size: 8, cwidth: 1.8 });
    let drawTB = new CDrawTable({ data: tbData, x: 2, y: 2 });
    drawTB.DrawTable('style2');
    //填充序号
    let cellIndexArr = GetRandQueue(null, tbData.GetCellNum());
    //表格中填充图像
    for(let i=0;i<cellIndexArr.length;i++){
        let subIdx = 0;
        if(i>=30 && i<=50){
            subIdx = 1;
        }else if(i > 50){
            subIdx = 2;
        }
        drawTB.DrawCellImage(cellIndexArr[i], spriteA.imgs[fruitIndex*3+subIdx]);
    }
    //绘制方块示意图
    let r1 = spriteB.params["h"] / spriteB.params["w"];
    DrawImage(spriteB.imgs[0], [18.5, 8.4, 8, 7 * r1]);
    WriteText("《方块对照表》", 20.5, 8.2, 0.5);
    //计算分数
    DrawImage(spriteA.imgs[fruitIndex*3+0], [2.8, 17.2, 2.0, 2.0]);
    DrawImage(spriteA.imgs[fruitIndex*3+1], [6.2, 17.2, 2.0, 2.0]);
    DrawImage(spriteA.imgs[fruitIndex*3+2], [9.2, 17.2, 2.0, 2.0]);
    WriteText("(    ) X 1 + (    ) X 2 + (    ) X 3 = (     ) 合计", 2.5, 20, 0.7);
    //标题
    WriteText("水果消消乐(打印版)", 19.5, 1.5, 0.8);
    //游戏说明
    let note = "水果好吃营养丰富，是大自然给人类的馈赠。听说有些小朋友不爱吃水果，";
    note += "那可不行哟。我们制作了这款水果主题游戏，让大家在玩的同时，认识这些水果，喜欢上吃水果。";
    note += "《水果消消乐》是一款结合消消乐+俄罗斯方块玩法的骰笔游戏(通过纸笔+骰子玩)。";
    note += "玩家通过骰子获得点数，再通过点数并结合《方块对照表》选择其中一种方块，";
    note += "并把方块画在左侧的棋盘中。直到没法再画方块则游戏结束。最后，玩家";
    note += "通过棋盘下方的计算公式，分类统计不同的水果，累计总成绩，总成绩高者获胜。";
    WriteText(SplitByLength(note,35), 17.3, 2.5, 0.32);
    //水果介绍
    WriteText(SplitByLength(jsonFruits[fruitIndex], 35), 17.3, 6.0, 0.32);
    //logo
    DrawImage(spriteLogo.imgs[0], [18.6, 18.7, 6.2, 1.6]);
    //结束运行函数
    if (typeof cb == "function") {
        cb();
    }
}

export {
    DrawBingGoFruits
}