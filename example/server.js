var http = require('http');
var fs = require('fs');
var jp = require('job_progress');
var portNumber = 12345;

server = http.createServer(function(req,res) {
	if (req.url=='/do_something') {
		jp.addJob(res,'/index.html',function(job) {
			//imitate long running process
			setTimeout(function(){job.update(10);},1000);
			setTimeout(function(){job.update(20);},2000);
			setTimeout(function(){job.update(30);},3000);
			//finish job
			setTimeout(function(){job.update(100);},4000);
		});
	}
	fs.readFile('index.html', function(err, data){
		if (err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.end();
		}
		res.writeHead(200, {"Content-Type": 'text/html'});
		res.end(data);
		return;
	});
}).listen(portNumber);

jp.connectServer(server);

process.on('SIGINT',function() {
	console.log('\nServer interrupted');	
	process.exit();
});

console.log('Listening on port '+portNumber+': ......');
