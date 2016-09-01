define(function (require, exports, module) {

    var Util = require('util/util');

    function Create() {
        this.currentStep;
        this.accountSequenceId;
        this.chosenImage;
        this.chosenFlavor;
        this.chosenSecurityGroup = [];
    }

    module.exports = Create;

    //=================================
    // init
    //=================================
    Create.prototype.init = function () {
        this.getAccountSequenceId();
        this.stepper();
        this.image();
        this.config();
        this.tag();
        this.securityGroup();
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
                create.currentStep = index;
                $('.stepper-content-wrapper #step' + index).show();
                var $steps = $('.stepper-content-wrapper .step');
                $steps.map(function (i, v) {
                    if (i != index - 1) {
                        $(this).hide();
                    }
                });
            },
            onStepClick: function (index, step) {
                if (typeof create.chosenImage == 'undefined') {
                    Util.notify('提示', '请先选择镜像！', 'warning');
                    return;
                }
                if (index != 4 && $('#stepper ul li:eq(4)').is('.current') && !create.tagValid()) {
                    return;
                }
                if (index != 2 && $('#stepper ul li:eq(2)').is('.current') && !create.ipValid()) {
                    return;
                }
                if (index != 5 && $('#stepper ul li:eq(5)').is('.current') && create.chosenSecurityGroup.length == 0) {
                    Util.notify('校验提示！', '必须至少选择一个安全组！', 'alert');
                    return;
                }
                if (index == 6) {
                    create.check('config');
                    create.check('tag');
                }
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
                singleSelect: true,
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
                onCheck: function (row) {
                    if (create.chosenImage && create.chosenImage.imageId != row.imageId) {
                        Util.confirmDialog('您已经选择了一个镜像，更换镜像将需要重新选择类型和存储等，您确认继续吗？', function () {
                            $('#dialog-confirm').modal('hide');
                            create.chosenImage = row;
                            create.chosenFlavor = '';
                            create.flavor();
                            create.volume();
                            $('.step1-header b').text('您已选择了一个镜像:' + row.imageId);
                            create.check('image');
                            create.check('volume');
                            $("#stepper").stepper('stepTo', 2);
                        });
                    }
                    if (typeof create.chosenImage == 'undefined') {
                        create.chosenImage = row;
                        create.flavor();
                        create.volume();
                        $('.step1-header b').text('您已选择了一个镜像:' + row.imageId);
                        create.check('image');
                        create.check('volume');
                        $("#stepper").stepper('stepTo', 2);
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
                    field: 'operate',
                    events: operateEvents,
                    formatter: function (value, row, index) {
                        return '<button class="btn-normal btn-image" data-table="' + $(a).attr('href') + '">选择</button>'
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
                            if (_.contains(_v.virtualizationTypes, create.chosenImage.virtualizationType)) {
                                flavors.push(_v);
                            }
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
                a += '<li><a href="javascript: void(0);">' + v + '</a></li>';
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
            onCheck: function (row) {
                create.chosenFlavor = row;
                create.check('flavor');
                $('.step2-header b').text('您已选择了一个实例类型:' + row.typeName);
            },
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

        if (typeof create.chosenFlavor == 'undefined' || create.chosenFlavor == '') {
            $('.flavor-type').html('所有实例类型 <span class="caret"></span>');
            $table.bootstrapTable('filterBy', null);
            $table.bootstrapTable('uncheckAll');
            $table.bootstrapTable('check', 0);
        }

        $('.flavor-type-dropdown > li > a').click(function () {
            var type = $(this).html();
            $('.flavor-type').html(type + ' <span class="caret"></span>');
            if (type != '所有实例类型') {
                $table.bootstrapTable('filterBy', {family: type});
            } else {
                $table.bootstrapTable('filterBy', null);
            }
            $table.bootstrapTable('uncheckAll');
            $table.bootstrapTable('check', 0);
        });
    };

    //=================================
    // config
    //=================================
    Create.prototype.config = function () {
        var create = this;
        var vpcs, subnets;
        $.ajax({
            url: API_URL.NETWORKS,
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('account-sequence-id', create.accountSequenceId);
            },
            success: function (result) {
                if (result.success) {
                    vpcs = result.list;
                    var options;
                    vpcs = _.sortBy(vpcs, function (data) {
                        return -data.default;
                    });
                    $.each(vpcs, function (i, v) {
                        var vdefault = v.default ? '(默认)' : '';
                        options += '<option value="' + v.vpcId + '">' + v.vpcId + '(' + v.cidrBlock + ')' + vdefault + '</option>';
                    });
                    $('#intance-create-config-network').html(options);
                } else {
                    Util.alertDialog('获取网络数据失败！');
                }
            }
        });
        $.ajax({
            url: API_URL.SUBNETS,
            type: 'get',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('account-sequence-id', create.accountSequenceId);
            },
            success: function (result) {
                if (result.success) {
                    subnets = result.list;
                    var options = '<option value="no-preference">无首选项(任何可用区的默认子网)</option>';
                    $.each(subnets, function (i, v) {
                        if (v.defaultForAz) {
                            options += '<option value="' + v.subnetId + '" data-cidr="' + v.cidrBlock + '">' + v.subnetId + '(' + v.cidrBlock + ') | 默认范围 ' + v.availabilityZone + '</option>';
                        }
                    });
                    $('#intance-create-config-subnet').html(options);
                } else {
                    Util.alertDialog('获取子网数据失败！');
                }
            }
        });
        $('#intance-create-config-network').unbind().change(function () {
            var vpcId = $(this).val();
            var options;
            var vpc = _.filter(vpcs, function (data) {
                return data.vpcId == vpcId;
            });
            var subnet = _.filter(subnets, function (data) {
                return data.vpcId == vpcId;
            });
            if (vpc[0].default) {
                options += '<option value="no-preference">无首选项(任何可用区的默认子网)</option>';
            }
            $.each(subnet, function (i, v) {
                options += '<option value="' + v.subnetId + '" data-cidr="' + v.cidrBlock + '">' + v.subnetId + '(' + v.cidrBlock + ') | 默认范围 ' + v.availabilityZone + '</option>';
            });
            $('#intance-create-config-subnet').html(options).trigger('change');
        });
        $('#intance-create-config-subnet').unbind().change(function () {
            var subnetId = $(this).val();
            $('.network-interfaces').remove();
            $('#intance-create-config-publicIp').html('<option value="true">启用</option><option value="false">禁用</option>');
            if (subnetId && subnetId != 'no-preference') {
                var table = [
                    '<div class="form-group network-interfaces">',
                    '<label class="col-sm-3 control-label">网络接口</label>',
                    '<div class="col-sm-8">',
                    '<div class="network-interfaces">',
                    '<table class="table table-hover table-condensed table-bordered">',
                    '<thead><tr><th>设备</th><th>网络接口</th><th>子网</th><th>主要IP</th><th></th></tr></thead>',
                    '<tbody>',
                    '<tr><td>eh0</td><td>新网络接口</td><td>' + subnetId + '</td><td><input type="text" class="network-interface-ip" placeholder="自动分配"></td><td><a href="javascript:void(0);" class="network-interface-add"><i class="fa fa-plus"></i></a></td></tr>',
                    '</tbody>',
                    '</table>',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join('');
                $(this).parent().parent().after(table);
                $('.network-interface-add').unbind().click(function () {
                    var index = parseInt($('.network-interfaces').find('tbody tr:last td:eq(0)').text().substr(2)) + 1;
                    var $tr = $('<tr><td>eh' + index + '</td><td>新网络接口</td><td>' + subnetId + '</td><td><input type="text" class="network-interface-ip" placeholder="自动分配"></td><td><a href="javascript:void(0);" class="network-interface-minus"><i class="fa fa-minus"></i></a></td></tr>').appendTo($('.network-interfaces table tbody'));
                    $tr.find('.network-interface-minus').click(function () {
                        $tr.remove();
                        if ($('.network-interfaces tbody tr').length == 1) {
                            $('#intance-create-config-publicIp').html('<option value="true">启用</option><option value="false">禁用</option>');
                        }
                    });
                    $('.network-interface-ip').inputmask('ip');
                    if ($('.network-interfaces tbody tr').length > 1) {
                        $('#intance-create-config-publicIp').html('<option value="false">禁用</option>');
                    }
                });
                $('.network-interface-ip').inputmask('ip');
            }
        });

        $('input[name="maxCount"]').inputmask("9{1,2}");

        $('#instance-create-config-form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'maxCount': {
                    validators: {
                        notEmpty: {
                            message: '实例的数量不能为空！'
                        },
                        callback: {
                            callback: function (value) {
                                if (parseInt(value) == 0) {
                                    return false;
                                } else {
                                    return true;
                                }
                            },
                            message: '实例的数量必须大于0！'
                        }

                    }
                }
            }
        });
    };

    //=================================
    // ip valid
    //=================================
    Create.prototype.ipValid = function () {
        var create = this;
        var flag = true;
        $.each($('.network-interface-ip'), function (i, v) {
            if ($(v).val().trim() != '') {
                var ip = $(v).val().split('.');
                var subnetcidr = $('#intance-create-config-subnet').find('option:selected').attr('data-cidr').split('.');
                if (subnetcidr[0] != ip[0] || subnetcidr[1] != ip[1] || !Util.ipValid($(v).val())) {
                    flag = false;
                    Util.notify('校验提示！', '网络接口IP格式有误或不在子网中！', 'alert');
                    return false;
                }
            }
        });
        return flag;
    };

    //=================================
    // volume
    //=================================
    Create.prototype.volume = function () {
        var create = this;
        $table = $('#volumeTable');

        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            data: create.chosenImage.blockDeviceMappings,
            sidePagination: 'client',
            pagination: false,
            sortable: false,
            search: false,
            showRefresh: false,
            showColumns: false,
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
                }, {
                    title: '卷类型',
                    field: 'ebs.volumeType'
                }, {
                    title: 'IOPS',
                    field: 'iops',
                    formatter: function (value, row, index) {
                        if (value) {
                            return value;
                        } else {
                            return '100 /3000'
                        }
                    }
                }, {
                    title: '吞吐量(M/s)',
                    field: '',
                    formatter: function (value, row, index) {
                        return '不适用';
                    }
                }, {
                    title: '终止时删除',
                    field: 'ebs.deleteOnTermination',
                    formatter: function (value, row, index) {
                        return '<input type="checkbox" checked=' + value + '>';
                    }
                }
            ]

        }));
    };

    //=================================
    // tag
    //=================================
    Create.prototype.tag = function () {
        var create = this;
        $('#tagTable tbody tr a').click(function () {
            $(this).parents('tr').remove();
        });
        var tr = [
            '<tr>',
            '<td><input type="text" class="form-control"></td>',
            '<td><input type="text" class="form-control"></td>',
            '<td><a href="javascript: void(0);" data-toggle="tooltip" title="删除"><i class="fa fa-close mt7"></i></a></td>',
            '</tr>'
        ].join('');
        $('#instance-create-tag-add').click(function () {
            var $tr = $(tr).appendTo($('#tagTable tbody'));
            $tr.find('a').click(function () {
                $tr.remove();
            })
        });
    };

    //=================================
    // tag valid
    //=================================
    Create.prototype.tagValid = function () {

        var flag = true;
        $('#tagTable tbody tr').map(function (i, v) {
            var key = $(v).find('input:eq(0)').val();
            if (key.trim() == '') {
                Util.notify('校验提示！', '不能存在键为空的标签实例！', 'alert');
                flag = false;
                return false;
            }
        });
        return flag;

    };

    //=================================
    // security group
    //=================================
    Create.prototype.securityGroup = function () {
        var create = this;
        var $table = $('#securityGroupTable');
        $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
            url: API_URL.SECURITYGROUPS,
            ajaxOptions: {
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('account-sequence-id', create.accountSequenceId);
                }
            },
            clickToSelect: true,
            dataField: 'list',
            onCheck: function (row) {
                create.chosenSecurityGroup.push(row.groupId);
            },
            onUncheck: function (row) {
                create.chosenSecurityGroup.splice(create.chosenSecurityGroup.indexOf(row.groupId), 1);
            },
            onCheckAll: function (rows) {
                create.chosenSecurityGroup = [];
                $.each(rows, function (i, v) {
                    create.chosenSecurityGroup.push(v.groupId);
                });
            },
            onUncheckAll: function (rows) {
                create.chosenSecurityGroup = [];
            },
            columns: [
                {
                    checkbox: true
                },
                {
                    title: '安全组ID',
                    field: 'groupId'
                },
                {
                    title: '名称',
                    field: 'groupName'
                },
                {
                    title: '描述',
                    field: 'description'
                }
            ]
        }));
    };

    //=================================
    // check
    //=================================
    Create.prototype.check = function (type) {
        var create = this;

        if (type == 'image') {
            var image = create.chosenImage;
            var platform = function () {
                switch (image.platform) {
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
            };

            var imageInfo = [
                '<div style="display:inline-block;width: 100px; text-align: center;vertical-align: 20px;padding-top:20px;">' + platform() + '</div>',
                '<div style="display:inline-block;">',
                '<b>' + image.imageId + '</b> - ' + image.architecture,
                '<br>' + image.description,
                '<br>根设备类型:' + image.rootDeviceType + ' 虚拟化类型:' + image.virtualizationType,
                '</div>'
            ].join('');
            $('#step7 .image').html(imageInfo);
        }

        if (type == 'flavor') {

            var flavor = create.chosenFlavor;

            var ebs = function () {
                if (flavor.ebsOnly) {
                    return '仅限于EBS';
                }
                if (!flavor.ebsOnly && flavor.storage.ssd) {
                    return flavor.storage.count + 'x' + flavor.storage.size + '(SSD)';
                }
                if (!flavor.ebsOnly && !flavor.storage.ssd) {
                    return flavor.storage.count + 'x' + flavor.storage.size;
                }
            };

            var networkPerformance = function () {
                var value = flavor.networkPerformance;
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
            };

            var ebsOptimizedSupported = flavor.ebsOptimizedSupported ? '是' : '-';

            var flavorInfo = [
                '<dl class="dl-horizontal">',
                '<dt>实例类型</dt>',
                '<dd>' + flavor.typeName + '</dd>',
                '<dt>vCPU</dt>',
                '<dd>' + flavor.cpu.cores + '</dd>',
                '<dt>内存(GB)</dt>',
                '<dd>' + flavor.memory + '</dd>',
                '<dt>实例存储(GB)</dt>',
                '<dd>' + ebs() + '</dd>',
                '<dt>可用的优化ESB</dt>',
                '<dd>' + ebsOptimizedSupported + '</dd>',
                '<dt>网络性能</dt>',
                '<dd>' + networkPerformance() + '</dd>',
                '</dl>'
            ].join('');
            $('#step7 .flavor').html(flavorInfo);
        }

        if (type == 'config') {
            var instanceNumber = $('#intance-create-config-number').val();
            var network = $('#intance-create-config-network').val();
            var subnet = $('#intance-create-config-subnet').val() == 'no-preference' ? '无首选项(任何可用区的默认子网)' : $('#intance-create-config-subnet').val();
            var publicIpAssociate = $('#intance-create-config-publicIp').val() == 'true' ? '启用' : '禁用';
            var shutdownBehavior = $('#intance-create-config-shutdownBehavior').val() == 'stop' ? '停止' : '终止';
            var shutdownGuard = $('#intance-create-config-shutdownGuard').prop('checked') ? '是' : '否';
            var cloudWatch = $('#intance-create-config-cloudWatch').prop('checked') ? '是' : '否';
            var ips = $('.network-interface-ip').map(function () {
                if ($(this).val().trim() != '') {
                    return $(this).val();
                }
            }).get().join(', ');
            var configInfo = [
                '<dl class="dl-horizontal">',
                '<dt>实例的数量</dt>',
                '<dd>' + instanceNumber + '</dd>',
                '<dt>网络</dt>',
                '<dd>' + network + '</dd>',
                '<dt>子网</dt>',
                '<dd>' + subnet + '</dd>',
                '<dt>网络接口</dt>',
                '<dd>' + ips + '</dd>',
                '<dt>分配公有IP</dt>',
                '<dd>' + publicIpAssociate + '</dd>',
                '<dt>关闭操作</dt>',
                '<dd>' + shutdownBehavior + '</dd>',
                '<dt>终止保护</dt>',
                '<dd>' + shutdownGuard + '</dd>',
                '<dt>监控</dt>',
                '<dd>' + cloudWatch + '</dd>',
                '</dl>'
            ].join('');

            $('#step7 .config').html(configInfo);
        }

        if (type == 'volume') {
            $('#step7 .volume').html('<table id="volumeInfoTable"></table>');
            var $table = $('#volumeInfoTable');
            $table.bootstrapTable($.extend(Util.gridUtilOptions(), {
                data: create.chosenImage.blockDeviceMappings,
                sidePagination: 'client',
                pagination: false,
                sortable: false,
                search: false,
                showRefresh: false,
                showColumns: false,
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
                    }, {
                        title: '卷类型',
                        field: 'ebs.volumeType'
                    }, {
                        title: 'IOPS',
                        field: 'iops',
                        formatter: function (value, row, index) {
                            if (value) {
                                return value;
                            } else {
                                return '100 /3000'
                            }
                        }
                    }, {
                        title: '吞吐量(M/s)',
                        field: '',
                        formatter: function (value, row, index) {
                            return '不适用';
                        }
                    }, {
                        title: '终止时删除',
                        field: 'ebs.deleteOnTermination',
                        formatter: function (value, row, index) {
                            return '<input type="checkbox" checked=' + value + '>';
                        }
                    }
                ]
            }));
        }

        if (type == 'tag') {

            var tagInfo = [
                '<div class="col-md-8" style="padding-left:0;">',
                '<table id="tagInfoTable" class="table table-hover my-table">',
                '<thead><tr><th>键</th><th>值</th></tr></thead><tbody>',
                '</tbody></table></div>'
            ].join('');

            $('#step7 .tag').html(tagInfo);

            $('#tagTable tbody tr').map(function (i, v) {
                $('#tagInfoTable tbody').append('<tr><td>' + $(v).find('input:eq(0)').val() + '</td><td>' + $(v).find('input:eq(1)').val() + '</td></tr>');
            });
        }


    };

    //=================================
    // operateEvents
    //=================================
    window.operateEvents = {
        'click .btn-image': function (e, value, row, index) {
            $($(this).attr('data-table')).find('table').bootstrapTable('check', index);
        }
    }
});