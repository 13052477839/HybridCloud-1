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
    };

    //==============================
    // delete user
    //==============================
    User.prototype.delete = function () {
        $('#btn-user-delete').click(function () {
            var selections = $('#userTable').bootstrapTable('getSelections');
            if (selections.length == 0) {
                $('#dialog-alert p').text('未选择！');
                $('#dialog-alert').modal({
                    backdrop : true,
                    keyboard : true,
                    show : true
                });
            } else {
                $('#dialog-confirm p').text('确认删除所选用户及其关联账号吗？');
                $('#dialog-confirm').modal({
                    backdrop: true,
                    keyboard: true,
                    show: true
                });
                $('#dialog-confirm .btn-confirm').unbind().click(function () {
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
                                $('#userTable').bootstrapTable('refresh');
                            } else {
                                $('#dialog-confirm p').text('删除失败');
                                $('#dialog-confirm').modal({
                                    backdrop: true,
                                    keyboard: true,
                                    show: true
                                });
                            }
                        }
                    });
                });
            }
        });
    }
});