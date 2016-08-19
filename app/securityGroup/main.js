define(function(require){
    var SecurityGroup = require('./securityGroup');
    
    return {
        init: function () {
            var securityGroup = new SecurityGroup();
            securityGroup.init();
        }
    }
});