// var Agent = require('sqlagent/mysql').connect('connetion-string-to-mysql');
// var sql = new Agent();

exports.install = function() {
  
	F.route('/blocky/', function(){ 
        this.view('blocky/index');
    });
    F.route('/blocky/sync', action_blocky_sync)
      
};

function action_blocky_sync(){

    this.plain('test');
    
}
 