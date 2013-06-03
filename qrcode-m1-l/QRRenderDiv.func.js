//使用ul和li绘制图形
//by:zhujinliang

var QRRenderDiv = function(module, target, size){
	size = ''+size+'px';
	target.innerHTML = '';
	for(var line=0; line<QR_MODULE_COUNT; line++){
		var ul = document.createElement('ul');
		ul.style.cssText = 'list-style:none;height:'+size+';margin:0;padding:0;';
		for(var col=0; col<QR_MODULE_COUNT; col++){
			var li = document.createElement('li');
			li.style.cssText = 'height:'+size+';width:'+size+';float:left;';		
			li.style.backgroundColor = module.m[col][line] ? '#000' : '#FFF';
			ul.appendChild(li);
		}
		target.appendChild(ul);
	}
}
