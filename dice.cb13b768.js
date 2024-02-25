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
})({"assets/dice.png":[function(require,module,exports) {
module.exports = "/dice.34e9cd0b.png";
},{}],"assets/dice_on_desk.mp3":[function(require,module,exports) {
module.exports = "/dice_on_desk.6a7c7740.mp3";
},{}],"game/dice.js":[function(require,module,exports) {
"use strict";

var _dice = _interopRequireDefault(require("../assets/dice.png"));
var _dice_on_desk = _interopRequireDefault(require("../assets/dice_on_desk.mp3"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//封装选择器
function $(name) {
  //return document.querySelector(name);
  var eles = document.querySelectorAll(name);
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
window.onload = function () {
  var buttons = $('.btnSel');
  buttons.forEach(function (btn) {
    return btn.onclick = function () {
      SelectHumanNum(btn);
    };
  });
  var canvas = $("#canvas1");
  var ctx = canvas.getContext("2d");
  var img1 = new Image();
  img1.src = _dice.default;
  img1.onload = function () {
    canvas.width = img1.width;
    canvas.height = img1.height;
    ctx.drawImage(img1, 0, 0, img1.width, img1.height);
    // 提取部分图像，例如左上角 100x100 像素的区域
    m_imgDatas = GetImages(ctx, 100, 100);
    AddImage(0, m_imgDatas[0]);
  };

  //添加btn事件
  $("#startBtn").onclick = function () {
    m_scoreTotal = 0;
    for (var i = 0; i < m_diceNumber; i++) {
      AddAnimation(i, m_imgDatas, [6, 7, 8], ShowDiceResult);
    }
    $("#music").play();
    $('#player').textContent = "\u5F53\u524D\u73A9\u5BB6\uFF1A".concat(m_rollTimes % m_humanTotal + 1, " \u53F7");
    ++m_rollTimes;
  };
  $("#addLineBtn").onclick = function () {
    AddDiceLine(m_diceNumber++);
  };

  //添加声音
  $("#music").src = _dice_on_desk.default;
};

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} sw 
 * @param {number} sh 
 */
function GetImages(ctx, sw, sh) {
  var imgDatas = [];
  for (var sx = 0; sx < ctx.canvas.width; sx += sw) {
    for (var sy = 0; sy < ctx.canvas.height; sy += sh) {
      var imgData = ctx.getImageData(sx, sy, sw, sh);
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
  var diceNum = Math.floor(Math.random() * 6); //产生随机数0-5

  var frameIdx = 0;
  var frameNum = frames.length;
  var timeSeconds = 0;
  var timeTotal = 2000;
  var timeId = setInterval(function () {
    var imgData = imgDatas[frames[frameIdx++ % frameNum]];
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
  $('#diceNum' + idx).textContent = "\u9AB0\u5B50".concat(idx + 1, " = ").concat(diceNum + 1);
  m_scoreTotal += diceNum + 1;
  $('#total').textContent = "\u5408\u8BA1\u70B9\u6570\uFF1A".concat(m_scoreTotal, " \u70B9");
}
function AddDiceLine(id) {
  var divLineItem = document.createElement('div');
  divLineItem.className = "lineItem";
  $("#diceContainer").appendChild(divLineItem);
  var divCanvas = document.createElement('div');
  divLineItem.appendChild(divCanvas);
  var canvasEle = document.createElement('canvas');
  divCanvas.appendChild(canvasEle);
  canvasEle.id = "dice" + id;
  canvasEle.className = "diceImg";
  var divDiceNum = document.createElement('div');
  divLineItem.appendChild(divDiceNum);
  divDiceNum.className = "itemResult";
  divDiceNum.id = "diceNum" + id;
  divDiceNum.textContent = "骰子" + (id + 1) + " =";

  //添加骰子
  AddImage(id, m_imgDatas[0]);
}
function SelectHumanNum(button) {
  var buttons = $('.btnSel');
  buttons.forEach(function (btn) {
    return btn.classList.remove('active');
  });
  button.classList.add('active');
  //获得人数
  m_humanTotal = parseInt(button.getAttribute('value'));
  m_scoreTotal = 0;
  m_rollTimes = 0;
}
},{"../assets/dice.png":"assets/dice.png","../assets/dice_on_desk.mp3":"assets/dice_on_desk.mp3"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game/dice.js"], null)
//# sourceMappingURL=/dice.cb13b768.js.map