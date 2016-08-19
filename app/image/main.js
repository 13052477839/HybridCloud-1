define(function(require){
    var Image = require('./image');
    
    return {
        init: function () {
            var image = new Image();
            image.init();
        }
    }
});