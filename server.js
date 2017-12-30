//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
  var request = require('request'); 
//var FileCookieStore = require('tough-cookie-filestore');
// NOTE - currently the 'cookies.json' file must already exist!
//var j = request.jar(new FileCookieStore('cookie.json'));
//request = request.defaults({ jar : j })

  
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}






var user_agents=["Opera/9.80 (Windows NT 6.1; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Windows NT 6.0; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Windows NT 5.1; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Windows Mobile; WCE; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Macintosh; Intel Mac OS X; Opera Mobi/3730; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Macintosh; Intel Mac OS X; Opera Mobi/27; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Linux i686; Opera Mobi/1040; U; en) Presto/2.5.24 Version/10.00","Opera/9.80 (Linux i686; Opera Mobi/1038; U; en) Presto/2.5.24 Version/10.00","Opera/9.80 (Android; Linux; Opera Mobi/49; U; en) Presto/2.4.18 Version/10.00","Opera/9.80 (Android; Linux; Opera Mobi/27; U; en) Presto/2.4.18 Version/10.00","Mozilla/5.0 (S60; SymbOS; Opera Mobi/SYB-1103211396; U; es-LA; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 11.00","Mozilla/5.0 (S60; SymbOS; Opera Mobi/1209; U; it; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 10.1","Mozilla/5.0 (S60; SymbOS; Opera Mobi/1181; U; en-GB; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 10.1","Mozilla/5.0 (Linux armv7l; Maemo; Opera Mobi/4; U; fr; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 10.1","Mozilla/5.0 (Linux armv6l; Maemo; Opera Mobi/8; U; en-GB; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 11.00","Mozilla/5.0 (Android 2.2.2; Linux; Opera Mobi/ADR-1103311355; U; en; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 11.00","Mozilla/4.0 (compatible; MSIE 8.0; S60; SymbOS; Opera Mobi/SYB-1107071606; en) Opera 11.10","Mozilla/4.0 (compatible; MSIE 8.0; Linux armv7l; Maemo; Opera Mobi/4; fr) Opera 10.1","Mozilla/4.0 (compatible; MSIE 8.0; Linux armv6l; Maemo; Opera Mobi/8; en-GB) Opera 11.00","Mozilla/4.0 (compatible; MSIE 8.0; Android 2.2.2; Linux; Opera Mobi/ADR-1103311355; en) Opera 11.00","SonyEricssonW800i/R1BD001/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1","SonyEricssonW800c/R1L Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1","SonyEricssonW800c/R1BC Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1","SonyEricssonW800c/R1AA Browser/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1","SAMSUNG-C5212/C5212XDIK1 NetFront/3.4 Profile/MIDP-2.0 Configuration/CLDC-1.1","MozillaMozilla/4.0 (compatible; Linux 2.6.22) NetFront/3.4 Kindle/2.5 (screen 824x1200;rotate)","Mozilla/4.0 (compatible; Linux 2.6.22) NetFront/3.4 Kindle/2.5 (screen 824x1200;rotate)","Mozilla/4.0 (compatible; Linux 2.6.22) NetFront/3.4 Kindle/2.5 (screen 824x1200; rotate)","Mozilla/5.0 (X11; U; Linux armv7l; ru-RU; rv:1.9.2.3pre) Gecko/20100723 Firefox/3.5 Maemo Browser 1.7.4.8 RX-51 N900","HTC_Touch_3G Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)","Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30","Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30","Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser 1.98.744; .NET CLR 3.5.30729)","Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser 1.98.744; .NET CLR 3.5.30729)","Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser; GTB5; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; InfoPath.1; .NET CLR 3.5.30729; .NET CLR 3.0.30618)","Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; Acoo Browser; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; Avant Browser)"];
//console.log(user_agents[Math.floor(Math.random()*user_agents.length)])
var headerss12 ={} ;
var headerss ={//'Content-Type': 'MyContentType',
    // 'Custom-Header': 'Custom Value',
    'User-Agent': user_agents[Math.floor(Math.random()*user_agents.length)],// 'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    //'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
   // 'Host': host
    //'If-Modified-Since':date1
} ;


