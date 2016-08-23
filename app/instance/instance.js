define(function (require, exports, module) {

    var Util = require('util/util');

    function Instance() {
    }

    module.exports = Instance;

    //==============================
    // init
    //==============================
    Instance.prototype.init = function () {
        this.instanceTable()
    };

    //==============================
    // instance table
    //==============================
    Instance.prototype.instanceTable = function () {
        var instance = this;
        var $table = $('#instanceTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.INSTANCES,
            toolbar: '#instanceTableToolbar',
            dataField: 'list',
            //detailView: true,
            //sortName: 'name',
            //sortOrder: 'asc',
            columns: [{
                checkbox: true
            }, {
                title: 'ID',
                field: 'instanceId',
                visible: true
            }, {
                title: '类型',
                field: 'instanceType'
            }, {
                title: '可用区',
                field: 'availabilityZone'
            }, {
                title: '状态',
                field: 'instanceState',
                formatter: function (value, row, index) {
                    if (value === 'running') {
                        return '<i class="run-status run-status-running"></i> ' + value;
                    }
                    else if(value === 'stopped'){
                        return '<i class="run-status run-status-stopped"></i> ' + value;
                    }else {
                        return value;
                    }
                }
            }, {
                title: '平台',
                field: 'platform',
                visible: false
            }, {
                title: '公有DNS',
                field: 'dnsName',
                visible: false
            }, {
                title: '公网IP',
                field: 'publicIpAddress'
            }, {
                title: '秘钥名称',
                field: 'keyName'
            }, {
                title: '监控',
                field: 'monitoring'
            }, {
                title: '启动时间',
                field: 'launchTime',
                formatter: function (value, row, index) {
                    var date = new Date(value);
                    return moment(date).format('LLL');
                }
            }, {
                title: '安全组',
                field: '',
                formatter: function (value, row, index) {
                    var sg = row.securityGroups;
                    return sg[0].securityGroupName;
                }
            }, {
                title: '拥有者',
                field: 'owner',
                visible: false
            }, {
                title: '虚拟化',
                field: 'virtualizationType',
                visible: false
            }, {
                title: '操作',
                field: '',
                //events: operateEvents,
                formatter: instance.operateFormatter
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
    // operateFormatter
    //==============================
    Instance.prototype.operateFormatter = function (value, row, index) {
        return [
            '<a class="image-edit" href="#/instance/edit/' + row.id + '" data-toggle="tooltip" title="编辑">',
            '<i class="glyphicon glyphicon-pencil"></i>',
            '</a>'
        ].join('');
    };
});