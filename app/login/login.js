define(function(require, exports, module){
    function Login(){}
    module.exports = Login;

    //=========================
    // init
    //=========================
    Login.prototype.init = function() {

        this.loginValid();

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        });
    };

    //=========================
    // login valid
    //=========================
    Login.prototype.loginValid = function() {
        $('#loginForm').bootstrapValidator({
            feedbackIcons: {
                valid: '',
                invalid: '',
                validating: ''
            },
            fields: {
              'email': {
                  validators: {
                      notEmpty: {
                          message: '邮箱不能为空！'
                      },
                      emailAddress: {
                          message: '邮箱格式不对！'
                      }
                  }
              }
            },
            submitHandler: function(validator, form, submitButton) {
                alert('haha');
            }
        });

    };


});