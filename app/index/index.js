define(function(require, exports, module) {

    function Index(){}
    module.exports = Index;

    //====================================
    // init
    //====================================
    Index.prototype.init = function() {
        $('header.main-header').load('app/header/header.html?v=' + version);
        $('aside.main-sidebar').load('app/sider/sider.html?v=' + version);
        //$('footer.main-footer').load('app/footer/footer.html');
        $('div.content-wrapper').load('app/home/home.html?v=' + version);
    }
});