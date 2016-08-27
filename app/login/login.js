define(function (require, exports, module) {
    function Login() {
    }

    module.exports = Login;

    //=========================
    // init
    //=========================
    Login.prototype.init = function () {

        var login = this;

        this.loginValid();

        this.verifyCode();

        $('#verifyCodeRefresh').click(function () {
            login.verifyCode();
        });

    };

    //=========================
    // verifyCode
    //=========================
    Login.prototype.verifyCode = function () {
        //$('#verifyCodeImg').attr('src', API_URL.LOGIN + '/validatecode?v=' + new Date());
    };

    //=========================
    // login valid
    //=========================
    Login.prototype.loginValid = function () {
        var login = this;
        $('#loginForm').bootstrapValidator({
            feedbackIcons: {
                valid: '',
                invalid: '',
                validating: ''
            },
            fields: {
                'username': {
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空！'
                        }
                    }
                },
                'password': {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空！'
                        }
                    }
                },
                'validatecode': {
                    validators: {
                        notEmpty: {
                            message: '验证码不能为空！'
                        },
                        stringLength: {
                            max: 4,
                            message: '验证码最大不能超过4位！'
                        }

                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                var data = {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    validatecode: $('#verifyCode').val()
                };
                $.ajax({
                    timeout: 10000,
                    url: API_URL.LOGIN,
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function (result) {
                        if (result.success) {
                            var object = result.object;
                            //window.localStorage.accessToken = object.token;
                            window.localStorage.userId = object.user.id;
                            window.localStorage.userName = object.user.name;
                            window.localStorage.accounts = JSON.stringify(object.user.accounts);
                            window.location.href = BASE;
                        } else {
                            $.Notify({
                                caption: '登录失败！',
                                content: result.message,
                                type: 'alert'
                            });
                            login.verifyCode();
                        }
                    },
                    error: function (result) {
                        $.Notify({
                            caption: '登录失败！',
                            content: '系统异常或连接超时！',
                            type: 'alert'
                        });
                        login.verifyCode();
                    }
                })
            }
        });

    };

});