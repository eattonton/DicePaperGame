// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/qr.png":[function(require,module,exports) {
module.exports = "/qr.28e092c6.png";
},{}],"assets/ant1.png":[function(require,module,exports) {
module.exports = "/ant1.e3b887ef.png";
},{}],"assets/ant2.png":[function(require,module,exports) {
module.exports = "/ant2.f2481154.png";
},{}],"assets/leaf.png":[function(require,module,exports) {
module.exports = "/leaf.0558c079.png";
},{}],"assets/bucket.png":[function(require,module,exports) {
module.exports = "/bucket.06110781.png";
},{}],"js/twloader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TW_APP_VERSION = void 0;
exports.TW_AddLoadEvent = TW_AddLoadEvent;
exports.TW_LoadScriptFromVersion = TW_LoadScriptFromVersion;
exports.TW_SeriesLoadScripts = TW_SeriesLoadScripts;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var TW_APP_VERSION = exports.TW_APP_VERSION = null;
function TW_LoadScriptFromVersion(script, scripts, callback) {
  TW_SeriesLoadScripts([script], function () {
    exports.TW_APP_VERSION = TW_APP_VERSION = APP_VERSION;
    TW_SeriesLoadScripts(scripts, function () {
      if (typeof callback == "function") callback();
    });
  });
}
function TW_SeriesLoadScripts(scripts, callback) {
  if (_typeof(scripts) != "object") var scripts = [scripts];
  if (Array.isArray(scripts) && scripts.length == 0) {
    if (typeof callback == "function") callback();
    return;
  }
  var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  var s = new Array(),
    last = scripts.length - 1,
    recursiveLoad = function recursiveLoad(i) {
      s[i] = document.createElement("script");
      s[i].setAttribute("type", "text/javascript");
      s[i].onload = s[i].onreadystatechange = function () {
        if (! /*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (i != last) recursiveLoad(i + 1);else if (typeof callback == "function") callback();
        }
      };
      if (scripts[i].indexOf('?') > -1) {
        s[i].setAttribute("src", scripts[i] + '&timestamp=' + (TW_APP_VERSION || Math.random()));
      } else {
        s[i].setAttribute("src", scripts[i] + '?timestamp=' + (TW_APP_VERSION || Math.random()));
      }
      HEAD.appendChild(s[i]);
    };
  recursiveLoad(0);
}
function TW_AddLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    };
  }
}
},{}],"js/ttui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIBase = exports.Toast = exports.TextBox = exports.ImagePanel = exports.Dialog = exports.Button = void 0;
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UIBase = exports.UIBase = /*#__PURE__*/function () {
  function UIBase(params) {
    _classCallCheck(this, UIBase);
    this.divBg = null;
    this.htmlObj = null;
    this.params = params || {
      text: '...'
    };
  }
  _createClass(UIBase, [{
    key: "Show",
    value: function Show() {
      //1.创建div节点
      this.divBg = $T.Create();
      //遮罩
      $T.Attribute(this.divBg, "id", "divBg");
      $T.ClassN(this.divBg, 'graybg');
      $T.Add(this.divBg);
    }
  }, {
    key: "Close",
    value: function Close() {
      $T.Del(this.divBg);
    }
  }]);
  return UIBase;
}(); //create
UIBase.prototype.Create = function (tagname) {
  return document.createElement(tagname || "div");
};

//append
UIBase.prototype.Add = function (el, parent) {
  parent = parent || document.body;
  if (el instanceof UIBase) {
    parent.append(el.htmlObj);
  } else {
    parent.append(el);
  }
};

//Attribute
UIBase.prototype.Attribute = function (e, k, v) {
  e.setAttribute(k, v);
};

//className
UIBase.prototype.ClassN = function (el, classname) {
  if (el instanceof UIBase) {
    el.htmlObj.className += classname + " ";
  } else {
    el.className += classname + " ";
  }
};

//delete
UIBase.prototype.Del = function (el) {
  if (el) {
    var parent1 = el.parentNode; //获取父对象
    parent1.removeChild(el); //通过父对象把它删除
  }
};
UIBase.prototype.Html = function (e, txt) {
  e.innerHTML = txt;
};
UIBase.prototype.Click = function (e, that, cb) {
  e.addEventListener("click", function (ev) {
    ev.preventDefault();
    if (typeof cb == "function") {
      cb.bind(that)();
    } else if (typeof cb == "string") {
      that[cb]();
    }
  }, false);
};
var $T = new UIBase();

//TextBox
var TextBox = exports.TextBox = /*#__PURE__*/function (_UIBase) {
  _inherits(TextBox, _UIBase);
  function TextBox(params) {
    var _this;
    _classCallCheck(this, TextBox);
    _this = _callSuper(this, TextBox, [params]);
    _this.Create();
    return _this;
  }

  //创建按钮
  _createClass(TextBox, [{
    key: "Create",
    value: function Create() {
      //button
      this.htmlObj = $T.Create();
      $T.ClassN(this.htmlObj, "textbox");
      $T.Html(this.htmlObj, this.params["text"] || "...");
    }
  }]);
  return TextBox;
}(UIBase); //按钮
var Button = exports.Button = /*#__PURE__*/function (_UIBase2) {
  _inherits(Button, _UIBase2);
  function Button(params) {
    var _this2;
    _classCallCheck(this, Button);
    _this2 = _callSuper(this, Button, [params]);
    _this2.Create();
    return _this2;
  }

  //创建按钮
  _createClass(Button, [{
    key: "Create",
    value: function Create() {
      //button
      this.htmlObj = $T.Create();
      $T.ClassN(this.htmlObj, "button");
      $T.Html(this.htmlObj, this.params["text"] || "but");
      $T.Click(this.htmlObj, this, this.params["click"] || this.btnRun);
    }
  }, {
    key: "btnRun",
    value: function btnRun() {
      console.log("ui button");
    }
  }]);
  return Button;
}(UIBase); //画布 image panel
var ImagePanel = exports.ImagePanel = /*#__PURE__*/function (_UIBase3) {
  _inherits(ImagePanel, _UIBase3);
  function ImagePanel(params) {
    var _this3;
    _classCallCheck(this, ImagePanel);
    _this3 = _callSuper(this, ImagePanel, [params]);
    _this3.canvas = null;
    _this3.ctx = null;
    _this3.width = _this3.params["width"] || 300;
    _this3.height = _this3.params["height"] || 100;
    //创建
    _this3.Create();
    return _this3;
  }
  _createClass(ImagePanel, [{
    key: "Create",
    value: function Create() {
      this.htmlObj = $T.Create("canvas");
      this.canvas = this.htmlObj;
      $T.ClassN(this.canvas, "imagepanel");
      // this.canvas.width = this.width;
      //this.canvas.height = this.height;
      this.ctx = this.canvas.getContext("2d");

      //this.DrawL();
    }

    //测试绘制直线
  }, {
    key: "DrawL",
    value: function DrawL() {
      this.ctx.save(); //保存状态
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "red";
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.stroke();
      this.ctx.restore(); //恢复画布状态
    }
    //绘制图片
  }, {
    key: "DrawImage",
    value: function DrawImage(img0) {
      var that = this;
      var imgObj = new Image();
      imgObj.src = img0;
      imgObj.onload = function () {
        that.ctx.drawImage(imgObj, 0, 0);
      };
    }
    //复制来自其它canvas.ctx的区域
  }, {
    key: "DrawImageData",
    value: function DrawImageData(imgData0) {
      //putImageData用于将图像数据重写至Canvas画布
      this.ctx.putImageData(imgData0, 0, 0);
    }
  }, {
    key: "GetPNG",
    value: function GetPNG() {
      return this.canvas.toDataURL("image/png");
    }
  }]);
  return ImagePanel;
}(UIBase); //对话框
var Dialog = exports.Dialog = /*#__PURE__*/function (_UIBase4) {
  _inherits(Dialog, _UIBase4);
  function Dialog(params) {
    var _this4;
    _classCallCheck(this, Dialog);
    _this4 = _callSuper(this, Dialog, [params]);
    _this4.divForm = null;
    return _this4;
  }

  //创建对话框
  _createClass(Dialog, [{
    key: "Show",
    value: function Show() {
      var _this5 = this;
      _get(_getPrototypeOf(Dialog.prototype), "Show", this).call(this);
      //2.创建对话框
      this.divForm = $T.Create();
      //对话框
      $T.Attribute(this.divForm, "id", 'dlgForm');
      $T.ClassN(this.divForm, 'ttform');
      //title
      var divTitle = $T.Create();
      $T.ClassN(divTitle, "title");
      $T.Html(divTitle, this.params['title'] || "标题");
      $T.Add(divTitle, this.divForm);
      //关闭按钮
      var btnClose = $T.Create();
      $T.ClassN(btnClose, 'close');
      $T.Html(btnClose, 'X');
      $T.Click(btnClose, this, "Close");
      $T.Add(btnClose, divTitle);
      //content
      if (this.params['content'] instanceof UIBase) {
        $T.ClassN(this.params['content'], "content");
        $T.Add(this.params['content'], this.divForm);
      } else {
        var tb1 = new TextBox({
          text: this.params['text'] || "上传中..."
        });
        $T.ClassN(tb1, "content");
        $T.Add(tb1, this.divForm);
      }
      // let panel1 = new ImagePanel();
      // $T.ClassN(panel1,"content");
      // $T.Add(panel1, this.divForm);

      //buttons
      var divButtons = $T.Create();
      $T.ClassN(divButtons, "buttons");
      $T.Add(divButtons, this.divForm);
      //ok button
      var butOk = new Button({
        text: 'Ok',
        click: function click(e) {
          //闭包的作用 传递 this
          _this5.btnOk();
        }
      });
      $T.Add(butOk, divButtons);
      //cancel button
      var butCancel = new Button({
        text: 'Cancel',
        click: function click(e) {
          _this5.btnCancel();
        }
      });
      $T.Add(butCancel, divButtons);
      //添加
      $T.Add(this.divForm);
    }
  }, {
    key: "Close",
    value: function Close() {
      _get(_getPrototypeOf(Dialog.prototype), "Close", this).call(this);
      $T.Del(this.divForm);
    }
  }, {
    key: "btnOk",
    value: function btnOk() {
      this.Close();
    }
  }, {
    key: "btnCancel",
    value: function btnCancel() {
      this.Close();
    }
  }]);
  return Dialog;
}(UIBase); //提示
var Toast = exports.Toast = /*#__PURE__*/function (_UIBase5) {
  _inherits(Toast, _UIBase5);
  function Toast(params) {
    var _this6;
    _classCallCheck(this, Toast);
    _this6 = _callSuper(this, Toast, [params]);
    _this6.divForm = null;
    return _this6;
  }

  //创建对话框
  _createClass(Toast, [{
    key: "Show",
    value: function Show() {
      _get(_getPrototypeOf(Toast.prototype), "Show", this).call(this);
      //2.创建对话框
      this.divForm = $T.Create('div');
      //对话框
      $T.Attribute(this.divForm, "id", 'dlgForm');
      $T.ClassN(this.divForm, 'ttform');
      $T.Html(this.divForm, this.params['text']);
      this.divForm.style.height = "100px";
      this.divForm.style.width = "200px";
      //添加
      $T.Add(this.divForm);
    }
  }, {
    key: "Close",
    value: function Close() {
      _get(_getPrototypeOf(Toast.prototype), "Close", this).call(this);
      $T.Del(this.divForm);
    }
  }]);
  return Toast;
}(UIBase);
},{}],"js/imageutil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawImage = DrawImage;
//绘制图片
function DrawImage(img0, params, scale, cb) {
  scale = scale || 60;
  var imgObj = new Image();
  imgObj.src = img0;
  imgObj.onload = function () {
    window.game.ctx.drawImage(imgObj, params[0] * scale, params[1] * scale, params[2] * scale, params[3] * scale);
    if (typeof cb == "function") {
      cb();
    }
  };
}
},{}],"js/textutil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteText = WriteText;
exports.WriteTextsH = WriteTextsH;
//成行显示
function WriteTextsH(arr1, x, y, hei, scale) {
  var tbWid = 0;
  var x2 = x;
  var arr2 = [];
  for (var i = 0; i < arr1.length; ++i) {
    x2 = x2 + tbWid;
    var oTxt = WriteText(arr1[i], x2, y, hei, scale);
    //计算宽度
    tbWid = arr1[i].length * hei * 0.8;
    arr2.push(oTxt);
  }
  return arr2;
}

