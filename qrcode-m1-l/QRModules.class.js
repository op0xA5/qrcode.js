//QRCode 矩阵图像操作
//by:zhujinliang

var QRModules = function(){
	this.m = new Array(QR_MODULE_COUNT);
	for(var i=0; i<QR_MODULE_COUNT; i++){
		this.m[i] = new Array(QR_MODULE_COUNT);
	}
}

QRModules.prototype = {

	drawFuncPattern : function(maskId){
		//注意：此函数只适应模式1，即大小为21*21，很多参数已写死或取巧实现
		
		//两条点线
		for(var i=8; i<QR_MODULE_COUNT - 8; i++){
			this.m[i][6] = !(i%2);
			this.m[6][i] = !(i%2)
		}
		//this.m[8][13] = 1;

		//三个定位元素
		for(var j=4; j>0; j--){
			var pt = !!(j%2);
			this._fill(3, 3, j, pt);
			this._fill(QR_MODULE_COUNT - 4, 3, j, pt);
			this._fill(3, QR_MODULE_COUNT - 4, j, pt);
		}

#if QR_TYPE_NUMBER > 1
		//图像矫正元素
		this._fill(18, 18, 2, 1);
		this._fill(18, 18, 1, 0);
		this.m[18][18] = 1;
#endif

		//格式信息
		var bit = new QRBitBuffer();
		bit.push(BCHTable[maskId], 15);
		//绘制横向
		var i = 0, j;
		for(j=1; j<9; j++) this.m[QR_MODULE_COUNT-j][8] = bit.buf[i++];
		this.m[7][8] = bit.buf[i++];
		for(j=5; j>=0; j--) this.m[j][8] = bit.buf[i++];
		//绘制纵向
		i=0;
		for(j=0; j<9; j++) if(j!=6) this.m[8][j] = bit.buf[i++];
		for(j=QR_MODULE_COUNT-7;j<QR_MODULE_COUNT;j++) this.m[8][j] = bit.buf[i++];
		//格式信息中多余的点
		this.m[8][QR_MODULE_COUNT-8] = true;
	},

	_fill : function(cx, cy, l, c){
		for(var x=cx-l; x<=cx+l; x++){
			for(var y=cy-l; y<=cy+l; y++){
				if(x>=0 && x<QR_MODULE_COUNT && y>=0 && y<QR_MODULE_COUNT)
					this.m[x][y] = c;
			}
		}
	},

	//置入buf数据
	putData : function(buf, maskId){
		var inc = -1;
		var row = QR_MODULE_COUNT-1, col = row;
		var bitIndex = 0;
		var c, dark;

		for(; col>0; col-=2){
			if(col == 6) col--;
			while(true){
				for(c=0; c<2; c++){
					if(this.m[col-c][row] == null){
						dark = buf.buf[bitIndex++];
						if(MaskFunc[maskId](row, col-c)) dark = !dark;
						this.m[col-c][row] = dark;
					}
				}			
				row += inc;
				if(row < 0 || row >= QR_MODULE_COUNT){
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
	},

#ifdef DEBUG
	
	dump : function(){
		var rtnTxt = '';
		for(var y=0; y<QR_MODULE_COUNT; y++){
			for(var x=0; x<QR_MODULE_COUNT; x++){
				rtnTxt += typeof(this.m[x][y])=='undefined' ? '<>' : this.m[x][y] ? '[]' : '  ';
			}
			rtnTxt += '\r\n';
		}
		return rtnTxt;
	}

#endif

}


