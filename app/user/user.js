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
        this.lock();
        this.unlock();
        $('button, input').tooltip();
    };

    //==============================
    // userTable
    //==============================
    User.prototype.userTable = function () {
        var user = this;
        var $table = $('#userTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.USERS,
            toolbar: '#userTableToolbar',
            dataField: 'list',
            detailView: true,
            sortName: 'name',
            sortOrder: 'asc',
            columns: [{
                checkbox: true
            }, {
                title: 'ID',
                field: 'id',
                visible: false
            }, {
                title: '用户名',
                field: 'name',
                sortable: true
            }, {
                title: '密码',
                field: 'password'
            }, {
                title: '电话',
                field: 'cellphone'
            }, {
                title: '邮箱',
                field: 'email'
            }, {
                title: '角色',
                field: 'roleId',
                formatter: function (value, row, index) {
                    if (value == 2) {
                        return '普通用户';
                    }
                    if (value == 1) {
                        return '管理员';
                    }
                }
            }, {
                title: '状态',
                field: 'status',
                formatter: function (value, row, index) {
                    if (value == 2) {
                        return '<span class="label label-danger">锁定</span>';
                    } else if (value == 1) {
                        return '<span class="label label-success">激活</span>';
                    } else {
                        return value;
                    }
                }
            }, {
                title: '操作',
                field: '',
                //events: operateEvents,
                formatter: user.operateFormatter
            }]
        }));
        $('.bootstrap-table .search input').attr('placeholder', '')
            .parent().append('<span></span>');
        var buttons = [
            '<div class="fixed-table-footerButtons">',
            '<button disabled id="btn-user-delete">删除</button>',
            '<button disabled id="btn-user-lock">锁定</button>',
            '<button disabled id="btn-user-unlock">激活</button></div>'
        ].join('');
        $('.fixed-table-container').append(buttons);
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
                            var status = '';
                            switch (v.status) {
                                case 0:
                                    status = '<span class="label label-warning">待审核</span>';
                                    break;
                                case 1:
                                    status = '<span class="label label-success">可用</span>';
                                    break;
                                case 2:
                                    status = '<span class="label label-danger">禁用</span>';
                                    break;
                            }
                            $account = $('<div class="col-sm-5 account-detail"></div>').appendTo($detail.find('.account-detail-wrapper'));
                            $account.append('<div class="account-detail-title"><h4>账号' + (i + 1) + '</h4> ' + status + '</div>');
                            $account.append('<span><b>别名: </b>' + v.alias + '</span><br>');
                            $account.append('<span><b>云服务提供商: </b>' + v.type + '</span><br>');
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
                    $('#dialog-confirm').modal('hide');
                    var delFlag = true;
                    $.each(selections, function (i, v) {
                        $.ajax({
                            url: API_URL.USERS + '/' + v.id,
                            type: 'delete',
                            dataType: 'json',
                            async: false,
                            success: function (result) {
                                if (result.success) {

                                } else {
                                    delFlag = false;
                                    return false;
                                }
                            }
                        });
                    });
                    if (delFlag) {
                        Util.notify('成功！', '删除用户成功！', 'success');
                        $('#userTable').bootstrapTable('refresh');
                    } else {
                        Util.alertDialog('删除失败');
                    }

                });
            }
        });
    };

    //==============================
    // operate formatter
    //==============================
    User.prototype.operateFormatter = function (value, row, index) {
        return [
            '<a class="user-edit" href="#/user/edit/' + row.id + '" data-toggle="tooltip" title="编辑">',
            '<i class="glyphicon glyphicon-pencil"></i>',
            '</a>'
        ].join('');
    };

    //==============================
    // lock user
    //==============================
    User.prototype.lock = function () {
        var user = this;
        $('#btn-user-lock').click(function () {
            var selections = $('#userTable').bootstrapTable('getSelections');
            if (selections.length == 0) {
                Util.alertDialog('未选择！');
            } else {
                Util.confirmDialog('确认锁定所选用户账号吗？', function () {
                    $('#dialog-confirm').modal('hide');
                    if (user.changeStatus(selections, 2)) {
                        Util.notify('成功！', '锁定用户成功！', 'success');
                        $('#userTable').bootstrapTable('refresh');
                    } else {
                        Util.alertDialog('锁定用户失败！');
                    }
                });
            }
        });
    };

    //==============================
    // unlock user
    //==============================
    User.prototype.unlock = function () {
        var user = this;
        $('#btn-user-unlock').click(function () {
            var selections = $('#userTable').bootstrapTable('getSelections');
            if (selections.length == 0) {
                Util.alertDialog('未选择！');
            } else {
                Util.confirmDialog('确认激活所选用户账号吗？', function () {
                    $('#dialog-confirm').modal('hide');
                    var unlockFlag = true;
                    if (user.changeStatus(selections, 1)) {
                        Util.notify('成功！', '激活用户成功！', 'success');
                        $('#userTable').bootstrapTable('refresh');
                    } else {
                        Util.alertDialog('激活用户失败！');
                    }
                });
            }
        });
    };

    //==============================
    // change user status
    //==============================
    User.prototype.changeStatus = function (selections, status) {
        var flag = true;
        $.each(selections, function (i, v) {
            $.ajax({
                url: API_URL.USERS + '/' + v.id + '/' + status,
                type: 'put',
                dataType: 'json',
                async: false,
                success: function (result) {
                    if (result.success) {
                    } else {
                        flag = false;
                        return false;
                    }
                }
            });
        });
        return flag;
    };
});