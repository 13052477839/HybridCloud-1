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
        this.generateSidebarMenu();
        window.addEventListener("hashchange", function () {
            Util.hashChange(window.location.hash);
        }, false);
        var hashNow = window.location.hash;
        if (hashNow == '#/overview') {
            Util.hashChange(window.location.hash);
        } else {
            window.location.hash = '#/overview';
        }
    };

    //================================
    // generate sidebar menu
    //================================
    Sider.prototype.generateSidebarMenu = function () {
        var roleId = window.localStorage.roleId;
        var menu;
        switch (roleId) {
            case '1':
                menu = [
                    '<li class="header">云资源</li>',
                    '<li><a href="#/overview"><i class="overview"></i><span>总览</span></a></li>',
                    '<li class="header">用户管理</li>',
                    '<li><a href="#/user"><i class="user"></i><span>用户</span></a></li>'
                ].join('');
                break;
            case '2':
                menu = [
                    '<li class="header">云资源</li>',
                    '<li><a href="#/overview"><i class="overview"></i><span>总览</span></a></li>',
                    '<li><a href="#/instance"><i class="instance"></i><span>云主机</span></a></li>',
                    '<li><a href="#/volume"><i class="volume"></i><span>云硬盘</span></a></li>',
                    '<li><a href="#/image"><i class="image"></i><span>镜像</span></a></li>',
                    '<li><a href="#/network"><i class="network"></i><span>网络</span></a></li>',
                    '<li><a href="#/publicIp"><i class="public-ip"></i><span>公网IP</span></a></li>',
                    '<li><a href="#/securityGroup"><i class="security-group"></i><span>安全组</span></a></li>'
                ].join('');
                break;
            default:
                break;
        }
        $('ul.sidebar-menu').html(menu);
    };
});