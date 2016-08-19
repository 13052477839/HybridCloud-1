define(function(require){
    var Instance = require('./instance');
    
    return {
        init: function () {
            var instance = new Instance();
            instance.init();
        }
    }
});