/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/camera.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/camera.js":
/*!************************!*\
  !*** ./dist/camera.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webgl_plot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webgl-plot */ \"./node_modules/webgl-plot/dist/webglplot.js\");\n/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stats.js */ \"./node_modules/stats.js/build/stats.min.js\");\n/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stats_js__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconst canv = document.getElementById(\"my_canvas\");\r\nconst player = document.getElementById(\"player\");\r\nconst camera = document.getElementById(\"camera\");\r\nconst context = camera.getContext(\"2d\");\r\nlet numX;\r\nlet segView = false;\r\nlet wglp;\r\nlet lineR;\r\nlet lineG;\r\nlet lineB;\r\nconst stats = new stats_js__WEBPACK_IMPORTED_MODULE_1__();\r\nstats.showPanel(0);\r\ndocument.body.appendChild(stats.dom);\r\ncreateUI();\r\ninit();\r\nlet resizeId;\r\nwindow.addEventListener(\"resize\", () => {\r\n    clearTimeout(resizeId);\r\n    resizeId = setTimeout(doneResizing, 500);\r\n});\r\nfunction newFrame() {\r\n    stats.begin();\r\n    update();\r\n    wglp.update();\r\n    //wglp.gScaleY = scaleY;\r\n    stats.end();\r\n    window.requestAnimationFrame(newFrame);\r\n}\r\nwindow.requestAnimationFrame(newFrame);\r\nfunction init() {\r\n    // Create the canvas and get a context\r\n    // Set the canvas to be the same size as the original image\r\n    // Draw the image onto the top-left corner of the canvas\r\n    var handleSuccess = function (stream) {\r\n        player.srcObject = stream;\r\n    };\r\n    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(handleSuccess);\r\n    player.height = 0;\r\n    player.width = 0;\r\n    camera.width = 4 * 100;\r\n    camera.height = 3 * 100;\r\n    let imageData = 0;\r\n    let pixels = 0;\r\n    const devicePixelRatio = window.devicePixelRatio || 1;\r\n    //numX = Math.round(canv.clientWidth * devicePixelRatio);\r\n    numX = camera.width;\r\n    lineR = new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"WebglLine\"](new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"ColorRGBA\"](0.9, 0.2, 0.2, 1), numX);\r\n    lineG = new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"WebglLine\"](new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"ColorRGBA\"](0.2, 0.9, 0.2, 1), numX);\r\n    lineB = new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"WebglLine\"](new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"ColorRGBA\"](0.2, 0.2, 0.9, 1), numX);\r\n    wglp = new webgl_plot__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canv);\r\n    wglp.gOffsetY = -1;\r\n    lineR.lineSpaceX(-1, 2 / numX);\r\n    lineG.lineSpaceX(-1, 2 / numX);\r\n    lineB.lineSpaceX(-1, 2 / numX);\r\n    wglp.addLine(lineR);\r\n    wglp.addLine(lineG);\r\n    wglp.addLine(lineB);\r\n}\r\nfunction update() {\r\n    context.drawImage(player, 0, 0, camera.width, camera.height);\r\n    const imageData = context.getImageData(0, 0, camera.width, camera.height);\r\n    const pixels = imageData.data;\r\n    let i = 0;\r\n    let j = 0;\r\n    //for (j=0; j<camera.height; j++) {\r\n    for (i = 0; i < camera.width; i++) {\r\n        const r = pixels[(100 * camera.width + i) * 4];\r\n        const g = pixels[(100 * camera.width + i) * 4 + 1];\r\n        const b = pixels[(100 * camera.width + i) * 4 + 2];\r\n        lineR.setY(i, r / 255);\r\n        lineG.setY(i, g / 255);\r\n        lineB.setY(i, b / 255);\r\n    }\r\n    //}\r\n    //line.setY(i / 4, pixels[i] / 255);\r\n}\r\nfunction doneResizing() {\r\n    wglp.viewport(0, 0, canv.width, canv.height);\r\n}\r\nfunction createUI() {\r\n    const ui = document.getElementById(\"ui\");\r\n}\r\n//# sourceMappingURL=camera.js.map\n\n//# sourceURL=webpack:///./dist/camera.js?");

/***/ }),

