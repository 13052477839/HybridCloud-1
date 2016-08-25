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
        
        $('#verifyCodeRefresh').click(function(){
            login.verifyCode();
        });

    };

    //=========================
    // verifyCode
    //=========================
    Login.prototype.verifyCode = function () {
        $('#verifyCodeImg').attr('src', API_URL.LOGIN + '/validatecode?v=' + new Date());
    };

    //=========================
    // login valid
    //=========================
    Login.prototype.loginValid = function () {
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
                        }
                    }
                }
            },
            submitHandler: function (validator, form, submitButton) {
                $.ajax({
                    timeout: 10000,
                    url: API_URL.LOGIN,
                    type: 'post',
                    data : form.serialize(),
                    dataType: 'json',
                    success: function(result) {
                        if(result){
                            window.location.href = BASE;
                        }else{
                            $.Notify({
                                caption: '登录失败！',
                                content: '用户名或密码错误！',
                                type: 'alert'
                            });
                        }
                    },
                    error: function(result){
                        $.Notify({
                            caption: '登录失败！',
                            content: '系统异常或连接超时！',
                            type: 'alert'
                        });
                    }
                })
            }
        });

    };

});