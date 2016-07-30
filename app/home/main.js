define(function(require){
    var Home = require('./home');
    
    return {
        init: function () {
            var home = new Home();
            home.init();
        }
    }
});