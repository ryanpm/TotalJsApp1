// INSTALL('module', 'https://modules.totaljs.com/session/v1.01/session.js');


F.onLocate = function(req) {
    if (req.query.language === 'zh-HANS')
        return 'zh-HANS';
    return 'en';
};

// var redis = require('redis');
// F.on('install', function(type, name) {

//     console.log(type);
//     console.log(name);
 
//     if (type !== 'module')
//         return;

//     if (name !== 'session')
//         return;

//     var session = MODULE('session').instance;

//     session.onRead = function(id, callback) {
//         var client = redis.createClient();
//         console.log('write session = '+id)
//         client.get('session_' + id, function(err, reply) {
//             console.log(reply)
//             client.quit();
//             callback(err ? {} : reply === null ? {} : JSON.parse(reply.toString()));
//         });
//     };

//     session.onWrite = function(id, value) {
//         var client = redis.createClient();
//         console.log('read session = '+id)
//         console.log(value)
//         client.set('session_' + id, JSON.stringify(value));
//         client.quit();
//     };
 
// });