/***/ "./node_modules/stats.js/build/stats.min.js":
/*!**************************************************!*\
  !*** ./node_modules/stats.js/build/stats.min.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// stats.js - http://github.com/mrdoob/stats.js\n(function(f,e){ true?module.exports=e():undefined})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?\"block\":\"none\";l=a}var l=0,c=document.createElement(\"div\");c.style.cssText=\"position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000\";c.addEventListener(\"click\",function(a){a.preventDefault();\nu(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel(\"FPS\",\"#0ff\",\"#002\")),h=e(new f.Panel(\"MS\",\"#0f0\",\"#020\"));if(self.performance&&self.performance.memory)var t=e(new f.Panel(\"MB\",\"#f08\",\"#201\"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/\n1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement(\"canvas\");q.width=r;q.height=h;q.style.cssText=\"width:80px;height:48px\";var b=q.getContext(\"2d\");b.font=\"bold \"+9*a+\"px Helvetica,Arial,sans-serif\";b.textBaseline=\"top\";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);\nb.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+\" \"+e+\" (\"+g(c)+\"-\"+g(k)+\")\",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});\n\n\n//# sourceURL=webpack:///./node_modules/stats.js/build/stats.min.js?");

/***/ }),

/***/ "./node_modules/webgl-plot/dist/ColorRGBA.js":
/*!***************************************************!*\
  !*** ./node_modules/webgl-plot/dist/ColorRGBA.js ***!
  \***************************************************/
/*! exports provided: ColorRGBA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorRGBA\", function() { return ColorRGBA; });\nclass ColorRGBA {\r\n    constructor(r, g, b, a) {\r\n        this.r = r;\r\n        this.g = g;\r\n        this.b = b;\r\n        this.a = a;\r\n    }\r\n}\r\n//# sourceMappingURL=ColorRGBA.js.map\n\n//# sourceURL=webpack:///./node_modules/webgl-plot/dist/ColorRGBA.js?");

/***/ }),

/***/ "./node_modules/webgl-plot/dist/WbglLine.js":
/*!**************************************************!*\
  !*** ./node_modules/webgl-plot/dist/WbglLine.js ***!
  \**************************************************/
/*! exports provided: WebglLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WebglLine\", function() { return WebglLine; });\n/* harmony import */ var _WebglBaseLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebglBaseLine */ \"./node_modules/webgl-plot/dist/WebglBaseLine.js\");\n\r\n/**\r\n * The standard Line class\r\n */\r\nclass WebglLine extends _WebglBaseLine__WEBPACK_IMPORTED_MODULE_0__[\"WebglBaseLine\"] {\r\n    /**\r\n     * Create a new line\r\n     * @param c - the color of the line\r\n     * @param numPoints - number of data pints\r\n     * @example\r\n     * ```typescript\r\n     * x= [0,1]\r\n     * y= [1,2]\r\n     * line = new WebglLine( new ColorRGBA(0.1,0.1,0.1,1), 2);\r\n     * ```\r\n     */\r\n    constructor(c, numPoints) {\r\n        super();\r\n        this.webglNumPoints = numPoints;\r\n        this.numPoints = numPoints;\r\n        this.color = c;\r\n        this.xy = new Float32Array(2 * this.webglNumPoints);\r\n    }\r\n    /**\r\n     * Set the X value at a specific index\r\n     * @param index - the index of the data point\r\n     * @param x - the horizontal value of the data point\r\n     */\r\n    setX(index, x) {\r\n        this.xy[index * 2] = x;\r\n    }\r\n    /**\r\n     * Set the Y value at a specific index\r\n     * @param index : the index of the data point\r\n     * @param y : the vertical value of the data point\r\n     */\r\n    setY(index, y) {\r\n        this.xy[index * 2 + 1] = y;\r\n    }\r\n    /**\r\n     * Get an X value at a specific index\r\n     * @param index - the index of X\r\n     */\r\n    getX(index) {\r\n        return this.xy[index * 2];\r\n    }\r\n    /**\r\n     * Get an Y value at a specific index\r\n     * @param index - the index of Y\r\n     */\r\n    getY(index) {\r\n        return this.xy[index * 2 + 1];\r\n    }\r\n    /**\r\n     * Make an equally spaced array of X points\r\n     * @param start  - the start of the series\r\n     * @param stepSize - step size between each data point\r\n     *\r\n     * @example\r\n     * ```typescript\r\n     * //x = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8]\r\n     * const numX = 10;\r\n     * line.lineSpaceX(-1, 2 / numX);\r\n     * ```\r\n     */\r\n    lineSpaceX(start, stepSize) {\r\n        for (let i = 0; i < this.numPoints; i++) {\r\n            // set x to -num/2:1:+num/2\r\n            this.setX(i, start + stepSize * i);\r\n        }\r\n    }\r\n    /**\r\n     * Set a constant value for all Y values in the line\r\n     * @param c - constant value\r\n     */\r\n    constY(c) {\r\n        for (let i = 0; i < this.numPoints; i++) {\r\n            // set x to -num/2:1:+num/2\r\n            this.setY(i, c);\r\n        }\r\n    }\r\n    /**\r\n     * Add a new Y values to the end of current array and shift it, so that the total number of the pair remains the same\r\n     * @param data - the Y array\r\n     *\r\n     * @example\r\n     * ```typescript\r\n     * yArray = new Float32Array([3, 4, 5]);\r\n     * line.shiftAdd(yArray);\r\n     * ```\r\n     */\r\n    shiftAdd(data) {\r\n        const shiftSize = data.length;\r\n        for (let i = 0; i < this.numPoints - shiftSize; i++) {\r\n            this.setY(i, this.getY(i + shiftSize));\r\n        }\r\n        for (let i = 0; i < shiftSize; i++) {\r\n            this.setY(i + this.numPoints - shiftSize, data[i]);\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=WbglLine.js.map\n\n//# sourceURL=webpack:///./node_modules/webgl-plot/dist/WbglLine.js?");

