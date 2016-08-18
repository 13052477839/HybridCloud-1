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
            Util.sidebarChange($('a[href="'+window.location.hash+'"]'));
        }, false);
        var hashNow = window.location.hash;
        if(hashNow == '#/home') {
            Util.sidebarChange($('a[href="'+window.location.hash+'"]'));
        }else {
            window.location.hash = '#/home';
        }
    }
});