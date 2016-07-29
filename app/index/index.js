define(function(require, exports, module) {

    function Index(){}
    module.exports = Index;

    //====================================
    // init
    //====================================
    Index.prototype.init = function() {
        $('header.main-header').load('app/header/header.html');
        $('aside.main-sidebar').load('app/sider/sider.html');
        //$('footer.main-footer').load('app/footer/footer.html');
    }
});