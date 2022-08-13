const got = require('got');

const accpwds = process.env.bgyaccpwds;
function randomString(len = 12) {
    let chars = 'abcdef0123456789';
    let maxLen = chars.length;
    let str = '';
    for (i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxLen));
    }
    return str;
}

!(async()=>{
    let totalToken='';
    for(let accpwd of accpwds.split('@')){
	try{
        accpwd = accpwd.split('&');
        let acc = accpwd[0], pwd =accpwd[1];
        let uid = `${randomString(8).toUpperCase()}-${randomString(4).toUpperCase()}-${randomString(4).toUpperCase()}-${randomString(4).toUpperCase()}-${randomString(12).toUpperCase()}`;
        let body = JSON.stringify({
            loginDeviceNo:uid,
            loginName:acc,
            password:pwd
        })
       let data  = await got.post({
            url:'https://mapi.baigongyi.com/signin',
            headers:{
                Host:'mapi.baigongyi.com',
                uid:uid,
                'Content-Type':'application/json',
                'Connection':'keep-alive',
                Authentication:'noLogin.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTg5MzQyNDksInVzZXJJZCI6ImJhaWdvbmd5aSJ9.kNFE-VzCTN_P3Xujremb-WrLJwllvpi8BcakAuwIVmk',
                Accept:'*/*',
                Version: '4.5.8',
                'User-Agent': 'Peer/4.5.8 (iPad; iOS 15.2; Scale/2.00)',
                'Accept-Language': 'en-CN;q=1, zh-Hans-CN;q=0.9',
                'Content-Length': body.length,
                'Accept-Encoding': 'gzip, deflate, br'
            },
            body:body
        }).json()
        console.log(data.data.token);
	if(totalToken) totalToken+='@';
	totalToken+=data.data.token;
	}
	 catch(e){
	console.log(e);
	 }
    }
    console.log(totalToken);
})()