//绘制题目
function WriteText(str1, x, y, hei, scale) {
  scale = scale || 60;
  hei = hei * scale;
  var fontHei = hei + "px";
  window.game.ctx.font = "normal " + fontHei + " Arial";
  window.game.ctx.fillStyle = "#000000";
  //window.game.ctx.fillText(str1, x * scale, y * scale);
  var lines = str1.split('\n');
  var lineHei = hei + 10;
  for (var j = 0; j < lines.length; j++) {
    window.game.ctx.fillText(lines[j], x * scale, y * scale + j * lineHei);
  }
  return {
    txt: str1,
    x: x,
    y: y,
    h: hei,
    s: scale
  };
}
},{}],"js/geometryutil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawCircle = DrawCircle;
exports.DrawLine = DrawLine;
//绘制直线
function DrawLine(x1, y1, x2, y2, wid, scale) {
  var strColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "black";
  var strStyle = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "solid";
  scale = scale || 60;
  wid = wid || 0.1;
  window.game.ctx.lineWidth = wid * scale;
  window.game.ctx.strokeStyle = strColor || "black";
  //开始一个新的绘制路径
  window.game.ctx.beginPath();
  if (strStyle == "dash") {
    window.game.ctx.setLineDash([0.1 * scale, 0.3 * scale]); // 设置虚线样式
    window.game.ctx.lineDashOffset = 0; // 设置虚线起始偏移量
  } else {
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
},{}],"js/crosstable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CDrawCrossTable = exports.CCrossTableData = void 0;
var _imageutil = require("./imageutil");
var _textutil = require("./textutil");
var _geometryutil = require("./geometryutil");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//井字形网格
var CCrossTableData = exports.CCrossTableData = /*#__PURE__*/function () {
  function CCrossTableData() {
    _classCallCheck(this, CCrossTableData);
    _defineProperty(this, "posX", 0);
    _defineProperty(this, "posY", 0);
    _defineProperty(this, "rowNum", 6);
    _defineProperty(this, "colNum", 6);
    _defineProperty(this, "rowStep", 0.8);
    _defineProperty(this, "colStep", 0.8);
    /** @type {number} 线段延长长度 */
    _defineProperty(this, "extendLength", 0.8);
  }

  /**
   * 获得
   */
  _createClass(CCrossTableData, [{
    key: "GetGridPoints",
    value: function GetGridPoints(staX, staY) {
      this.posX = staX;
      this.posY = staY;
      var pts = [];
      for (var i = 0; i < this.rowNum; i++) {
        //按行计算表格中的点坐标
        var x0 = this.posX;
        var y0 = this.posY + i * this.rowStep;
        var x1 = x0 + (this.colNum - 1) * this.colStep;
        var y1 = y0;
        pts.push([x0 - this.extendLength, y0, x1 + this.extendLength, y1]);
      }
      for (var j = 0; j < this.colNum; j++) {
        //按列计算表格中的点坐标
        var _x = this.posX + j * this.colStep;
        var _y = this.posY;
        var _x2 = _x;
        var _y2 = _y + (this.rowNum - 1) * this.rowStep;
        pts.push([_x, _y - this.extendLength, _x2, _y2 + this.extendLength]);
      }
      return pts;
    }

    /**
     * 根据位置范围坐标
     * @param {number} col 
     * @param {number} row 
     */
  }, {
    key: "GetGridPosition",
    value: function GetGridPosition(col, row) {
      return [this.posX + col * this.colStep, this.posY + row * this.rowStep];
    }
  }]);
  return CCrossTableData;
}(); //绘制网格线
var CDrawCrossTable = exports.CDrawCrossTable = /*#__PURE__*/function () {
  function CDrawCrossTable(ctx) {
    _classCallCheck(this, CDrawCrossTable);
    /** @type {CanvasRenderingContext2D} */
    _defineProperty(this, "context2D", null);
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
  _createClass(CDrawCrossTable, [{
    key: "DrawTable",
    value: function DrawTable(tbData, x0, y0) {
      var strColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';
      var strStyle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'solid';
      var pts = tbData.GetGridPoints(x0, y0);
      for (var i = 0, len = pts.length; i < len; i++) {
        _geometryutil.DrawLine.apply(void 0, _toConsumableArray(pts[i]).concat([0.01, 0]));
        //绘制桩
        (0, _geometryutil.DrawCircle)(pts[i][0], pts[i][1], 0.05);
        (0, _geometryutil.DrawCircle)(pts[i][2], pts[i][3], 0.05);
        //绘制序号
        if (parseInt(i / 6) == 0) {
          (0, _textutil.WriteText)(i % 6 + 1 + "", pts[i][0] - 0.8, pts[i][1] + 0.2, 0.5);
          (0, _textutil.WriteText)(i % 6 + 1 + "", pts[i][2] + 0.3, pts[i][3] + 0.2, 0.5);
        } else {
          (0, _textutil.WriteText)(i % 6 + 1 + "", pts[i][0] - 0.2, pts[i][1] - 0.3, 0.5);
          (0, _textutil.WriteText)(i % 6 + 1 + "", pts[i][2] - 0.2, pts[i][3] + 0.7, 0.5);
        }
      }
    }
  }, {
    key: "DrawImageAnt1",
    value: function DrawImageAnt1(imgPath, x0, y0) {
      //let w1 = 0.56;
      var h1 = 0.5;
      (0, _imageutil.DrawImage)(imgPath, [x0 - h1 * 0.75 * 0.5, y0 - h1 * 0.5, h1 * 0.75, h1], 0, null);
    }
  }, {
    key: "DrawImageAnt2",
    value: function DrawImageAnt2(imgPath, x0, y0) {
      var w1 = 1.5;
      var h1 = 1.5;
      (0, _imageutil.DrawImage)(imgPath, [x0 + 0.8, y0 - h1 - 1, w1, h1], 0, null);
    }
  }, {
    key: "DrawImageLeaf",
    value: function DrawImageLeaf(order, imgPath, x0, y0) {
      var w1 = 1;
      var h1 = 1;
      (0, _imageutil.DrawImage)(imgPath, [x0 - w1 - 1, y0 - h1 - 0.8, w1, h1], 0, null);
      //绘制编号
      (0, _textutil.WriteText)(order, x0 - w1 - 0.4, y0 - h1 - 0.5, 1);
    }
  }]);
  return CDrawCrossTable;
}();
},{"./imageutil":"js/imageutil.js","./textutil":"js/textutil.js","./geometryutil":"js/geometryutil.js"}],"js/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetRandQueue = GetRandQueue;
exports.GetRandQueueInRange = GetRandQueueInRange;
exports.RandomInt = RandomInt;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
//生成随机值
function RandomInt(min, max) {
  var span = max - min + 1;
  var result = Math.floor(Math.random() * span + min);
  return result;
}

