exports.install = function(){

    F.route('songlist/add', view_add);
    F.route('songlist/list', view_list);

    F.restful('/songlist/song/', action_query, action_read, action_save, action_remove);

}

function action_query(){
}
function action_read(){
}
function action_save(){
}
function action_remove(){
} 


function view_list(){
    var self = this;

    self.view('add');
}


function view_add(){
    var self = this;

    self.view('add');
}