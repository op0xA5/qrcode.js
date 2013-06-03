//使用canvas绘制图形
//by:zhujinliang

var QRRenderCanvas = function(module, target, size){
	if(target.getContext){
		var canv = target.getContext('2d');
		canv.clearRect(0,0, target.width, target.height);
		canv.fillStyle = '#000000';
		for(var line=0; line<QR_MODULE_COUNT; line++){
			for(var col=0; col<QR_MODULE_COUNT; col++){
				if(module.m[col][line])	canv.fillRect(col*size, line*size, size, size);
			}
		}
	}
}


