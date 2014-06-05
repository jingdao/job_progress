var url = require('url');
var fs = require('fs');

var jobCount=0;
var maxJobs= 4;
var jobs = new Array(maxJobs);

function Job(url) {
	this.url=url;
	this.progress=0;
	this.update = function(n) {
		this.progress=n;
	};
}


exports.connectServer=function(server) {
	server.on('request',function(req,res) {
		u = url.parse(req.url);
		if (u.pathname=='/job') {
			if (jobs[u.query]==undefined) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.end();
			} else {
				res.writeHead(200,{'Content-Type':'text/html'});
				data = fs.readFileSync('node_modules/job_progress/progress.html');
				res.end(data);
			}
		} else if (u.pathname=='/jobprogress') {
			if (jobs[u.query]==undefined) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.end();
			} else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				if (jobs[u.query].progress>=100) {
					res.end(jobs[u.query].url);
					console.log('job_progress.js: ending job['+u.query+']');
					delete jobs[u.query];
				}
				else res.end(''+jobs[u.query].progress);
			}
		}	
	});
};
exports.addJob=function(res,url,callback) {
	for (i=0;i<maxJobs;i++) {
		if (jobs[i]==undefined) {
			jobs[i]=new Job(url);
			break;
		}
	}
	if (i==maxJobs) {
		console.log('job_progress.js: maxJobs limit reached ('+maxJobs+')');
		res.writeHead(500, {"Content-Type": "text/plain"});
		res.end();
	} else {
		console.log('job_progress.js: added job['+i+'] with url '+url);
		res.writeHead(302,{'Location':'/job?'+i});
		res.end();
		callback(jobs[i]);
	}
}


