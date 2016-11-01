// var Agent = require('sqlagent/mysql').connect('connetion-string-to-mysql');
// var sql = new Agent();
var fs = require('fs');

exports.install = function() {
 
    // define routes with actions
    F.route('/', view_index);
    F.route('/login', view_login);
    F.route('/dashboard', view_dashboard, ['authorize']);
    // F.route('/dashboard', view_dashboard );
    F.route('/services/{name}/', view_services);
    F.route('/contact/', view_contact); 
    F.route('/contactus/', view_contact);   
    F.route('/contact/', json_contact, ['post']);

    F.route('/nu/', showNUUsers)
    F.route('/pag/', showPag)
    F.route('/readfile/', read_file)
    F.route('/readfile2/', read_file2)
 
    F.restful('/api/users/', action_query, action_read, action_save, action_remove);
       
	F.websocket('/counter/', socket_reader, ['json']);

    F.use('session');

};

function *read_file(){

    var content     = yield sync(fs.readFile)(F.path.databases('users.nosql'));
    var content2    = yield sync(fs.readFile)(F.path.databases('users-logs.nosql'));

    var ge1 = gen1();

    console.log(ge1.next());
    console.log(ge1.next());
    console.log(ge1.next());
    console.log(ge1.next());
    console.log(ge1.next());
    console.log(ge1.next());
    console.log(ge1);

    this.plain(content.toString('utf8')+''+content2.toString('utf8'))

}

function read_file2(){

    var self = this;
    var content;
    var content2;

    var content = fs.readFile(F.path.databases('users.nosql'),function(err, data){
        content = data
        self.plain(data.toString('utf8'))
    });

    var content = fs.readFile(F.path.databases('users-logs.nosql'),function(err, data){
        content2 = data
        self.plain(data.toString('utf8'))
    })
    // var content2 = fs.readFile(F.path.databases('users-logs.nosql'),'utf8')
  
    // self.plain(content+''+content2)

}

function *gen1(){

    var i = 1
    while( i < 5 )  
        yield i++;
    
    return 'yes';
}

function view_login(){

    this.view('login')

}

function view_dashboard(){

    this.view('dashboard')
    
}
 

function socket_reader() {
	var self = this;
	
    if ( !self.counter ){
        self.counter = 0;
    }
    self.counter++;
 
    var refresh;
    // New player
	self.on('open', function(client) {

		clearTimeout(refresh);
		refresh = setTimeout(() => self.send({ counter: self.counter, id:client.id }), 500);

	});


    // self.on('message', function(client, message) {
        
    //     if(keepsend) clearTimeout(keepsend);
    //     keepsend = setTimeout(function(){
            
	//         client.send({ counter: self.session.counter });

    //     },2000)
        
	// });

}

function action_query(){

}

function action_read(){

}
function action_save(){

}
function action_remove(){

} 

function showPag(){

    var self = this;
 
    var page = (self.query.page || '10').parseInt();
    var perpage = 20;
    var pagination = new Builders.Pagination(1000, page, perpage, '?page={0}');
 
    self.view('pag',pagination);
    
}


function showNUUsers(){
  
    var self = this;

    DATABASE(function(err, connection){

        if(err != null) {
            self.throw500(err);
            return;
        }

 
        var page = (self.query.page || '10').parseInt();
        var perpage = 20;
        var pagination = new Builders.Pagination(1000, page, perpage, '?page={0}'); 
        var start = perpage*(page-1);
     
        // Table schema = { Id: Number, Age: Number, Name: String };
        connection.query('SELECT * FROM users LIMIT '+ start +','+perpage, function(err, users) {

            // Close connection
            connection.release();

            if (err != null) {
                self.view500(err);
                return;
            }

            // Shows the result on a console window
            console.log(users);

            // Send users as the model into the view
            self.view('users', {users:users, pagination: pagination});


        });

    });
	
}

// The action
function view_index() {
    var self = this;
    // The "index" view is routed into the views/index.html
    // ---> Send the response

	if ( !self.session || !self.session.counter ){
		self.session = {};
        self.session.counter = 0;
    }
    

	if ( !self.counter || !self.counter ){ 
        self.counter = 0;
    }

    self.counter++;
	self.session.counter++;  

    console.log(isomorphic.shared.getName());

    
    self.view('index',{counter:self.session.counter, counter2 : self.counter});

}

function view_services(name) {
    var self = this;
    // The "services" view is routed into the views/services.html
    // A second argument is the model
    // ---> Send the response
    self.view('services', { category: name });
}

function view_contact() {
    var self = this;
    // "contact" view is routed to views/contact.html
    // ---> Send the response
    self.view('contact');
}

function json_contact() {
    var self = this;

    // Get the data from the request body.
    // The data are parsed into the object automatically.
    var model = self.body;

    // e.g.
    // model.email
    // model.name

    // Send the mail to our company
    var message = self.mail('info@company.com', 'Contact form', 'mail-template', model);
    message.reply(model.email);

    // ---> and send the response in JSON format
    self.json({ success: true });
}