/***/ }),

/***/ "./node_modules/webgl-plot/dist/WbglPolar.js":
/*!***************************************************!*\
  !*** ./node_modules/webgl-plot/dist/WbglPolar.js ***!
  \***************************************************/
/*! exports provided: WebglPolar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WebglPolar\", function() { return WebglPolar; });\n/* harmony import */ var _WebglBaseLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebglBaseLine */ \"./node_modules/webgl-plot/dist/WebglBaseLine.js\");\n\r\nclass WebglPolar extends _WebglBaseLine__WEBPACK_IMPORTED_MODULE_0__[\"WebglBaseLine\"] {\r\n    constructor(c, numPoints) {\r\n        super();\r\n        this.webglNumPoints = numPoints;\r\n        this.numPoints = numPoints;\r\n        this.color = c;\r\n        this.intenisty = 1;\r\n        this.xy = new Float32Array(2 * this.webglNumPoints);\r\n        this._vbuffer = 0;\r\n        this._prog = 0;\r\n        this._coord = 0;\r\n        this.visible = true;\r\n        this.offsetTheta = 0;\r\n    }\r\n    /**\r\n     * @param index: index of the line\r\n     * @param theta : angle in deg\r\n     * @param r : radius\r\n     */\r\n    setRtheta(index, theta, r) {\r\n        //const rA = Math.abs(r);\r\n        //const thetaA = theta % 360;\r\n        const x = r * Math.cos((2 * Math.PI * (theta + this.offsetTheta)) / 360);\r\n        const y = r * Math.sin((2 * Math.PI * (theta + this.offsetTheta)) / 360);\r\n        //const index = Math.round( ((theta % 360)/360) * this.numPoints );\r\n        this.setX(index, x);\r\n        this.setY(index, y);\r\n    }\r\n    getTheta(index) {\r\n        //return Math.tan\r\n        return 0;\r\n    }\r\n    getR(index) {\r\n        //return Math.tan\r\n        return Math.sqrt(Math.pow(this.getX(index), 2) + Math.pow(this.getY(index), 2));\r\n    }\r\n    setX(index, x) {\r\n        this.xy[index * 2] = x;\r\n    }\r\n    setY(index, y) {\r\n        this.xy[index * 2 + 1] = y;\r\n    }\r\n    getX(index) {\r\n        return this.xy[index * 2];\r\n    }\r\n    getY(index) {\r\n        return this.xy[index * 2 + 1];\r\n    }\r\n}\r\n//# sourceMappingURL=WbglPolar.js.map\n\n//# sourceURL=webpack:///./node_modules/webgl-plot/dist/WbglPolar.js?");

