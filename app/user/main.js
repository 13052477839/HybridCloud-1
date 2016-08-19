define(function(require){
    var User = require('./user');
    
    return {
        init: function () {
            var user = new User();
            user.init();
        }
    }
});