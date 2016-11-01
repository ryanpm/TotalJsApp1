// ================================================
// AUTHORIZATION
// ================================================

F.onAuthorize = function(req, res, flags, callback) {

	var cookie = req.cookie(F.config.cookie);
	if (!cookie || cookie.length < 10) {
		callback(false);
		return;
	}

	var obj = F.decrypt(cookie, 'user');

	if (!obj || obj.ip !== req.ip) {
		callback(false);
		return;
	}

	var user = F.cache.read('user_' + obj.id);
	if (user) {
		req.user = user;
		callback(true);
		return;
	}
 
	NOSQL('users').find().make(function(builder) {
		builder.where('id', obj.id);
		builder.first();
		builder.callback(function(err, response) {
			if (!response)
				return callback(false);
			F.cache.add('user_' + response.id, response, '5 minutes');
			callback(true, response);
		});
	});


};