/***/ }),

/***/ "./node_modules/webgl-plot/dist/WbglStep.js":
/*!**************************************************!*\
  !*** ./node_modules/webgl-plot/dist/WbglStep.js ***!
  \**************************************************/
/*! exports provided: WebglStep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WebglStep\", function() { return WebglStep; });\n/* harmony import */ var _WebglBaseLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebglBaseLine */ \"./node_modules/webgl-plot/dist/WebglBaseLine.js\");\n\r\n/**\r\n * The step based line plot\r\n */\r\nclass WebglStep extends _WebglBaseLine__WEBPACK_IMPORTED_MODULE_0__[\"WebglBaseLine\"] {\r\n    /**\r\n     * Create a new step line\r\n     * @param c - the color of the line\r\n     * @param numPoints - number of data pints\r\n     * @example\r\n     * ```typescript\r\n     * x= [0,1]\r\n     * y= [1,2]\r\n     * line = new WebglStep( new ColorRGBA(0.1,0.1,0.1,1), 2);\r\n     * ```\r\n     */\r\n    constructor(c, num) {\r\n        super();\r\n        this.webglNumPoints = num * 2;\r\n        this.numPoints = num;\r\n        this.color = c;\r\n        this.xy = new Float32Array(2 * this.webglNumPoints);\r\n    }\r\n    /**\r\n     * Set the Y value at a specific index\r\n     * @param index - the index of the data point\r\n     * @param y - the vertical value of the data point\r\n     */\r\n    setY(index, y) {\r\n        this.xy[index * 4 + 1] = y;\r\n        this.xy[index * 4 + 3] = y;\r\n    }\r\n    getX(index) {\r\n        return this.xy[index * 4];\r\n    }\r\n    /**\r\n     * Get an X value at a specific index\r\n     * @param index - the index of X\r\n     */\r\n    getY(index) {\r\n        return this.xy[index * 4 + 1];\r\n    }\r\n    /**\r\n     * Make an equally spaced array of X points\r\n     * @param start  - the start of the series\r\n     * @param stepSize - step size between each data point\r\n     *\r\n     * @example\r\n     * ```typescript\r\n     * //x = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8]\r\n     * const numX = 10;\r\n     * line.lineSpaceX(-1, 2 / numX);\r\n     * ```\r\n     */\r\n    lineSpaceX(start, stepsize) {\r\n        for (let i = 0; i < this.numPoints; i++) {\r\n            // set x to -num/2:1:+num/2\r\n            this.xy[i * 4] = start + i * stepsize;\r\n            this.xy[i * 4 + 2] = start + (i * stepsize + stepsize);\r\n        }\r\n    }\r\n    /**\r\n     * Set a constant value for all Y values in the line\r\n     * @param c - constant value\r\n     */\r\n    constY(c) {\r\n        for (let i = 0; i < this.numPoints; i++) {\r\n            // set x to -num/2:1:+num/2\r\n            this.setY(i, c);\r\n        }\r\n    }\r\n    /**\r\n     * Add a new Y values to the end of current array and shift it, so that the total number of the pair remains the same\r\n     * @param data - the Y array\r\n     *\r\n     * @example\r\n     * ```typescript\r\n     * yArray = new Float32Array([3, 4, 5]);\r\n     * line.shiftAdd(yArray);\r\n     * ```\r\n     */\r\n    shiftAdd(data) {\r\n        const shiftSize = data.length;\r\n        for (let i = 0; i < this.numPoints - shiftSize; i++) {\r\n            this.setY(i, this.getY(i + shiftSize));\r\n        }\r\n        for (let i = 0; i < shiftSize; i++) {\r\n            this.setY(i + this.numPoints - shiftSize, data[i]);\r\n        }\r\n    }\r\n}\r\n//# sourceMappingURL=WbglStep.js.map\n\n//# sourceURL=webpack:///./node_modules/webgl-plot/dist/WbglStep.js?");

/***/ }),

/***/ "./node_modules/webgl-plot/dist/WebglBaseLine.js":
/*!*******************************************************!*\
  !*** ./node_modules/webgl-plot/dist/WebglBaseLine.js ***!
  \*******************************************************/
