define(function(require, exports, module) {
    var Util = require('util/util');

    function Index(){
        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
    }
    module.exports = Index;

    //====================================
    // init
    //====================================
    Index.prototype.init = function() {
        $('header.main-header').load('app/header/header.html?v=' + version);
        $('aside.main-sidebar').load('app/sider/sider.html?v=' + version);
        //$('footer.main-footer').load('app/footer/footer.html');
    }
});