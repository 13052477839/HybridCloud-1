define(function(require, exports, module) {

    function Index(){}
    module.exports = Index;

    //====================================
    // init
    //====================================
    Index.prototype.init = function() {
        $('header').load('app/header/header.html');
        $('aside').load('app/sider/sider.html');
    }
});