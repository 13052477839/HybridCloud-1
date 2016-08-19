define(function (require, exports, module) {

    var Util = require('util/util');

    require('../../assets/adminlte/app.min');

    function Sider() {
    }

    module.exports = Sider;

    //================================
    // init
    //================================
    Sider.prototype.init = function () {
        window.addEventListener("hashchange", function(){
            Util.hashChange(window.location.hash);
        }, false);
        var hashNow = window.location.hash;
        if(hashNow == '#/overview') {
            Util.hashChange(window.location.hash);
        }else {
            window.location.hash = '#/overview';
        }
    }
});