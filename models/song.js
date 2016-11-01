NEWSCHEMA('Song').make(function(schema){

    schema.define('title', String,true);
    schema.define('content', String, true);

    schema.setSave(function(error,model,controller,callback){

        NOSQL('songs').insert(model);
        callback(SUCCESS(true));
        

    });

});