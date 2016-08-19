define(function(require){
    var Network = require('./network');
    
    return {
        init: function () {
            var network = new Network();
            network.init();
        }
    }
});