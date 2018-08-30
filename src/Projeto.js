// LIBS
const http  = require('http');
const mysql = require('mysql');

// CLASSES
const Page = require('./handlers/Page.js');

function Projeto (port){
	this.app = http.createServer(Page.execute);
	this.db = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'vueDB'
	});

	this.app.listen(port);
	Page.loadPages();
}

module.exports = Projeto;
