//生成二维码矩阵中所需数据
//by:zhujinliang

var QRGenData = function(text){
	
	//编码输入文本
	var buf = QREncodeData(text);
#ifdef DEBUG
	console.debug(buf.length);
	console.debug(buf.dump());
#endif
	if(!buf || buf.length > QRRS_DATA_COUNT_IN_BITS) return false;

	// 结束标记
	if(buf.length + 4 <= QRRS_DATA_COUNT_IN_BITS){
		buf.push(0, 4);
	}
	//填充到1字节
	var times = buf.length % 8;
	if(times) times = 8 - times;
	buf.length += times;
	while(times--) buf.buf.push(false);

	//使用填充字符填充至长度
	while(true){
		if(buf.length >= QRRS_DATA_COUNT_IN_BITS) break;
		buf.push(QR_PAD_0, 8);
		if(buf.length >= QRRS_DATA_COUNT_IN_BITS) break;
		buf.push(QR_PAD_1, 8);
	}

#ifdef DEBUG
	console.debug(buf.length);
	console.debug(buf.dump());
#endif
	
	//加入纠错信息
	QRRsEncode(buf);

#ifdef DEBUG
	console.debug(buf.length);
	console.debug(buf.dump());
#endif

	return buf;
}

