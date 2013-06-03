//对掩模后图形进行评分

var QREvaluateMask = function(module) {

	var lostPoint = 0;

	// LEVEL1
	for (var row = 0; row < QR_MODULE_COUNT; row++) {
		for (var col = 0; col < QR_MODULE_COUNT; col++) {
		    var sameCount = 0;
			var dark = module.m[row][col];
			for (var r = -1; r <= 1; r++) {
				if (row + r < 0 || QR_MODULE_COUNT <= row + r) {
					continue;
				}
				for (var c = -1; c <= 1; c++) {
					if (col + c < 0 || QR_MODULE_COUNT <= col + c) {
						continue;
					}
					if (r == 0 && c == 0) {
						continue;
					}
					if (dark == module.m[row + r][col + c] ) {
						sameCount++;
					}
				}
			}
			if (sameCount > 5) {
				lostPoint += (3 + sameCount - 5);
			}
		}
	}

	// LEVEL2
	for (var row = 0; row < QR_MODULE_COUNT - 1; row++) {
		for (var col = 0; col < QR_MODULE_COUNT - 1; col++) {
			var count = 0;
			if (module.m[row]  [col]  ) count++;
			if (module.m[row+1][col]  ) count++;
			if (module.m[row]  [col+1]) count++;
			if (module.m[row+1][col]) count++;
			if (count == 0 || count == 4) {
				lostPoint += 3;
			}
		}
	}

	// LEVEL3
	for (var row = 0; row < QR_MODULE_COUNT; row++) {
		for (var col = 0; col < QR_MODULE_COUNT - 6; col++) {
			if (module.m[row][col]
				&& !module.m[row][col+1]
				&&  module.m[row][col+2]
				&&  module.m[row][col+3]
				&&  module.m[row][col+4]
				&& !module.m[row][col+5]
				&&  module.m[row][col+6]) {
				lostPoint += 40;
			}
		}
	}

	for (var col = 0; col < QR_MODULE_COUNT; col++) {
		for (var row = 0; row < QR_MODULE_COUNT - 6; row++) {
			if (module.m[row][col]
				&& !module.m[row+1][col]
				&&  module.m[row+2][col]
				&&  module.m[row+3][col]
				&&  module.m[row+4][col]
				&& !module.m[row+5][col]
				&&  module.m[row+6][col]) {
				lostPoint += 40;
			}
		}
	}

	// LEVEL4	
	var darkCount = 0;
	for (var col = 0; col < QR_MODULE_COUNT; col++) {
		for (var row = 0; row < QR_MODULE_COUNT; row++) {
			if (module.m[row][col]) {
				darkCount++;
			}
		}
	}
	
	var ratio = Math.abs(100 * darkCount / QR_MODULE_COUNT / QR_MODULE_COUNT - 50) / 5;
	lostPoint += ratio * 10;

	return lostPoint;		
}

