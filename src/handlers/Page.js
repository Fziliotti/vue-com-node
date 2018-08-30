const fs = require("fs");

const DEFAULT_HEADER = {'Content-Type': 'application/json'};

function Page(address){
	this.address = address;
  	this._execute = new Function();
	
	// Colocando a página no array
	Page.pages.push(this);
}
Page.pages = new Array();

module.exports = Page;

Page.prototype.execute = function(req, callback) {
	setTimeout(() => callback({foo: "bar"}), 300);
};

Page.loadPages = function(){
	let files = fs.readdirSync("./src/handlers/pages/");
	console.log(files);
};

Page.execute = function(req, res) {
	var target = Page.pages.find(p =>
			"/" + p.address.toLowerCase() === req.url.toLowerCase()),
     startTime = (new Date()).getTime();
	
  	// Tratando target não existente
  	if(!target){
    	res.writeHead(404, DEFAULT_HEADER);
      	res.write(JSON.stringify({
        	success: false,
          	error:   `Couldn't find "${req.url}" endpoint`
        }));
      	res.end();
    	return;
    }

	res.writeHead(200, DEFAULT_HEADER);
	target.execute(req, function(obj) {
      	obj.success = true;
      	obj.time    = ((new Date()).getTime() - startTime) / 1e3;
  
    	res.write(JSON.stringify(obj));
      	res.end();
    });
};
