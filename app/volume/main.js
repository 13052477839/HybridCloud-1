define(function(require){
    var Volume = require('./volume');
    
    return {
        init: function () {
            var volume = new Volume();
            volume.init();
        }
    }
});