define(function (require, exports, module) {

    var Util = require('util/util');

    function Instance() {
        this.accounts;
    }

    module.exports = Instance;

    //==============================
    // init
    //==============================
    Instance.prototype.init = function () {
        this.accounts = JSON.parse(window.localStorage.accounts);
        this.instancePanel();
        this.instanceTable();

        $('button, input').tooltip();
    };

    //==============================
    // instance panel
    //==============================
    Instance.prototype.instancePanel = function () {
        var instance = this;
        var panel = function (i, v) {
            return [
                '<div class="col-xs-12">',
                '<div class="box">',
                '<div class="box-header">',
                '<h3 class="box-title"><b>' + v.type + '</b> ' + v.alias + '</h3>',
                '<div class="box-tools pull-right">',
                '<button type="button" class="btn btn-box-tool" data-widget="collapse">',
                '<i class="fa fa-minus"></i>',
                '</button>',
                '<button type="button" class="btn btn-box-tool" data-widget="remove">',
                '<i class="fa fa-times"></i>',
                '</button>',
                '</div>',
                '</div>',
                '<div class="box-body">',
                '<table class="instance-table" id="instanceTable' + i + '" data-account-sequence-id="' + v.sequenceId + '" data-type="' + v.type + '"></table>',
                '</div>',
                '<div class="overlay">',
                '<i class="fa fa-refresh fa-spin"></i>',
                '</div>',
                '</div>'
            ].join('');
        };

        $.each(instance.accounts, function (i, v) {
            $('#instance-content-wrapper').append(panel(i, v));
        });

    };

    //==============================
    // instance table
    //==============================
    Instance.prototype.instanceTable = function () {
        var instance = this;
        var $table = $('.instance-table');
        $.each($table, function (i, v) {
            $(v).bootstrapTable($.extend(Util.gridUtilOptions(), {
                url: API_URL.INSTANCES,
                ajaxOptions: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('account-sequence-id', $(v).attr('data-account-sequence-id'));
                    }
                },
                toolbar: '<a class="create-btn" href="#/instance/create-' + $(v).attr('data-type') + '/' + $(v).attr('data-account-sequence-id') + '"><i class="fa fa-plus"></i>创建</a>',
                dataField: 'list',
                pageSize: 5,
                onLoadSuccess: function () {
                    $(v).parents('.box').find('.overlay').css('display', 'none');
                },
                onLoadError: function () {
                    $(v).parents('.box').find('.overlay').css('display', 'none');
                },
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
                    field: 'state.name',
                    formatter: function (value, row, index) {
                        if (value === 'running') {
                            return '<i class="run-status run-status-running"></i> ' + value;
                        }
                        else if (value === 'stopped') {
                            return '<i class="run-status run-status-stopped"></i> ' + value;
                        } else {
                            return value;
                        }
                    }
                }, {
                    title: '平台',
                    field: 'platform',
                    visible: true
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
                    field: 'monitoring.state',
                    visible: false
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
                        if (sg && sg.length > 0) {
                            return sg[0].groupName;
                        } else {
                            return '-';
                        }
                    }
                }, /*{
                 title: '拥有者',
                 field: 'owner',
                 visible: false
                 },*/ {
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
            var $box = $(v).parents('.box');
            $box.find('.bootstrap-table .search input').attr('placeholder', '')
                .parent().append('<span></span>');
            $box.find('.fixed-table-container').append('<div class="fixed-table-footerButtons"><button disabled>删除</button></div>');
            $(v).on('check.bs.table uncheck.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
                $box.find('.fixed-table-footerButtons button').prop('disabled', !$(v).bootstrapTable('getSelections').length);
            });
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