define(function(require){
    var PublicIp = require('./publicIp');
    
    return {
        init: function () {
            var publicIp = new PublicIp();
            publicIp.init();
        }
    }
});