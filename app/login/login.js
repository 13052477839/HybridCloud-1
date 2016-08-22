define(function (require, exports, module) {
    function Login() {
    }

    module.exports = Login;

    //=========================
    // init
    //=========================
    Login.prototype.init = function () {

        this.loginValid();

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
                'name': {
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
                }
            },
            submitHandler: function (validator, form, submitButton) {
                alert('haha');
            }
        });

    };


});