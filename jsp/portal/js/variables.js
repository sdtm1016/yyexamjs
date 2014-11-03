
/************ portal页 全局变量 （所有的变量名都以"模块名_"开始命名）*************/

//----登陆信息区-----begin-------------
var login_accid="";  //当前登陆账套
var login_iyear="";//当前登陆会计年度
var login_iperiod="";//当前登陆期间
var login_userid=""; //当前登陆操作员
var login_operdate="";//当前登陆业务操作时间
//----登陆信息区-----end-------------



//----工资模块区-----begin-------------

//工资模块登录标记（1：已登录，0：未登录）
var wa_wageTypeId = 0;

//当前打开的工资类别号和工资类别名称
//对象成员变量：
//	cgzgradenum		:	工资类别号
//	cgzgradename	:	工资类别名称
var wa_currentWaAccount = new Object();
wa_currentWaAccount.cgzgradenum="";
wa_currentWaAccount.cgzgradename="";
var wa_isWageSets = 0;//(0：未建立;1:单工资；2：多工资)

//----工资模块区-----end-------------


//----固定资产模块区-----begin-------------
//资产变动各项菜单打开同一个窗体，窗体加载完后读取此变量以判断是增是减是改是删。
var fa_ac_action = 0;

//----固定资产模块区-----end-------------


//----portal模块区-----begin-------------
/***
 * 全局变量：当前会话，已打开过的页面
 * 用于目标页面判断是否是第一次打开，当导航菜单被点击后会往此数组里添加一个信息对象用于记录被点击的模块式否被打开
 */
var openedPages = [];

/***
 * 全局变量：当前活动的模块（名称）
 * 用于控制左侧导航菜单样式
 */
var currentModuleId = null;
//----portal模块区-----end-------------

