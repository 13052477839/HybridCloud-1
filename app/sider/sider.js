define(function (require, exports, module) {

    var Util = require('util/util');

    require('../../assets/adminlte/app.min');

    function Sider() {
    }

    module.exports = Sider;

    //================================
    //
    //================================
    Sider.prototype.init = function () {
        $('.sidebar a').click(function () {
            Util.sidebarChange(this);
        });
        window.addEventListener("hashchange", function(){
            Util.sidebarChange($('a[href="'+window.location.hash+'"]'));
        }, false);
        window.location.hash = '#/home';
        Util.sidebarChange($('a[href="'+window.location.hash+'"]'));
    }
});