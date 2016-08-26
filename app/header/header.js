define(function (require, exports, module) {
    var Util = require('util/util');

    function Header() {
    }

    module.exports = Header;

    //================================
    // init
    //================================
    Header.prototype.init = function () {
        this.theme();
        this.feedback();
        this.help();
        this.user();
        this.logout();
    };

    //================================
    //  theme
    //================================
    Header.prototype.theme = function () {
        $('#theme').click(function () {
            if ($('body').is('.skin-blue-light')) {
                $('body').removeClass('skin-blue-light').addClass('skin-blue');
            } else {
                $('body').removeClass('skin-blue').addClass('skin-blue-light');
            }
        });
    };

    //================================
    //  feedback
    //================================
    Header.prototype.feedback = function () {
        $('#feedback').click(function () {
            Util.alertDialog('敬请期待！');
        });
    };

    //================================
    //  help
    //================================
    Header.prototype.help = function () {
        $('#help').click(function () {
            Util.alertDialog('敬请期待！');
        });
    };

    //================================
    //  user
    //================================
    Header.prototype.user = function () {
        var userId = window.localStorage.userId;
        var userName = window.localStorage.userName;
        if (userName && userName.trim() != '' && userName != 'undefined') {
            $('.user-menu > a span:first').html(userName);
            $('.myaccount').attr('href', '#/user/account/' + userId);
        } else {
            window.location.href = 'login.html';
        }
    };

    //================================
    // log out
    //================================
    Header.prototype.logout = function () {
        $('.logout').click(function () {
            $.ajax({
                url: API_URL.LOGIN + '/exit',
                type: 'post',
                dataType: 'json',
                success: function(result) {
                    if(result.success){
                        window.localStorage.clear();
                        window.location.href = 'login.html';
                    }else{
                        Util.alertDialog('系统异常，无法正常退出！');
                    }
                }
            });
        });
    };

});