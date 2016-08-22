define(function (require, exports, module) {
    var Util = require('util/util');

    function Add(type) {
        this.type = type;
        this.accountNumber = 0;
        this.id;
    }

    module.exports = Add;

    //=============================
    // init
    //=============================
    Add.prototype.init = function () {

        if (this.type == 'edit') {
            this.initData();
        }

        this.addAcount();
        this.validator();

        $('button, input').tooltip();
    };

    //=============================
    // add account associate
    //=============================
    Add.prototype.addAcount = function () {
        var add = this;
        $('a.add-account').click(function (e) {
            add.addAcountContent();
        });
    };

    //=============================
    // add account html
    //=============================
    Add.prototype.addAcountContent = function () {
        var add = this;
        add.accountNumber++;
        var $accountWrapper = $('<div class="account-wrapper" id="account' + add.accountNumber + '"></div>').appendTo('.accounts');
        $accountWrapper.append('<button class="btn btn-default account-close-btn">x</button><h4>账号' + add.accountNumber + '</h4><div class="clearfix"></div>');
        $accountWrapper.find('.account-close-btn').click(function () {
            $accountWrapper.remove();
        });
        var type = $('<div class="form-group"></div>').appendTo($accountWrapper);
        type.append('<label for="accountType' + add.accountNumber + '" class="col-sm-4 control-label">云服务提供商</label>');
        type.append('<div class="col-sm-7 checkbox"><label><input type="checkbox" name="accounts.type" id="accountType' + add.accountNumber + '" value="aws" checked>AWS</label></div>');
        var account = $('<div class="form-group"></div>').appendTo($accountWrapper);
        account.append('<label for="accountId' + add.accountNumber + '" class="col-sm-4 control-label">账户</label>');
        account.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountId' + add.accountNumber + '" name="accounts.id"></div>');
        var name = $('<div class="form-group"></div>').appendTo($accountWrapper);
        name.append('<label for="accountName' + add.accountNumber + '" class="col-sm-4 control-label">用户名</label>');
        name.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountName' + add.accountNumber + '" name="accounts.name"></div>');
        var password = $('<div class="form-group"></div>').appendTo($accountWrapper);
        password.append('<label for="accountPassword' + add.accountNumber + '" class="col-sm-4 control-label">密码</label>');
        password.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountPassword' + add.accountNumber + '" name="accounts.password"></div>');
        var accessKey = $('<div class="form-group"></div>').appendTo($accountWrapper);
        accessKey.append('<label for="accountAccessKey' + add.accountNumber + '" class="col-sm-4 control-label">AccessKeyId</label>');
        accessKey.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountAccessKey' + add.accountNumber + '" name="accounts.awsAccessKeyId"></div>');
        var secretKey = $('<div class="form-group"></div>').appendTo($accountWrapper);
        secretKey.append('<label for="accountSecretAccessKey' + add.accountNumber + '" class="col-sm-4 control-label">SecretAccessKey</label>');
        secretKey.append(' <div class="col-sm-7"><input type="text" class="form-control" id="accountSecretAccessKey' + add.accountNumber + '" name="accounts.awsSecretAccessKey"></div>');
    };


    //=============================
    // add account validator
    //=============================
    Add.prototype.validator = function () {
        var $form = $('#user-add-form');
        $form.bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'name': {
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '用户名长度必须为6~30位'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能由字母、数字、下划线组成'
                        },
                        callback: {
                            /*message: '此用户名已经存在',
                             callback: function (value, validator) {
                             var e = true;
                             $.ajax({
                             url: '',
                             async: false,
                             type: 'post',
                             data: {
                             'name': value
                             },
                             success: function (result) {
                             if (result.success) {
                             e = false;
                             } else {
                             e = true;
                             }
                             }
                             });
                             return e;
                             }*/
                        }
                    }
                },
                'password': {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 20,
                            message: '密码长度必须为6~20位'
                        }
                    }
                },
                'passwordConfirm': {
                    selector: '#passwordConfirm',
                    validators: {
                        notEmpty: {
                            message: '确认密码不能为空'
                        },
                        callback: {
                            message: '两次密码输入不一致',
                            callback: function (value, validator) {
                                var e = true;
                                if ($('#password').val() != value) {
                                    e = false;
                                }
                                return e;
                            }
                        }
                    }
                },
                'cellphone': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: '电话格式错误'
                        }
                    }
                },
                'email': {
                    validators: {
                        emailAddress: {
                            message: '邮箱格式错误'
                        }
                    }
                }
            },
            submitButtons: '#user-add-submit',
            submitHandler: function (validator, form, submitButton) {
                if (add.type == 'add') {
                    add.addSubmit();
                }
                if (add.type == 'edit') {
                    add.editSubmit();
                }
            }
        });
    };

    //=============================
    // add submit
    //=============================
    Add.prototype.addSubmit = function () {
        var data = {
            name: $('input[name="name"]').val(),
            password: $('input[name="password"]').val(),
            cellphone: $('input[name="cellphone"]').val(),
            email: $('input[name="email"]').val(),
            accounts: []
        };
        var accountWrappers = $('.account-wrapper');
        accountWrappers.each(function (i, v) {
            var account = {
                type: $(v).find('input[name="accounts.type"]').val(),
                id: $(v).find('input[name="accounts.id"]').val(),
                name: $(v).find('input[name="accounts.name"]').val(),
                password: $(v).find('input[name="accounts.password"]').val(),
                awsAccessKeyId: $(v).find('input[name="accounts.awsAccessKeyId"]').val(),
                awsSecretAccessKey: $(v).find('input[name="accounts.awsSecretAccessKey"]').val()
            };
            data.accounts[i] = account;
        });
        $.ajax({
            url: API_URL.USERS,
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.success) {
                    Util.notify('成功！', '添加用户成功！', 'success');
                    window.location.hash = '#/user';
                } else {
                    Util.alertDialog('操作失败！');
                }
            }
        });
    };

    //=============================
    // add submit
    //=============================
    Add.prototype.editSubmit = function () {
        var add = this;
        var data = {
            id: add.id,
            name: $('input[name="name"]').val(),
            password: $('input[name="password"]').val(),
            cellphone: $('input[name="cellphone"]').val(),
            email: $('input[name="email"]').val(),
            accounts: []
        };
        var accountWrappers = $('.account-wrapper');
        accountWrappers.each(function (i, v) {
            var account = {
                type: $(v).find('input[name="accounts.type"]').val(),
                id: $(v).find('input[name="accounts.id"]').val(),
                name: $(v).find('input[name="accounts.name"]').val(),
                password: $(v).find('input[name="accounts.password"]').val(),
                awsAccessKeyId: $(v).find('input[name="accounts.awsAccessKeyId"]').val(),
                awsSecretAccessKey: $(v).find('input[name="accounts.awsSecretAccessKey"]').val()
            };
            if($(v).find('input[name="accounts.sequenceId"]')){
                account['sequenceId'] = $(v).find('input[name="accounts.sequenceId"]').val();
            }
            data.accounts[i] = account;
        });
        $.ajax({
            url: API_URL.USERS + '/' + add.id,
            type: 'put',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.success) {
                    Util.notify('成功！', '编辑用户成功！', 'success');
                    window.location.hash = '#/user';
                } else {
                    Util.alertDialog('操作失败！');
                }
            }
        });
    };

    //=============================
    // init edit data
    //=============================
    Add.prototype.initData = function () {
        var add = this;
        var hash = window.location.hash;
        var id = hash.split('/')[3];
        add.id = id;
        $.ajax({
            url: API_URL.USERS + '/' + id,
            type: 'get',
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    add.dataToForm(result.object);
                } else {
                    Util.alertDialog('获取用户信息失败！');
                    setTimeout(function () {
                        window.location.hash = '#/user';
                    }, 3000);
                }
            }
        })
    };
    //=============================
    // edit data to from
    //=============================
    Add.prototype.dataToForm = function (data) {
        var add = this;
        var $form = $('#user-add-form');
        for (var key in data) {
            if (key != 'accounts' && key != 'id') {
                $form.find('input[name="' + key + '"]').val(data[key]);
            }
        }
        if (data.accounts.length > 0) {
            $.each(data.accounts, function (i, v) {
                add.addAcountContent();
                var $account = $('#account' + (i + 1));
                $account.append('<input type="hidden" name="accounts.sequenceId" value="' + v['sequenceId'] + '">');
                for (var k in v) {
                    if (k != 'type') {
                        $account.find('input[name="accounts.' + k + '"]').val(v[k]);
                    }
                    if (k == 'type') {
                        $account.find('input[name="accounts.' + k + '"][value="' + v[k] + '"]').prop('checked', true);
                    }
                }
            });
        }
    };

});