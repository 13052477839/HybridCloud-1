define(function(require, exports, module){

    var Util = require('util/util');

    function User(){}

    module.exports = User;

    //==============================
    // init
    //==============================
    User.prototype.init = function () {
        this.userTable();
    };

    //==============================
    // userTable
    //==============================
    User.prototype.userTable = function(){
        var $table = $('#userTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(),{
            url: API_URL.USER,
            dataField: 'res',
            columns: [{
                checkbox: true
            },{
                title: '用户名',
                field: 'name'
            },{
                title: '创建者',
                field: 'creater'
            },{
                title: '电话',
                field: 'phone'
            },{
                title: '邮箱',
                field: 'email'
            }]
        }));
        $('.bootstrap-table .search input').attr('placeholder', '')
            .parent().append('<span></span>');
        $('.fixed-table-container').append('<div class="fixed-table-footerButtons"><button disabled>删除</button></div>');
        $table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
            $('.fixed-table-footerButtons button').prop('disabled', !$table.bootstrapTable('getSelections').length);
        });
    }
});