define(function(require){
    var Overview = require('./overview');
    
    return {
        init: function () {
            var overview = new Overview();
            overview.init();
        }
    }
});