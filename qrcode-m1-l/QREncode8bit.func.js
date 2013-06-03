//8bit字节模式编码
//by:zhujinliang

var QREncodeData = function(text){
	var textLen = text.length;

	var buf = new QRBitBuffer();

	buf.push(4, 4);       //指示符
	buf.push(textLen, 8); //数据长度，依照版本1，L等级

	for(var i=0; i<textLen; i++){
		buf.push(text.charCodeAt(i), 8);
	}	
	return buf;
};

