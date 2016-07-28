define(function(require){
    var Sider = require('./sider');


    return {
        init: function() {
            var sider = new Sider();
            sider.init();
        }
    }

});