//Mask模版
//by:zhujinliang

var MaskFunc = [

	/* 0 */
	function(i,j){
		return (i+j)%2 == 0;
	},

	/* 1 */
	function(i,j){
		return i%2 == 0;
	},
	/* 2 */
	function(i,j){
		return j%3 == 0;
	},
	/* 3 */
	function(i,j){
		return (i+j)%3 == 0;
	},
	/* 4 */
	function(i,j){
		return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
	},

	/* 5 */
	function(i,j){
		return (i * j) % 2 + (i * j) % 3 == 0;
	},
	/* 6 */
	function(i,j){
		return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
	},
	/* 7 */
	function(i,j){
		return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
	},

];
