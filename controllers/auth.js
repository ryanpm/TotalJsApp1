exports.install = function() {
	F.route('/auth/login', json_login, ['post', '*User']);
	F.route('/auth/logout/', logout, ['authorize']);
	F.route('/auth/signup/', signup, ['post', '*User']);
};
 
function json_login() {
	var self = this;
	self.body.$workflow('login', self, self.callback());
}

function logout() {
	var self = this;
	self.res.cookie(F.config.cookie, '', new Date().add('-1 year'));
	self.redirect('/');
}

function signup() {
    
	var self = this;
 
    self.password = MODULE('bcrypt').cryptPassword('self.password') 
	self.body.$save(self.callback());

    // Writes logs
    // NOSQL('users-logs').insert({ id: response.id, email: response.email, ip: controller.ip, date: new Date() });

     
}