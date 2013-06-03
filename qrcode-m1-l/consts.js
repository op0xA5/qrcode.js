#region _MACRO_

//用于GenData填充数据

#define  QR_PAD_0  236 
/* 236 => 0xEC */
#define  QR_PAD_1  17  
/* 17 => 0x11 */

//QR码常量
#if QR_TYPE_NUMBER == 1
	
	#define  QR_MODULE_COUNT  21

	#define  QRRS_TOTAL_COUNT         26
#if QR_EC_LEVEL == 'L'
	#define  QRRS_DATA_COUNT          19
	#define  QRRS_EC_COUNT            7
// QRRS_EC_COUNT = QRRS_TOTAL_COUNT - QRRS_DATA_COUNT;
	#define  QRRS_DATA_COUNT_IN_BITS  152
// QRRS_DATA_COUNT_IN_BITS = QRRS_DATA_COUNT * 8;
#elif QR_EC_LEVEL == 'M'
	#define  QRRS_DATA_COUNT          16
	#define  QRRS_EC_COUNT            10
	#define  QRRS_DATA_COUNT_IN_BITS  128
#endif

#elif QR_TYPE_NUMBER == 2

	#define  QR_MODULE_COUNT  25

	#define  QRRS_TOTAL_COUNT         44
#if QR_EC_LEVEL == 'L'
	#define  QRRS_DATA_COUNT          34
	#define  QRRS_EC_COUNT            10
	#define  QRRS_DATA_COUNT_IN_BITS  272
#elif QR_EC_LEVEL == 'M'
	#define  QRRS_DATA_COUNT          28
	#define  QRRS_EC_COUNT            16
	#define  QRRS_DATA_COUNT_IN_BITS  224
#endif

#else
	#error 请指定QR_TYPE_NUMBER
#endif

#endregion
