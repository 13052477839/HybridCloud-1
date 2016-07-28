define(function(require){
    var Index = require('./index');
    
    
    return {
        init: function() {
            var index = new Index();
            index.init();
        }
    }
    
});