//在范围内，生成一定数量不重复的随机数
function GetRandQueueInRange(n, min, max) {
  var arr = [];
  var flagUnique = true; //是否需要唯一
  if (n >= max - min) {
    flagUnique = false;
  }
  // 在此处补全代码
  for (var i = 0; i < n; i++) {
    var num1 = RandomInt(min, max);
    if (flagUnique) {
      if (arr.indexOf(num1) == -1) {
        //去除重复项
        arr.push(num1);
      } else {
        i--;
      }
    } else {
      arr.push(num1);
    }
  }
  return arr;
}

//生成随机队列
function GetRandQueue(array, size) {
  if (!array) {
    array = new Array();
    for (var i = 0; i < size; i++) {
      array[i] = i;
    }
  }
  var res = [],
    random1;
  var array2 = _toConsumableArray(array);
  while (array2.length > 0 && res.length <= size) {
    random1 = Math.floor(Math.random() * array2.length);
    res.push(array2[random1]);
    array2.splice(random1, 1);
  }
  return res;
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _qr = _interopRequireDefault(require("./assets/qr.png"));
var _ant = _interopRequireDefault(require("./assets/ant1.png"));
var _ant2 = _interopRequireDefault(require("./assets/ant2.png"));
var _leaf = _interopRequireDefault(require("./assets/leaf.png"));
var _bucket = _interopRequireDefault(require("./assets/bucket.png"));
var _twloader = require("./js/twloader");
var _ttui = require("./js/ttui");
var _crosstable = require("./js/crosstable");
var _textutil = require("./js/textutil");
var _imageutil = require("./js/imageutil");
var _math = require("./js/math");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var TT = {};
window.game = TT;
(0, _twloader.TW_AddLoadEvent)(Start);

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
  SetupBtnClick('btn1', function () {
    GoToUrl(1);
  });
  SetupBtnClick('btn2', function () {
    CreateA4(2);
  });
}
function SetupBtnClick(btnName, cb) {
  document.getElementById(btnName).addEventListener('click', cb);
  ;
}
var m_hard = 1;
var m_mode = 1;
var m_move = 1; //移动次数

