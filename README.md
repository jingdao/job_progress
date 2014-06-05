job_progress
============

Client side progress bar for NodeJS server processes.
When the client requests a long running job to
be performed on the server, the client is shown
a progress bar which continously polls the
server for the current job progress.

Usage
-----

Example NodeJS server code:

	var jp = require('job_progress');
	server = http.createServer( ... ).listen();
	jp.connectServer(server); //establishes a server
	
	server.on('request',function(req,res) {
		...
		...
		jp.addJob(
			res, //server response object
			url, //redirect url after job is done
			function(job) { //function to be executed as job
			...
			...
			job.update(10); //updates progress of job in percent
			...
		});
	});	
	

Example console log:

	job_progress.js: added job[0] with url /index.html
	job_progress.js: ending job[0]

A working example can be found in the examples folder.

Screenshot
---

![](example/screenshot.png)

References
---

[Progress bar](http://red-team-design.com/wp-content/uploads/2011/11/css3-slick-progress-bars-demo.html)