app.get('*', function (req, res) {
			if(req.originalUrl.indexOf('robots.txt')>0  || req.originalUrl=="/robots.txt")
			{request.get({url:  'https://www.amazon.com/robots.txt', //URL to hit
				   form: {}, //Specify the method				  
				}, function (error, response, body) {
						  res.end(body);		
		               return;		
				   });
				return;		
			}
			   	
			if(req.originalUrl.indexOf('mynodeserverip')>0  || req.originalUrl=="/mynodeserverip")
			{request.get({url:  'http://ipinfo.pro/', //URL to hit
				   form: {}, //Specify the method				  
				}, function (error, response, body) {
						  res.writeHead(200, response ? response.headers : {});
						  res.end(body);		
		               return;		
				   });
				return;		
			}
var ipc = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

	 var cookies = parseCookies(req);
   var all_origin=["https://rc1.malltina.com","https://malltina.com","https://www.malltina.com","http://malltina.com","http://www.malltina.com","http://localhost:5050","http://localhost:9999"];
 if((req.query.amazon_api_type && req.query.amazon_api_type =="json" && req.headers["origin"] && all_origin.indexOf(req.headers["origin"])!=-1) 
	 || (req.query.amazon_api_type=="test_by_amoza" || (cookies.amazon_api_type && cookies.amazon_api_type=="test_by_amoza" ) )
		//||	!(req.originalUrl=="/clear_db"|| req.originalUrl=="clear_db"|| req.originalUrl=="/clear_db/" )
 )	{



    var par = 'https://www.amazon.com' +  req.originalUrl;
    par=par.replace("amazon_api_type=json", "");
    par=par.replace("amazon_api_type=test_by_amoza", "");
    var requestHeader = {
        'User-Agent':((req.headers['user-agent'])? req.headers['User-Agent']:user_agents[Math.floor(Math.random()*user_agents.length)]),// 'Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0',
      //  'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',//req.headers['accept'],// 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Host': "www.amazon.com",		
        'Accept-Language':" en-US,en;q=0.5",
      //  'Accept-Encoding':" gzip, deflate, br",
        'Referer':par,// "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=phon&rh=i%3Aaps%2Ck%3Aphon",
        'Connection': "keep-alive",
        'Upgrade-Insecure-Requests': "1"
      //  'Cache-Control': "max-age=0"
    };
   if(req.headers["cookie"]) requestHeader["Cookie"]=req.headers["cookie"];
   if(req.headers["Cookie"]) requestHeader["Cookie"]=req.headers["Cookie"];
   //if(req.headers["set-cookie"]) requestHeader["Set-Cookie"]=req.headers["set-cookie"];
   //if(req.headers["Set-Cookie"]) requestHeader["Set-Cookie"]=req.headers["Set-Cookie"];
   //if(req.headers["x-requested-with"]) requestHeader["X-Requested-With"]=req.headers["x-requested-with"];
   
    request({
        url:  par, //URL to hit
        method: req.method //Specify the method
        ,headers: requestHeader
    }, function (error, response, body) {
        if (!error && response && response.statusCode == 200) {
          //  delete   response.headers["x-fn-web"];
        //    delete  response.headers["x-sbe"];
        //    delete  response.headers["x-srv"];
        //    delete  response.headers["x-varnish-ip"];
       //     delete response.headers["Via"];
       //     delete response.headers["X-Varnish"];
        //    delete response.headers["Set-Cookie"];
	   console.log('from req :'+req.originalUrl+'\n');
	   if(req.query.amazon_api_type && req.query.amazon_api_type =="json")	{
		   
		   if(body && body.indexOf('<title dir="ltr">Robot Check</title>')>0)
		   {
			 //  res.json({"page": "9001"});
			       request.post({url:  "https://api.telegram.org/bot457450956:AAEJoIP9jSPTlg0SprrH1xRp6qNlzknv4Nw/sendMessage", //URL to hit
				   form: {
					chat_id:"-1001134355634",
					text:('amazon active capthcha on :'+process.env.OPENSHIFT_APP_DNS +'?amazon_api_type=test_by_amoza'+' \n \n    http://104.236.12.44/public/index.php?url=https://'+process.env.OPENSHIFT_APP_DNS +'?amazon_api_type=test_by_amoza'+'    \n \n requested page:'+ process.env.OPENSHIFT_APP_DNS+req.originalUrl+'\n \n user ip:'+ipc),
				   parse_mode:"HTML",
				   disable_web_page_preview:"true"
				   
				   }, //Specify the method
				  
				}, function (error, response, body) {
						 console.log("send captcha report")  
					   });
					   
				request({url:  "https://amin.malltina.com/reg_url?url="+"https://"+process.env.OPENSHIFT_APP_DNS +'?amazon_api_type=test_by_amoza', //URL to hit
					    method: "GET", //Specify the method
				  
				}, function (error, response, body) {
						 console.log("send captcha report")  
					   });	   
					   
			//		   return;
		   }
		   
			res.writeHead(200, {"Content-Type": "application/json","Access-Control-Allow-Origin":"*"});		   
            body=JSON.stringify({"response":body});
            res.end(body);						
	   }else{
		   if(response.headers["Set-Cookie"] &&  (!cookies.amazon_api_type || cookies.amazon_api_type!="test_by_amoza" ))
			response.headers["Set-Cookie"]=response.headers["Set-Cookie"]+';amazon_api_type='+req.query.amazon_api_type;
		   else if( (!cookies.amazon_api_type || cookies.amazon_api_type!="test_by_amoza" ))
			response.headers["Set-Cookie"]='amazon_api_type='+req.query.amazon_api_type+';';
		
            res.writeHead(200, response ? response.headers : {});
			res.end(body);
	   }
            var  Cach_time=300000;
           // var  Cach_time=0;
		   //if(body && body.indexOf('<title dir="ltr">Robot Check</title>')<0)
           // Query.findOrCreate({query: req.originalUrl},{data:body,expaire_date:Date.now()+Cach_time,header:response.headers},{upsert:true}, function(err, data){});

        } else {

		
            res.json({"page": "5001"});
            return
        }
    });
}
else{


			res.writeHead(501, {"Content-Type": "application/json","Access-Control-Allow-Origin":"*"});	
			res.end('{"page": "505"}');
			
			
			
            return
 }


});



// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});



app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
