
var EXP_TABLE = new Array(256);
var LOG_TABLE = new Array(256);

var MathGlog = function(n) {	
	return LOG_TABLE[n];
};
var MathGexp = function(n) {
	while (n < 0) {
		n += 255;
	}	
	while (n >= 256) {
		n -= 255;
	}
	return EXP_TABLE[n];
}

for (var i = 0; i < 8; i++) {
	EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	EXP_TABLE[i] = EXP_TABLE[i - 4]
		^ EXP_TABLE[i - 5]
		^ EXP_TABLE[i - 6]
		^ EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	LOG_TABLE[EXP_TABLE[i] ] = i;
}

var QRPolynomial = function(num, shift){
	var offset = 0;
	while (offset < num.length && num[offset] == 0) {
		offset++;
	}
	this.num = new Array(num.length - offset + (shift||0));
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
};

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
/*
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= MathGexp(MathGlog(this.get(i)) + MathGlog(e.get(j)));
			}
		}
	
		return new QRPolynomial(num);
	},
*/
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = MathGlog(this.get(0)) - MathGlog(e.get(0));
	
		var num = new Array(this.getLength());
		
		for (var i = 0; i < this.getLength(); i++){
			num[i] = this.get(i);
		}
		
		for (var i = 0; i < e.getLength(); i++){
			num[i] ^= MathGexp(MathGlog(e.get(i)) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num).mod(e);
	}
};

