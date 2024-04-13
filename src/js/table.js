import { DrawImage } from "./imageutil";
import { WriteText } from "./textutil";
import { DrawCircle, DrawLine, DrawRect, DrawSquare } from "./geometryutil";

class CTablePoint {
    x = 0;
    y = 0;
    constructor() { }
}
class CTableCellData {
    width = 0;
    height = 0;
    row = 0;
    col = 0;
    posx = 0;
    posy = 0;
    //填充的文字
    text = "";
    //填充的颜色
    fillColor = ""
    borderColor = "black"

    constructor(i, j, w, h) {
        this.row = i;
        this.col = j;
        this.width = w;
        this.height = h;

        this.posx = this.width * i;
        this.posy = this.height * j;
    }

    GetPoints(x0, y0) {
        x0 = x0 + this.posx;
        y0 = y0 + this.posy;
        let pts = [];
        pts.push({ x: x0, y: y0 });
        pts.push({ x: x0 + this.width, y: y0 });
        pts.push({ x: x0 + this.width, y: y0 + this.height });
        pts.push({ x: x0, y: y0 + this.height });
        pts.push({ x: x0, y: y0 });
        return pts;
    }

    GetRect(x0, y0) {
        return [x0 + this.posx, y0 + this.posy, this.width, this.height];
    }
}

/**
 * 表格数据结构
 */
class CTableData {
    /** @type {CTableCellData[]} */
    cells = [];
    size = 1;
    col = 1;
    row = 1;
    width = 1;
    height = 1;
    cwidth = 1;
    rwidth = 1;

    constructor(params) {
        this.size = this.col = this.row = params["size"] || 1;
        if ("col" in params) {
            this.col = params["col"];
        }
        if ("row" in params) {
            this.row = params["row"];
        }
        if ("width" in params) {
            this.width = this.height = params["width"];
            this.height = params["height"] || this.height;
            this.cwidth = this.width / this.col;
            this.cheight = this.height / this.row;
        }
        if ("cwidth" in params) {
            this.cwidth = this.cheight = params["cwidth"];
            this.cheight = params["cheight"] || this.cheight;
            this.width = this.cwidth * this.col;
            this.height = this.cheight * this.row;
        }
        //划分单元格
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.cells.push(new CTableCellData(j, i, this.cwidth, this.cheight));
            }
        }
    }

    GetCellNum() {
        return this.col * this.row;
    }

    GetCellByIndex(idx) {
        return this.cells[idx];
    }

    GetCellByRowCol(r, c) {
        let idx = r * this.row + c;
        return this.GetCellByIndex(idx);
    }

    GetCellPointsByIndex(idx, x0, y0) {
        return this.GetCellByIndex(idx).GetPoints(x0, y0);
    }

    GetCellPointsByRowCol(r, c, x0, y0) {
        return this.GetCellByIndex(r, c).GetPoints(x0, y0);
    }

    SetCellColor(idx, fillColor) {
        this.GetCellByIndex(idx).fillColor = fillColor;
    }

    /**
     * 按行读取单元格
     * @param {*} iRow 
     * @returns 
     */
    GetCellsByRow(iRow) {
        let arr1 = [];
        for (let i = 0; i < this.col; i++) {
            //按列读取
            let idx = this.col * iRow + i;
            arr1.push(this.GetCellByIndex(idx));
        }
        return arr1;
    }

    /**
     * 按列读取单元格
     * @param {*} iCol 
     * @returns 
     */
    GetCellsByCol(iCol) {
        let arr1 = [];
        for (let i = 0; i < this.row; i++) {
            //按行读取
            let idx = this.col * i + iCol;
            arr1.push(this.GetCellByIndex(idx));
        }
        return arr1;
    }

}

/**
 * 绘制表格
 */
class CDrawTable {
    /** @type {CTableData} */
    m_tbData = null;
    m_posX = 0;
    m_posY = 0;

    constructor(params) {
        this.m_tbData = params["data"];
        this.posx = params["x"];
        this.posy = params["y"];
    }

    /**
     * 
     * @param {*} strStyle 
     */
    DrawTable(strStyle = 'solid') {
        for (let i = 0; i < this.m_tbData.GetCellNum(); i++) {
            let cell = this.m_tbData.GetCellByIndex(i);
            if (strStyle == "style2") {
                this.DrawTableStyle2(cell.GetPoints(this.posx, this.posy));
            } else {
                DrawRect(...cell.GetRect(this.posx, this.posy), 0.01, 0, null, cell.fillColor);
            }
        }
    }
    /**
     * 
     * @param {CTablePoint[]} pts 
     * @param {*} strColor 
     * @param {*} strStyle 
     */
    DrawTableStyle2(pts, strColor = "black", strStyle = "solid") {
        let segLen = 0.32;
        let lineWidth = 0.03;
        DrawLine(pts[0].x, pts[0].y, pts[0].x + segLen, pts[0].y, lineWidth);
        DrawLine(pts[0].x, pts[0].y, pts[0].x, pts[0].y + segLen, lineWidth);

        DrawLine(pts[1].x, pts[1].y, pts[1].x - segLen, pts[1].y, lineWidth);
        DrawLine(pts[1].x, pts[1].y, pts[1].x, pts[1].y + segLen, lineWidth);

        DrawLine(pts[2].x, pts[2].y, pts[2].x - segLen, pts[2].y, lineWidth);
        DrawLine(pts[2].x, pts[2].y, pts[2].x, pts[2].y - segLen, lineWidth);

        DrawLine(pts[3].x, pts[3].y, pts[3].x + segLen, pts[3].y, lineWidth);
        DrawLine(pts[3].x, pts[3].y, pts[3].x, pts[3].y - segLen, lineWidth);
    }

    DrawCellImage(idx, imgObj) {
        let cell = this.m_tbData.GetCellByIndex(idx);
        let sizes = cell.GetRect(this.posx, this.posy);
        sizes[0] = sizes[0]+0.2;
        sizes[1] = sizes[1]+0.2;
        sizes[2] = sizes[2]*0.8;
        sizes[3] = sizes[3]*0.8;
        DrawImage(imgObj, sizes, 60);
    }
}

export {
    CTableCellData,
    CTableData,
    CDrawTable
}