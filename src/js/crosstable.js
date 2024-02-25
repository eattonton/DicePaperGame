import { DrawImage } from "./imageutil";
import { WriteText } from "./textutil";
import {DrawCircle, DrawLine} from "./geometryutil";

//井字形网格
class CCrossTableData {
    posX = 0;
    posY = 0;
    rowNum = 6;
    colNum = 6;
    rowStep = 0.8;
    colStep = 0.8;
    /** @type {number} 线段延长长度 */
    extendLength = 0.8;

    constructor() {

    }

    /**
     * 获得
     */
    GetGridPoints(staX, staY) {
        this.posX = staX;
        this.posY = staY;
        var pts = [];
        for (let i = 0; i < this.rowNum; i++) {
            //按行计算表格中的点坐标
            let x0 = this.posX;
            let y0 = this.posY + i * this.rowStep;
            let x1 = x0 + (this.colNum - 1) * this.colStep;
            let y1 = y0;
            pts.push([x0 - this.extendLength, y0, x1 + this.extendLength, y1]);
        }
        for (let j = 0; j < this.colNum; j++) {
            //按列计算表格中的点坐标
            let x0 = this.posX + j * this.colStep;
            let y0 = this.posY;
            let x1 = x0;
            let y1 = y0 + (this.rowNum - 1) * this.rowStep;
            pts.push([x0, y0 - this.extendLength, x1, y1 + this.extendLength]);
        }
        return pts;
    }

    /**
     * 根据位置范围坐标
     * @param {number} col 
     * @param {number} row 
     */
    GetGridPosition(col,row){
        return [this.posX+col*this.colStep, this.posY+row*this.rowStep];
    }
}

//绘制网格线
class CDrawCrossTable {
    /** @type {CanvasRenderingContext2D} */
    context2D = null;

    constructor(ctx) {
        this.context2D = ctx;
    }

    /**
     * 
     * @param {CCrossTableData} tbData
     * @param {number} x0
     * @param {number} y0
     * @param {*} strColor 
     * @param {*} strStyle 
     */
    DrawTable(tbData, x0, y0, strColor = 'black', strStyle = 'solid') {
        let pts = tbData.GetGridPoints(x0, y0);
        for (let i = 0, len = pts.length; i < len; i++) {
            DrawLine(...pts[i],0.01,0);
            //绘制桩
            DrawCircle(pts[i][0], pts[i][1], 0.05);
            DrawCircle(pts[i][2], pts[i][3], 0.05);
            //绘制序号
            if(parseInt(i/6) == 0){
                WriteText((i % 6 + 1) + "", pts[i][0]-0.8, pts[i][1]+0.2, 0.5);
                WriteText((i % 6 + 1) + "", pts[i][2]+0.3, pts[i][3]+0.2, 0.5);
            }else{
                WriteText((i % 6 + 1) + "", pts[i][0]-0.2, pts[i][1]-0.3, 0.5);
                WriteText((i % 6 + 1) + "", pts[i][2]-0.2, pts[i][3]+0.7, 0.5);
            }
            
        }
    }

    DrawImageAnt1(imgPath,x0,y0){
        //let w1 = 0.56;
        let h1 = 0.5;
        DrawImage(imgPath,[x0-h1*0.75*0.5,y0-h1*0.5,h1*0.75,h1],0,null);
    }

    DrawImageAnt2(imgPath,x0,y0){
        let w1 = 1.5;
        let h1 = 1.5;
        DrawImage(imgPath,[x0+0.8,y0-h1-1,w1,h1],0,null);
    }

    DrawImageLeaf(order,imgPath,x0,y0){
        let w1 = 1;
        let h1 = 1;
        DrawImage(imgPath,[x0-w1-1,y0-h1-0.8,w1,h1],0,null);
        //绘制编号
        WriteText(order,x0-w1-0.4,y0-h1-0.5,1);
    }
 
}

export {
    CCrossTableData,
    CDrawCrossTable
}