/*! exports provided: WebglBaseLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WebglBaseLine\", function() { return WebglBaseLine; });\n/**\r\n * Baseline class\r\n */\r\nclass WebglBaseLine {\r\n    /**\r\n     * @internal\r\n     */\r\n    constructor() {\r\n        this.scaleX = 1;\r\n        this.scaleY = 1;\r\n        this.offsetX = 0;\r\n        this.offsetY = 0;\r\n        this.loop = false;\r\n        this._vbuffer = 0;\r\n        this._prog = 0;\r\n        this._coord = 0;\r\n        this.visible = true;\r\n        this.intensity = 1;\r\n    }\r\n}\r\n//# sourceMappingURL=WebglBaseLine.js.map\n\n//# sourceURL=webpack:///./node_modules/webgl-plot/dist/WebglBaseLine.js?");

/***/ }),

/***/ "./node_modules/webgl-plot/dist/webglplot.js":
/*!***************************************************!*\
  !*** ./node_modules/webgl-plot/dist/webglplot.js ***!
  \***************************************************/
/*! exports provided: WebglLine, ColorRGBA, WebglStep, WebglPolar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WebGLPlot; });\n/* harmony import */ var _ColorRGBA__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorRGBA */ \"./node_modules/webgl-plot/dist/ColorRGBA.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ColorRGBA\", function() { return _ColorRGBA__WEBPACK_IMPORTED_MODULE_0__[\"ColorRGBA\"]; });\n\n/* harmony import */ var _WbglLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WbglLine */ \"./node_modules/webgl-plot/dist/WbglLine.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WebglLine\", function() { return _WbglLine__WEBPACK_IMPORTED_MODULE_1__[\"WebglLine\"]; });\n\n/* harmony import */ var _WbglStep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WbglStep */ \"./node_modules/webgl-plot/dist/WbglStep.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WebglStep\", function() { return _WbglStep__WEBPACK_IMPORTED_MODULE_2__[\"WebglStep\"]; });\n\n/* harmony import */ var _WbglPolar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WbglPolar */ \"./node_modules/webgl-plot/dist/WbglPolar.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WebglPolar\", function() { return _WbglPolar__WEBPACK_IMPORTED_MODULE_3__[\"WebglPolar\"]; });\n\n/**\r\n * Author Danial Chitnis 2019\r\n *\r\n * inspired by:\r\n * https://codepen.io/AzazelN28\r\n * https://www.tutorialspoint.com/webgl/webgl_modes_of_drawing.htm\r\n */\r\n\r\n\r\n\r\n\r\n\r\n/**\r\n * The main class for the webgl-plot library\r\n */\r\nclass WebGLPlot {\r\n    /**\r\n     * Create a webgl-plot instance\r\n     * @param canv - the HTML canvas in which the plot appears\r\n     *\r\n     * @example\r\n     * ```typescript\r\n     * const canv = dcoument.getEelementbyId(\"canvas\");\r\n     * const webglp = new WebGLplot(canv);\r\n     * ```\r\n     */\r\n    constructor(canv) {\r\n        const devicePixelRatio = window.devicePixelRatio || 1;\r\n        // set the size of the drawingBuffer based on the size it's displayed.\r\n        canv.width = canv.clientWidth * devicePixelRatio;\r\n        canv.height = canv.clientHeight * devicePixelRatio;\r\n        const webgl = canv.getContext(\"webgl\", {\r\n            antialias: true,\r\n            transparent: false,\r\n        });\r\n        this.lines = [];\r\n        this.webgl = webgl;\r\n        this.gScaleX = 1;\r\n        this.gScaleY = 1;\r\n        this.gXYratio = 1;\r\n        this.gOffsetX = 0;\r\n        this.gOffsetY = 0;\r\n        // Enable the depth test\r\n        webgl.enable(webgl.DEPTH_TEST);\r\n        // Clear the color and depth buffer\r\n        webgl.clear(webgl.COLOR_BUFFER_BIT || webgl.DEPTH_BUFFER_BIT);\r\n        // Set the view port\r\n        webgl.viewport(0, 0, canv.width, canv.height);\r\n    }\r\n    /**\r\n     * updates and redraws the content of the plot\r\n     */\r\n    update() {\r\n        const webgl = this.webgl;\r\n        this.lines.forEach((line) => {\r\n            if (line.visible) {\r\n                webgl.useProgram(line._prog);\r\n                const uscale = webgl.getUniformLocation(line._prog, \"uscale\");\r\n                webgl.uniformMatrix2fv(uscale, false, new Float32Array([\r\n                    line.scaleX * this.gScaleX,\r\n                    0,\r\n                    0,\r\n                    line.scaleY * this.gScaleY * this.gXYratio,\r\n                ]));\r\n                const uoffset = webgl.getUniformLocation(line._prog, \"uoffset\");\r\n                webgl.uniform2fv(uoffset, new Float32Array([line.offsetX + this.gOffsetX, line.offsetY + this.gOffsetY]));\r\n                const uColor = webgl.getUniformLocation(line._prog, \"uColor\");\r\n                webgl.uniform4fv(uColor, [line.color.r, line.color.g, line.color.b, line.color.a]);\r\n                webgl.bufferData(webgl.ARRAY_BUFFER, line.xy, webgl.STREAM_DRAW);\r\n                webgl.drawArrays(line.loop ? webgl.LINE_LOOP : webgl.LINE_STRIP, 0, line.webglNumPoints);\r\n            }\r\n        });\r\n    }\r\n    clear() {\r\n        // Clear the canvas  //??????????????????\r\n        //this.webgl.clearColor(0.1, 0.1, 0.1, 1.0);\r\n        this.webgl.clear(this.webgl.COLOR_BUFFER_BIT || this.webgl.DEPTH_BUFFER_BIT);\r\n    }\r\n    /**\r\n     * adds a line to the plot\r\n     * @param line - this could be any of line, linestep, histogram, or polar\r\n     *\r\n     * @example\r\n     * ```typescript\r\n     * const line = new line(color, numPoints);\r\n     * wglp.addLine(line);\r\n     * ```\r\n     */\r\n    addLine(line) {\r\n        line._vbuffer = this.webgl.createBuffer();\r\n        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, line._vbuffer);\r\n        this.webgl.bufferData(this.webgl.ARRAY_BUFFER, line.xy, this.webgl.STREAM_DRAW);\r\n        const vertCode = `\r\n      attribute vec2 coordinates;\r\n      uniform mat2 uscale;\r\n      uniform vec2 uoffset;\r\n\r\n      void main(void) {\r\n         gl_Position = vec4(uscale*coordinates + uoffset, 0.0, 1.0);\r\n      }`;\r\n        // Create a vertex shader object\r\n        const vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);\r\n        // Attach vertex shader source code\r\n        this.webgl.shaderSource(vertShader, vertCode);\r\n        // Compile the vertex shader\r\n        this.webgl.compileShader(vertShader);\r\n        // Fragment shader source code\r\n        const fragCode = `\r\n         precision mediump float;\r\n         uniform highp vec4 uColor;\r\n         void main(void) {\r\n            gl_FragColor =  uColor;\r\n         }`;\r\n        const fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);\r\n        this.webgl.shaderSource(fragShader, fragCode);\r\n        this.webgl.compileShader(fragShader);\r\n        line._prog = this.webgl.createProgram();\r\n        this.webgl.attachShader(line._prog, vertShader);\r\n        this.webgl.attachShader(line._prog, fragShader);\r\n        this.webgl.linkProgram(line._prog);\r\n        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, line._vbuffer);\r\n        line._coord = this.webgl.getAttribLocation(line._prog, \"coordinates\");\r\n        this.webgl.vertexAttribPointer(line._coord, 2, this.webgl.FLOAT, false, 0, 0);\r\n        this.webgl.enableVertexAttribArray(line._coord);\r\n        this.lines.push(line);\r\n    }\r\n    /**\r\n     * Change the WbGL viewport\r\n     * @param a\r\n     * @param b\r\n     * @param c\r\n     * @param d\r\n     */\r\n    viewport(a, b, c, d) {\r\n        this.webgl.viewport(a, b, c, d);\r\n    }\r\n}\r\n//# sourceMappingURL=webglplot.js.map\n\n//# sourceURL=webpack:///./node_modules/webgl-plot/dist/webglplot.js?");

/***/ })

/******/ });