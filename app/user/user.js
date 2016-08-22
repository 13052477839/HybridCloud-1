define(function (require, exports, module) {

    var Util = require('util/util');

    function User() {
    }

    module.exports = User;

    //==============================
    // init
    //==============================
    User.prototype.init = function () {
        this.userTable();
        this.delete();
        $('button, input').tooltip();
    };

    //==============================
    // userTable
    //==============================
    User.prototype.userTable = function () {
        var $table = $('#userTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.USERS,
            toolbar: '#userTableToolbar',
            dataField: 'object',
            detailView: true,
            columns: [{
                checkbox: true
            }, {
                title: 'ID',
                field: 'id',
                visible: false
            }, {
                title: '用户名',
                field: 'name'
            }, {
                title: '密码',
                field: 'password'
            }, {
                title: '电话',
                field: 'cellphone'
            }, {
                title: '邮箱',
                field: 'email'
            }]
        }));
        $('.bootstrap-table .search input').attr('placeholder', '')
            .parent().append('<span></span>');
        $('.fixed-table-container').append('<div class="fixed-table-footerButtons"><button disabled id="btn-user-delete">删除</button></div>');
        $table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
            $('.fixed-table-footerButtons button').prop('disabled', !$table.bootstrapTable('getSelections').length);
        });
        $table.on('expand-row.bs.table', function (e, index, row, $detail) {
            $detail.html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>');
            $.ajax({
                url: API_URL.USERS + '/' + row.id,
                type: 'get',
                dataType: 'json',
                success: function (result) {
                    if (result.success && result.object.accounts.length > 0) {
                        $detail.html('<div class="account-detail-wrapper"></div>');
                        var accounts = result.object.accounts;
                        $.each(accounts, function (i, v) {
                            $account = $('<div class="col-sm-5 account-detail"></div>').appendTo('.account-detail-wrapper');
                            $account.append('<h4>账号' + (i + 1) + '</h4>');
                            $account.append('<span><b>type: </b>' + v.type + '</span><br>');
                            $account.append('<span><b>id: </b>' + v.id + '</span><br>');
                            $account.append('<span><b>name: </b>' + v.name + '</span><br>');
                            $account.append('<span><b>password: </b>' + v.password + '</span><br>');
                            $account.append('<span><b>AccessKeyId: </b>' + v.awsAccessKeyId + '</span><br>');
                            $account.append('<span><b>SecretAccessKey: </b>' + v.awsSecretAccessKey + '</span><br>');
                        });

                    } else {
                        $detail.html('无关联账号数据');
                    }
                }
            })
        });
    };

    //==============================
    // delete user
    //==============================
    User.prototype.delete = function () {
        $('#btn-user-delete').click(function () {
            var selections = $('#userTable').bootstrapTable('getSelections');
            if (selections.length == 0) {
                Util.alertDialog('未选择！');
            } else {
                Util.confirmDialog('确认删除所选用户及其关联账号吗？', function () {
                    var ids = '';
                    $.each(selections, function (i, v) {
                        ids += v.id + ',';
                    });
                    ids = ids.substr(0, ids.length - 1);
                    $('#dialog-confirm').modal('hide');
                    $.ajax({
                        url: API_URL.USERS,
                        data: {
                            'ids': ids
                        },
                        type: 'delete',
                        dataType: 'json',
                        success: function (result) {
                            if (result.success) {
                                Util.notify('成功！','删除用户成功！','success');
                                $('#userTable').bootstrapTable('refresh');
                            } else {
                                Util.alertDialog('删除失败');
                            }
                        }
                    });
                });
            }
        });
    }
});