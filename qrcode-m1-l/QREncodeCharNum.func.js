//字母数字混合模式编码
//by:zhujinliang

var CHAR_CODE_TABLE = {};
/* 制作表格 */
(function(){
	var text = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
	var textLen = text.length;
	for(var i=0; i<textLen; i++){
		CHAR_CODE_TABLE[text[i]] = i;
	}
})();

var QREncodeData = function(text){
	var textLen = text.length;
	var buf = new QRBitBuffer();
	var chr, code;

	buf.push(2, 4);       //指示符
	buf.push(textLen, 9); //数据长度

	for(var i=1; i<textLen; i+=2){
		chr = text[i-1];		
		if(!(chr in CHAR_CODE_TABLE)) return false;
		code = CHAR_CODE_TABLE[chr] * 45;
		chr = text[i];
		if(!(chr in CHAR_CODE_TABLE)) return false;
		code += CHAR_CODE_TABLE[chr];
		buf.push(code, 11);
	}
	if(textLen % 2){
		chr = text[textLen-1];
		if(!(chr in CHAR_CODE_TABLE)) return false;
		buf.push(CHAR_CODE_TABLE[chr], 6);		
	}
	return buf;
};

