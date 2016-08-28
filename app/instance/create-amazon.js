define(function (require, exports, module) {

    var Util = require('util/util');

    function Create() {
        this.accountSequenceId;
    }

    module.exports = Create;

    //=================================
    // init
    //=================================
    Create.prototype.init = function () {
        this.getAccountSequenceId();
        this.stepper();
    };

    //=================================
    // get account sequence id
    //=================================
    Create.prototype.getAccountSequenceId = function () {
        var hash = window.location.hash;
        this.accountSequenceId = hash.split('/')[3];
    };

    //=================================
    // stepper
    //=================================
    Create.prototype.stepper = function () {
        var create = this;
        $("#stepper").stepper({
            steps: 7,
            start: 1,
            type: 'default',
            onStep: function (index, step) {
                $('.stepper-content-wrapper').html($('#step' + index).html());
                switch (index) {
                    case 1:
                        create.image();
                        break;
                    case 2:
                        create.flavor();
                        break;
                    case 3:
                        create.config();
                        break;
                    case 4:
                        create.volume();
                        break;
                    default:
                        break;
                }
            },
            onStepClick: function (index, step) {
                $("#stepper").stepper('stepTo', index + 1);
            }
        });
        $('#stepper li').map(function (index, domElement) {
            switch (index) {
                case 0:
                    $(this).html('<span class="stepper-title">选择镜像</span>');
                    break;
                case 1:
                    $(this).html('<span class="stepper-title">选择类型</span>');
                    break;
                case 2:
                    $(this).html('<span class="stepper-title">配置实例</span>');
                    break;
                case 3:
                    $(this).html('<span class="stepper-title">添加存储</span>');
                    break;
                case 4:
                    $(this).html('<span class="stepper-title">标签实例</span>');
                    break;
                case 5:
                    $(this).html('<span class="stepper-title">配置安全组</span>');
                    break;
                case 6:
                    $(this).html('<span class="stepper-title">审核</span>');
                    break;
                default:
                    break;
            }
        });
    };

    //=================================
    // image
    //=================================
    Create.prototype.image = function () {
        var create = this;
        $('.stepper-content-wrapper .instance-create-image a[data-toggle="tab"]:first').tab('show');
        $('.stepper-content-wrapper .instance-create-image a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var a = e.target;
            $($(a).attr('href')).find('table').bootstrapTable($.extend(Util.gridUtilOptions(), {
                showColumns: false,
                showHeader: false,
                url: API_URL.IMAGES,
                dataField: 'list',
                ajaxOptions: {
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('account-sequence-id', create.accountSequenceId);
                    }
                },
                queryParams: function (params) {
                    if ($(a).attr('href') == '#tab_privateImage') {
                        return $.extend(params, {'is-public': false});
                    } else {
                        return params;
                    }
                },
                columns: [{
                    title: '',
                    field: '',
                    formatter: function (value, row, index) {
                        switch (row.platform) {
                            case 'amazon':
                                return '<img src="images/image-amazon-linux.png">';
                                break;
                            case 'rhel':
                                return '<img src="images/image-redhat.png">';
                                break;
                            case 'suse':
                                return '<img src="images/image-suse.png">';
                                break;
                            case 'canonical':
                                return '<img src="images/image-ubuntu.png">';
                                break;
                            case 'windows':
                                return '<img src="images/image-windows.png">';
                                break;
                            default:
                                return '<img src="images/image-linux.gif">';
                                break;
                        }
                    }
                }, {
                    title: '',
                    field: '',
                    formatter: function (value, row, index) {
                        return '<b>' + row.imageId + '</b> - ' + row.architecture + '<br>' + row.description + '<br>根设备类型:' + row.rootDeviceType + ' 虚拟化类型:' + row.virtualizationType;
                    },
                    align: 'left'
                }, {
                    title: '',
                    field: '',
                    formatter: function (value, row, index) {
                        return '<button class="btn-normal">选择</button>'
                    }
                }]
            }));
            $('.bootstrap-table .search input').attr('placeholder', '')
                .parent().append('<span></span>');
        });
    };

    //=================================
    // flavor
    //=================================
    Create.prototype.flavor = function () {
        var create = this;
        $table = $('#flavorTable');
        var flavors = [];
        var types = [];
        types.push('所有实例类型');
        $.ajax({
            url: API_URL.FLAVORS,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('account-sequence-id', create.accountSequenceId);
            },
            type: 'get',
            async: false,
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    $.each(result.object.families, function (i, v) {
                        types.push(v.name);
                        $.each(v.types, function (_i, _v) {
                            flavors.push(_v);
                        });
                    });
                } else {
                    Util.alertDialog('获取实例类型数据失败！');
                }
            }
        });
        var toolbar = function () {
            var a = [
                '<a class="dropdown-toggle btn-normal flavor-type" data-toggle="dropdown" href="javascript: void(0);">',
                '所有实例类型 <span class="caret"></span>',
                '</a>',
                '<ul class="dropdown-menu flavor-type-dropdown">'
            ].join('');
            $.each(types, function (i, v) {
                a += '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript: void(0);">' + v + '</a></li>';
            });
            return a += '</ul>';

        };
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            data: flavors,
            clickToSelect: true,
            singleSelect: true,
            sidePagination: 'client',
            pagination: false,
            sortable: false,
            search: false,
            showRefresh: false,
            toolbar: toolbar(),
            columns: [{
                checkbox: true
            }, {
                title: '系列',
                field: 'family'
            }, {
                title: '类型',
                field: 'typeName'
            }, {
                title: 'vCPU',
                field: 'cpu.cores'
            }, {
                title: '内存(GB)',
                field: 'memory'
            }, {
                title: '实例存储(GB)',
                field: '',
                formatter: function (value, row, index) {
                    if (row.ebsOnly) {
                        return '仅限于EBS';
                    }
                    if (!row.ebsOnly && row.storage.ssd) {
                        return row.storage.count + 'x' + row.storage.size + '(SSD)';
                    }
                    if (!row.ebsOnly && !row.storage.ssd) {
                        return row.storage.count + 'x' + row.storage.size;
                    }
                }
            }, {
                title: '可用的优化ESB',
                field: 'ebsOptimizedSupported',
                formatter: function (value, row, index) {
                    if (value) {
                        return '是';
                    } else {
                        return '-';
                    }
                }
            }, {
                title: '网络性能',
                field: 'networkPerformance',
                formatter: function (value, row, index) {
                    switch (value) {
                        case 'High':
                            return '高';
                            break;
                        case 'Moderate':
                            return '中等';
                            break;
                        case 'Low to Moderate':
                            return '低到中等';
                            break;
                        case 'Very Low':
                            return '非常低';
                            break;
                        case 'Low':
                            return '低';
                            break;
                        case '10 Gigabit':
                            return '10 GB';
                            break;
                        default:
                            return value;
                            break;
                    }
                }
            }]
        }));

        $('.flavor-type-dropdown > li > a').click(function () {
            var type = $(this).html();
            $('.flavor-type').html(type + ' <span class="caret"></span>');
            if (type != '所有实例类型') {
                $table.bootstrapTable('filterBy', {family: type});
            } else {
                $table.bootstrapTable('filterBy', null);
            }
            $table.bootstrapTable('uncheckAll');
        });
    };

    //=================================
    // volume
    //=================================
    Create.prototype.config = function () {

    };

    //=================================
    // volume
    //=================================
    Create.prototype.volume = function () {
        var create = this;
        $table = $('#volumeTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.VOLUMES + '/p',
            sidePagination: 'client',
            pagination: false,
            sortable: false,
            search: false,
            ajaxOptions: {
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('account-sequence-id', create.accountSequenceId);
                }
            },
            responseHandler: function (res) {
                return res.blockDeviceMappings;
            },
            /*queryParams: function (params) {
             return $.extend(params, {'is-public': false});
             },*/
            onLoadSuccess: function (res) {
                console.log(res);
            },
            columns: [
                {
                    title: '卷类型',
                    field: '',
                    formatter: function (value, row, index) {
                        return '根目录';
                    }
                }, {
                    title: '设备',
                    field: 'deviceName'
                }, {
                    title: '快照',
                    field: 'ebs.snapshotId'
                }, {
                    title: '大小(GB)',
                    field: 'ebs.volumeSize'
                },{
                    title: '卷类型',
                    field: 'ebs.volumeType'
                }, {
                    title: 'IOPS',
                    field: ''
                }, {
                    title: '吞吐量(M/s)',
                    field: ''
                }, {
                    title: '终止时删除',
                    field: 'ebs.deleteOnTermination',
                    formatter: function(value, row ,index){
                        return '<input type="checkbox" checked='+value+'>';
                    }
                }
            ]

        }));


    };
});