define(function(require, exports, module) {
    
    var Util = require('util/util');

    require('../../assets/adminlte/app.min');
    
    function Sider(){
    }

    module.exports = Sider;

    //================================
    //
    //================================
    Sider.prototype.init = function() {
        $('.sidebar a').click(function() {
           Util.sidebarChange(this);
        });
    }
});