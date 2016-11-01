// Very important for transferring of code between server-side and client-side.
// The framework supports several ways how to transfer code into the client-side.
exports.url = '/shared.js';

// Change manually isomorphic library name:
// exports.id = 'my-new-name';

exports.getName = function() {
    // is_server == is a global variable
    // is_client == is a global variable 
    return 'total.js' + (is_server ? ' (called from server)' : ' (called from client)');
};
