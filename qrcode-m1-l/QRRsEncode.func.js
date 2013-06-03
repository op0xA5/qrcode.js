//QRCode 纠错码生成，仅支持L等级
//by:zhujinliang

var QRRsEncode = function(buf){

	var dcdata = buf.toBytes();
	var rsPoly = _getECPoly();
	var rawPoly = new QRPolynomial(dcdata, QRRS_EC_COUNT);
	
	var modPoly = rawPoly.mod(rsPoly);
	var ecdata = new Array(QRRS_EC_COUNT);
	for(var i=0; i<QRRS_EC_COUNT; i++){
		var modIndex = i + modPoly.getLength() - QRRS_EC_COUNT;
		ecdata[i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
	}
	buf.pushBytes(ecdata);
};

//使用预生成数据
var _getECPoly = function(){
	return new QRPolynomial([1,127,122,154,164,11,68,117]);
};

#region _REM_
var _getECPoly = function(){
	var a = new QRPolynomial([1], 0);
	for(var i = 0; i < QRRS_EC_COUNT; i++){
		a = a.multiply(new QRPolynomial([1, MathGexp(i)]));
	}	
    return a;
};
#endregion
