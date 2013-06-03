qrcode.js
=========

基于javascript和every-macro可裁剪的qrcode库

代码修改于 QRCode for JavaScript。

构想：

- 在every-macro中定义版本、等级、编码格式等属性，生成代码仅支持该定义的属性，不再兼容各种版本、纠错等级等，可减少代码复杂程度及各种定义数据。
- 代码可以被优化，某些数据可事先做成表格查询使用从而提高效率。

浏览器的性能足以支撑使用优化过的javascript代码来生成QR二维码，而不必通过服务器生成图片再下载到浏览器中，不仅减轻服务器压力，同时可提高用户体验。

**本代码目前处于基本不可用状态，仅type 1,纠错等级l 模式可用。**

---

every-macro 项目: <https://github.com/yurinacn/every-macro>

配置好every-macro后，访问 qrcode-m1-l.js 即可。