//QRCode 仅支持版本1 L纠错 混合字符模式
//by:zhujinliang

#region _PROTECTED_
/******************
 * QRTiny         *
 * By:zhujinliang *
 ******************/
#endregion

#define DEBUG

#define _ENABLE_RENDER_CANVAS
#ifndef  QR_TYPE_NUMBER
#define  QR_TYPE_NUMBER  1
#endif
#ifndef  QR_EC_LEVEL
#define  QR_EC_LEVEL     L
#endif
#ifndef  QR_DATA_MODE
#define  QR_DATA_MODE    CHAR_NUM
#endif

#include "qrcode-m1-l.config.macro"
var QRTiny = (function(){
	
	#include "consts.js"

	#include "QRBitBuffer.class.js"
	#include "QRPolynomia.class.js"
	#include "QRModules.class.js"

	#include "QRBCHTypeInfo.func.js"
	#include "QRMasks.func.js"
	#include "QRRenderDiv.func.js"
#ifdef _ENABLE_RENDER_CANVAS
	#include "QRRenderCanvas.func.js"
#endif

#if QR_DATA_MODE == 'CHAR_NUM'
	#include "QREncodeCharNum.func.js"
#elif QR_DATA_MODE == '8BIT'
	#include "QREncode8bit.func.js"
#else
	#error 必须指定一种编码方式(可选CHAR_NUM/8BIT)
#endif

	#include "QRGenData.func.js"	
	#include "QRRsEncode.func.js"
	#include "QREvaluateMask.func.js"

	var	QRTiny = function(_surface){
		this.surface = _surface;
		this.module;
	};

	QRTiny.prototype.make = function(txt){
		//准备数据
		var dataBuf = QRGenData(txt);
		if(!dataBuf) return false;
		//测试得分
		var minScore, minModule;
		for(var i=0; i<8; i++){
			var testModules = new QRModules();
			//填充功能图形
			testModules.drawFuncPattern(i);
			//填入数据
			testModules.putData(dataBuf, i);
			//计算得分
			var score = QREvaluateMask(testModules);;
			//记录最低分
			if(!minScore || score < minScore){
				minScore = score; minModule = testModules;
			}
		}		
		this.module = minModule;
		return true;
	};

	QRTiny.prototype.draw = function(surface, render, size){
		surface = surface || this.surface;
		size = size || 2;

#ifdef _ENABLE_RENDER_CANVAS
		render = render || 'div';		
		if(render == 'canvas'){
			QRRenderCanvas(this.module, surface, size);
		}else{
			QRRenderDiv(this.module, surface, size);
		}
#else
		QRRenderDiv(this.module, surface, size);
#endif

	};

	return QRTiny;

})();


#ifndef DEBUG
#include "compressor"
#pragma dump QRTiny.min.js
#endif
