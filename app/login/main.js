define(function(require){
    var Login = require('./login');
    return {
        init: function() {
            var login = new Login();
            login.init();
        }
    }

});