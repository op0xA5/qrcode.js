//QRCode 一维数据内存

var QRBitBuffer = function(){
	this.buf = new Array();
	this.length = 0;
}

QRBitBuffer.prototype = {

	push : function(num, length){
		for(var i=1; i<=length; i++){
			this.buf.push(!!((num >> (length-i)) & 1));
		}
		this.length += length;
	},

	toBytes : function(){
		var length = Math.ceil(this.length / 8), bytes = new Array(length);
		var offset = 0, tmpNum;
		for(var i=0; i<length; i++){
			tmpNum = 0;
			for(var j=0; j<8; j++){
				tmpNum += this.buf[offset++] ? 128>>j : 0;
				/* 128 => 0b1000 0000 */
			}
			bytes[i] = tmpNum;
		}
		return bytes;
	},

	pushBytes : function(bytes){
		var length = bytes.length;
		for(var i=0; i<length; i++){
			this.push(bytes[i], 8);
		}
	},

#ifdef DEBUG
	dump : function(){
		var length = this.buf.length;
		var rtnTxt = '';
		for(var i=0; i<length; i++){
			rtnTxt += (this.buf[i] ? '1' : '0');
			if(i%4 == 3) rtnTxt += ' ';
			if(i%16 == 15) rtnTxt += ' '+(i+1)+'\r\n';
		}
		return rtnTxt;
	}
#endif

}