/** @type {CDrawCrossTable} */
var m_DrawTB = null; //绘制对象

//跳转
function GoToUrl(category) {
  if (category == 1) {
    location.href = "./dice.html";
  }
}
//生成题目
function CreateA4(hard, mode, move) {
  m_hard = hard;
  m_mode = mode || 1;
  m_move = move || 1;
  var toastDlg = new _ttui.Toast({
    text: "生成中"
  });
  toastDlg.Show();
  TT.ctx.fillStyle = "white";
  TT.ctx.fillRect(0, 0, TT.width, TT.height);
  //title
  (0, _textutil.WriteText)("围住小蚂蚁", 7.5, 1.5, 1.0);
  //绘制内容
  CreateTrapAnts();
  //二维码
  (0, _imageutil.DrawImage)(_qr.default, [10, 10, 150, 150], 1, function () {
    toastDlg.Close();
    ShowImageDlg();
  });
}

//显示生成的题目图片，长按保存
function ShowImageDlg() {
  var strImg = "<img ";
  strImg += "src=" + TT.canvas.toDataURL('png', 1.0);
  strImg += " style='width:350px;height:500px;'></img>";
  var dlg1 = new _ttui.Dialog({
    title: "长按图片，保存下载",
    text: strImg
  });
  dlg1.Show();
}
function CreateTrapAnts() {
  //绘制对象
  m_DrawTB = new _crosstable.CDrawCrossTable(TT.ctx);
  //生成题目
  var tbData = new _crosstable.CCrossTableData();
  var gameData = [['A', 3], ['B', 3], ['C', 4], ['D', 4]];
  for (var i = 0; i <= 3; i++) {
    var _m_DrawTB2, _m_DrawTB3;
    var posx = i % 2 == 1 ? 13 : 3.3;
    var posy = parseInt(i / 2) == 1 ? 13.4 : 5;
    m_DrawTB.DrawTable(tbData, posx, posy);
    //随机产生一个数组
    var posArr = (0, _math.GetRandQueueInRange)(gameData[i][1], 0, 35);
    posArr.forEach(function (val) {
      var _m_DrawTB;
      (_m_DrawTB = m_DrawTB).DrawImageAnt1.apply(_m_DrawTB, [_ant.default].concat(_toConsumableArray(tbData.GetGridPosition(val % 6, parseInt(val / 6)))));
    });
    (_m_DrawTB2 = m_DrawTB).DrawImageAnt2.apply(_m_DrawTB2, [_ant2.default].concat(_toConsumableArray(tbData.GetGridPosition(5, 0))));
    (_m_DrawTB3 = m_DrawTB).DrawImageLeaf.apply(_m_DrawTB3, [gameData[i][0], _leaf.default].concat(_toConsumableArray(tbData.GetGridPosition(0, 0))));
  }
  //写规则
  var rule = "    小时候蹲在家门口拨弄着地上的一群小蚂蚁，能玩一下午。《围住小蚂蚁》参考\n";
  rule += "“围住疯狂的公牛”开发，一款PNP(打印即玩)游戏。把它打印出来，用河(直线)围住\n";
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
  (0, _textutil.WriteText)(rule, 1, 20.2, 0.3);

  //添加水桶道具
  (0, _textutil.WriteText)("水桶道具", 13.5, 20.2, 0.6);
  (0, _imageutil.DrawImage)(_bucket.default, [14, 20.5, 1, 1 * 1.8], 0, null);
  (0, _imageutil.DrawImage)(_bucket.default, [16, 20.5, 1, 1 * 1.8], 0, null);
  (0, _imageutil.DrawImage)(_bucket.default, [18, 20.5, 1, 1 * 1.8], 0, null);
  //统计分数
  (0, _textutil.WriteText)("A-->(  ) X 3 + (  )=(   )", 13.5, 23, 0.6);
  (0, _textutil.WriteText)("B-->(  ) X 3 + (  )=(   )", 13.5, 23.8, 0.6);
  (0, _textutil.WriteText)("C-->(  ) X 4 + (  )=(   )", 13.5, 24.6, 0.6);
  (0, _textutil.WriteText)("D-->(  ) X 4 + (  )=(   )", 13.5, 25.4, 0.6);
  (0, _textutil.WriteText)("被围蚂蚁", 14.4, 26, 0.3);
  (0, _textutil.WriteText)("未用黑点", 16.8, 26, 0.3);
  (0, _textutil.WriteText)("剩余水\n桶道具", 13.5, 26.8, 0.5);
  (0, _textutil.WriteText)("(  ) X 3 =(   )", 15.8, 27.2, 0.6);
  (0, _textutil.WriteText)("总分...(     )", 15.2, 28.6, 0.8);
}
},{"./assets/qr.png":"assets/qr.png","./assets/ant1.png":"assets/ant1.png","./assets/ant2.png":"assets/ant2.png","./assets/leaf.png":"assets/leaf.png","./assets/bucket.png":"assets/bucket.png","./js/twloader":"js/twloader.js","./js/ttui":"js/ttui.js","./js/crosstable":"js/crosstable.js","./js/textutil":"js/textutil.js","./js/imageutil":"js/imageutil.js","./js/math":"js/math.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14099" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map