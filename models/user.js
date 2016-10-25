NEWSCHEMA('users').make(function(schema) {

	schema.define('email', 'Email', true);
	schema.define('first_name', 'String(80)');
	schema.define('last_name', 'String(80)');

	// Saves the model into the database
	schema.setSave(function(error, model, options, callback) {

		model.datecreated = F.datetime;

        // NOSQL('newsletter').insert(model.$clean()); 
        DATABASE(function(err, connection){

            if(err != null) {
                self.throw500(err);
                return;
            }

            connection.query('INSERT INTO posts SET ?', {first_name: 'test'}, function(err, result) {
                if (err) throw err; 
                console.log(result.insertId); 
    		    callback(SUCCESS(true));
            });
  
        });


	});
	
});