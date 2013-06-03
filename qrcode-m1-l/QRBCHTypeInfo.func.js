//产生用于版本信息的BCH编码
#if QR_EC_LEVEL == 'L'
	var BCHTable = [
		 4599, 26535, 10975, 23695,
		31283,  3171, 16667, 14155
	];
#elif QR_EC_LEVEL == 'M'
	var BCHTable = [
		 9237, 21061,  7997, 26989,
		20433, 14721, 29945,   681
	];
#else
	#error 请指定QR_EC_LEVEL
#endif

#region _REM_
//已替换为查表法

#define  BCH_G15  1335
/* 1335 => (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0) */
#define  BCH_G15_MASK  21522
/* 21522 => (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1) */
#define  BCH_G15_DIGIT 11
/* 11 => _getBCHDigit(BCH_G15) */

var getBCHTypeInfo = function(data){
	var d = data << 10;
	while (_getBCHDigit(d) - BCH_G15_DIGIT >= 0) {
		d ^= (BCH_G15 << (_getBCHDigit(d) - BCH_G15_DIGIT));
	}
	return ( (data << 10) | d) ^ BCH_G15_MASK;
}

var _getBCHDigit = function(data){
	var digit = 0;
	while (data != 0) {
		digit++;
		data >>>= 1;
	}
    return digit;
}



#ifdef DEBUG

	console.debug('--------------------');
	console.debug('BCH Type Info Test');
	for(var i=0; i<8; i++){
		console.debug(i, getBCHTypeInfo(0 | i));
	}
	console.debug('--------------------');
#endif

#endregion
