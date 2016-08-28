Mock.mock('api/v1.0/users?sort=name&order=asc&offset=0&limit=10', 'get', {
    list: [{
        id: 1,
        name: 'ceshi1',
        password: 'xxxxxx',
        cellphone: '12312312333',
        email: 'super@123.com',
        state: 0

    }, {
        id: 2,
        name: 'ceshi2',
        password: 'xxxxxx',
        cellphone: '12312312333',
        email: 'super@123.com',
        state: 1
    }],
    total: 2
});

Mock.mock('api/v1.0/users/1', 'get', {
    success: true,
    object: {
        id: "1",
        email: "lez@zte.com.cn",
        password: "200000",
        cellphone: "13913978541",
        name: "lez",
        accounts: [
            {
                sequenceId: "25552525",
                alias: "awsaccount1",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                alias: "awsaccount1",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                alias: "awsaccount1",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                alias: "awsaccount1",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                alias: "awsaccount1",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                alias: "awsaccount1",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            }
        ]
    }
});

Mock.mock('api/v1.0/images?order=asc&offset=0&limit=10', 'get', {
    list: [
        {
            "imageId": "ami-1731e47a",
            "imageLocation": "258383858166/test-image-api",
            "state": "available",
            "ownerId": "258383858166",
            "creationDate": "2016-08-20T09:28:19.000Z",
            "productCodes": [],
            "architecture": "x86_64",
            "imageType": "machine",
            "kernelId": null,
            "ramdiskId": null,
            "platform": "windows",
            "sriovNetSupport": "simple",
            "enaSupport": null,
            "stateReason": null,
            "imageOwnerAlias": null,
            "name": "test-image-api",
            "description": "xxx",
            "rootDeviceType": "ebs",
            "rootDeviceName": "/dev/sda1",
            "blockDeviceMappings": [
                {
                    "virtualName": null,
                    "deviceName": "/dev/sda1",
                    "ebs": {
                        "snapshotId": "snap-d852be29",
                        "volumeSize": 40,
                        "deleteOnTermination": true,
                        "volumeType": "gp2",
                        "iops": null,
                        "encrypted": false
                    },
                    "noDevice": null
                }
            ],
            "virtualizationType": "hvm",
            "tags": [],
            "hypervisor": "xen",
            "public": false
        },
        {
            "imageId": "ami-c034e1ad",
            "imageLocation": "258383858166/private_ami_redhat",
            "state": "available",
            "ownerId": "258383858166",
            "creationDate": "2016-08-20T03:16:28.000Z",
            "productCodes": [],
            "architecture": "x86_64",
            "imageType": "machine",
            "kernelId": null,
            "ramdiskId": null,
            "platform": null,
            "sriovNetSupport": "simple",
            "enaSupport": null,
            "stateReason": null,
            "imageOwnerAlias": null,
            "name": "private_ami_redhat",
            "description": "cant includ chinese",
            "rootDeviceType": "ebs",
            "rootDeviceName": "/dev/sda1",
            "blockDeviceMappings": [
                {
                    "virtualName": null,
                    "deviceName": "/dev/sda1",
                    "ebs": {
                        "snapshotId": "snap-b82cd149",
                        "volumeSize": 10,
                        "deleteOnTermination": true,
                        "volumeType": "gp2",
                        "iops": null,
                        "encrypted": false
                    },
                    "noDevice": null
                }
            ],
            "virtualizationType": "hvm",
            "tags": [
                {
                    "key": "Name",
                    "value": "asdasdasdds"
                }
            ],
            "hypervisor": "xen",
            "public": false
        }
    ],
    total: 2
});


Mock.mock('api/v1.0/volumes?order=asc&offset=0&limit=10', 'get', {
    list: [{
        "volumeId": "vol-3b306cbe",
        "size": 1,
        "snapshotId": "",
        "availabilityZone": "cn-north-1a",
        "state": "available",
        "createTime": 1471914282836,
        "attachments": [],
        "tags": [],
        "volumeType": "gp2",
        "iops": 100,
        "encrypted": false,
        "kmsKeyId": null
    }, {
        "volumeId": "vol-20eae89f",
        "size": 40,
        "snapshotId": "snap-4536c7b4",
        "availabilityZone": "cn-north-1b",
        "state": "in-use",
        "createTime": 1471489450692,
        "attachments": [
            {
                "volumeId": "vol-20eae89f",
                "instanceId": "i-868ed43e",
                "device": "/dev/sda1",
                "state": "attached",
                "attachTime": 1471489450000,
                "deleteOnTermination": true
            }
        ],
        "tags": [],
        "volumeType": "gp2",
        "iops": 120,
        "encrypted": false,
        "kmsKeyId": null
    }],
    total: 2
});

Mock.mock('api/v1.0/instances?order=asc&offset=0&limit=5', 'get', {
    list: [
        {
            "amiLaunchIndex": 0,
            "architecture": "x86_64",
            "availabilityZone": "cn-north-1b",
            "blockDevices": [
                {
                    "attachTime": "2016-08-23T02:20:29.000Z",
                    "deleteOnTermination": "true",
                    "deviceName": "/dev/sda1",
                    "isRoot": "true",
                    "status": "attached",
                    "volumeId": "vol-669f93d9"
                }
            ],
            "dnsName": "ec2-54-223-86-5.cn-north-1.compute.amazonaws.com.cn",
            "ebsOptimized": false,
            "groupNames": [
                "default"
            ],
            "groups": [
                "sg-3dc5fe58"
            ],
            "imageId": "ami-b1f722dc",
            "instanceId": "i-4d3b1ef5",
            "instanceState": "running",
            "instanceStatus": {
                "availabilityZone": "cn-north-1b",
                "events": [],
                "instanceId": "i-4d3b1ef5",
                "instanceState": {
                    "code": 16,
                    "name": "running"
                },
                "instanceStatus": {
                    "details": [
                        {
                            "name": "reachability",
                            "status": "passed"
                        }
                    ],
                    "status": "ok"
                },
                "systemStatus": {
                    "details": [
                        {
                            "name": "reachability",
                            "status": "passed"
                        }
                    ],
                    "status": "ok"
                }
            },
            "instanceType": "t2.micro",
            "keyName": "test",
            "launchTime": "2016-08-23T02:20:29.000Z",
            "lifecycle": "normal",
            "monitoring": "disabled",
            "networkInterfaces": [
                {
                    "association": {
                        "ipOwnerId": "amazon",
                        "publicIp": "54.223.86.5"
                    },
                    "attachment": {
                        "attachTime": 1471918829,
                        "attachmentId": "eni-attach-22a2a8ff",
                        "deleteOnTermination": true,
                        "deviceIndex": 0,
                        "status": "attached"
                    },
                    "description": "",
                    "networkInterfaceId": "eni-3dfb2f16",
                    "ownerId": "258383858166",
                    "privateDnsName": "ip-172-31-13-236.cn-north-1.compute.internal",
                    "privateIpAddress": "172.31.13.236",
                    "privateIpAddresses": [
                        {
                            "association": {
                                "ipOwnerId": "amazon",
                                "publicIp": "54.223.86.5"
                            },
                            "primary": true,
                            "privateIpAddress": "172.31.13.236"
                        }
                    ],
                    "securityGroups": [
                        {
                            "securityGroupId": "sg-3dc5fe58",
                            "securityGroupName": "default"
                        }
                    ],
                    "sourceDestCheck": true,
                    "status": "in-use",
                    "subnetId": "subnet-c510c2b2",
                    "vpcId": "vpc-2a14fd4e"
                }
            ],
            "owner": "258383858166",
            "placementGroup": "",
            "platform": "windows",
            "privateDnsName": "ip-172-31-13-236.cn-north-1.compute.internal",
            "privateIpAddress": "172.31.13.236",
            "productCodes": [],
            "publicIpAddress": "54.223.86.5",
            "reservation": "r-9357012b",
            "rootDeviceName": "/dev/sda1",
            "rootDeviceType": "ebs",
            "securityGroups": [
                {
                    "securityGroupId": "sg-3dc5fe58",
                    "securityGroupName": "default"
                }
            ],
            "sourceDestCheck": true,
            "subnetId": "subnet-c510c2b2",
            "tags": [],
            "tenancy": "default",
            "virtualizationType": "hvm",
            "vpcId": "vpc-2a14fd4e"
        },
        {
            "amiLaunchIndex": 0,
            "architecture": "x86_64",
            "availabilityZone": "cn-north-1b",
            "blockDevices": [
                {
                    "attachTime": "2016-08-18T03:04:10.000Z",
                    "deleteOnTermination": "true",
                    "deviceName": "/dev/sda1",
                    "isRoot": "true",
                    "status": "attached",
                    "volumeId": "vol-20eae89f"
                }
            ],
            "dnsName": "",
            "ebsOptimized": false,
            "groupNames": [
                "launch-wizard-1"
            ],
            "groups": [
                "sg-53ba8136"
            ],
            "imageId": "ami-b1f722dc",
            "instanceId": "i-868ed43e",
            "instanceState": "stopped",
            "instanceType": "t2.medium",
            "keyName": "test",
            "launchTime": "2016-08-18T03:04:10.000Z",
            "lifecycle": "normal",
            "monitoring": "disabled",
            "networkInterfaces": [
                {
                    "attachment": {
                        "attachTime": 1471489450,
                        "attachmentId": "eni-attach-dd999000",
                        "deleteOnTermination": true,
                        "deviceIndex": 0,
                        "status": "attached"
                    },
                    "description": "",
                    "networkInterfaceId": "eni-9c3af3b7",
                    "ownerId": "258383858166",
                    "privateDnsName": "ip-172-31-1-194.cn-north-1.compute.internal",
                    "privateIpAddress": "172.31.1.194",
                    "privateIpAddresses": [
                        {
                            "primary": true,
                            "privateIpAddress": "172.31.1.194"
                        }
                    ],
                    "securityGroups": [
                        {
                            "securityGroupId": "sg-53ba8136",
                            "securityGroupName": "launch-wizard-1"
                        }
                    ],
                    "sourceDestCheck": true,
                    "status": "in-use",
                    "subnetId": "subnet-c510c2b2",
                    "vpcId": "vpc-2a14fd4e"
                }
            ],
            "owner": "258383858166",
            "placementGroup": "",
            "platform": "windows",
            "privateDnsName": "ip-172-31-1-194.cn-north-1.compute.internal",
            "privateIpAddress": "172.31.1.194",
            "productCodes": [],
            "reservation": "r-eab0e752",
            "rootDeviceName": "/dev/sda1",
            "rootDeviceType": "ebs",
            "securityGroups": [
                {
                    "securityGroupId": "sg-53ba8136",
                    "securityGroupName": "launch-wizard-1"
                }
            ],
            "sourceDestCheck": true,
            "stateTransitionReason": "Client.UserInitiatedShutdown: User initiated shutdown",
            "subnetId": "subnet-c510c2b2",
            "tags": [
                {
                    "key": "Name",
                    "value": "win2012"
                }
            ],
            "tenancy": "default",
            "virtualizationType": "hvm",
            "vpcId": "vpc-2a14fd4e"
        },
        {
            "amiLaunchIndex": 0,
            "architecture": "x86_64",
            "availabilityZone": "cn-north-1a",
            "blockDevices": [
                {
                    "attachTime": "2016-08-22T06:36:21.000Z",
                    "deleteOnTermination": "true",
                    "deviceName": "/dev/sda1",
                    "isRoot": "true",
                    "status": "attached",
                    "volumeId": "vol-46d489c3"
                }
            ],
            "dnsName": "ec2-54-223-68-90.cn-north-1.compute.amazonaws.com.cn",
            "ebsOptimized": false,
            "groupNames": [
                "launch-wizard-2"
            ],
            "groups": [
                "sg-13073d76"
            ],
            "imageId": "ami-c034e1ad",
            "instanceId": "i-976840af",
            "instanceState": "running",
            "instanceStatus": {
                "availabilityZone": "cn-north-1a",
                "events": [],
                "instanceId": "i-976840af",
                "instanceState": {
                    "code": 16,
                    "name": "running"
                },
                "instanceStatus": {
                    "details": [
                        {
                            "name": "reachability",
                            "status": "passed"
                        }
                    ],
                    "status": "ok"
                },
                "systemStatus": {
                    "details": [
                        {
                            "name": "reachability",
                            "status": "passed"
                        }
                    ],
                    "status": "ok"
                }
            },
            "instanceType": "t2.micro",
            "keyName": "new",
            "launchTime": "2016-08-22T06:36:20.000Z",
            "lifecycle": "normal",
            "monitoring": "disabled",
            "networkInterfaces": [
                {
                    "association": {
                        "ipOwnerId": "amazon",
                        "publicIp": "54.223.68.90"
                    },
                    "attachment": {
                        "attachTime": 1471847780,
                        "attachmentId": "eni-attach-27e2e1c7",
                        "deleteOnTermination": true,
                        "deviceIndex": 0,
                        "status": "attached"
                    },
                    "description": "",
                    "networkInterfaceId": "eni-4f21b016",
                    "ownerId": "258383858166",
                    "privateDnsName": "ip-172-31-19-9.cn-north-1.compute.internal",
                    "privateIpAddress": "172.31.19.9",
                    "privateIpAddresses": [
                        {
                            "association": {
                                "ipOwnerId": "amazon",
                                "publicIp": "54.223.68.90"
                            },
                            "primary": true,
                            "privateIpAddress": "172.31.19.9"
                        }
                    ],
                    "securityGroups": [
                        {
                            "securityGroupId": "sg-13073d76",
                            "securityGroupName": "launch-wizard-2"
                        }
                    ],
                    "sourceDestCheck": true,
                    "status": "in-use",
                    "subnetId": "subnet-7eb9ea1b",
                    "vpcId": "vpc-2a14fd4e"
                }
            ],
            "owner": "258383858166",
            "placementGroup": "",
            "privateDnsName": "ip-172-31-19-9.cn-north-1.compute.internal",
            "privateIpAddress": "172.31.19.9",
            "productCodes": [],
            "publicIpAddress": "54.223.68.90",
            "reservation": "r-86502bbe",
            "rootDeviceName": "/dev/sda1",
            "rootDeviceType": "ebs",
            "securityGroups": [
                {
                    "securityGroupId": "sg-13073d76",
                    "securityGroupName": "launch-wizard-2"
                }
            ],
            "sourceDestCheck": true,
            "subnetId": "subnet-7eb9ea1b",
            "tags": [
                {
                    "key": "accountMail",
                    "value": "wmtaomail@sina.com"
                },
                {
                    "key": "costCenterId",
                    "value": "1"
                },
                {
                    "key": "vmId",
                    "value": "6149"
                },
                {
                    "key": "vmGroupId",
                    "value": "773"
                },
                {
                    "key": "clusterId",
                    "value": "740"
                },
                {
                    "key": "fit2cloudId",
                    "value": "bf286d29-3db4-42"
                },
                {
                    "key": "projectId",
                    "value": "1"
                },
                {
                    "key": "Name",
                    "value": "cluster--group--6149"
                },
                {
                    "key": "accountId",
                    "value": "1486"
                }
            ],
            "tenancy": "default",
            "virtualizationType": "hvm",
            "vpcId": "vpc-2a14fd4e"
        },
        {
            "amiLaunchIndex": 0,
            "architecture": "x86_64",
            "availabilityZone": "cn-north-1b",
            "blockDevices": [
                {
                    "attachTime": "2016-08-18T10:18:25.000Z",
                    "deleteOnTermination": "true",
                    "deviceName": "/dev/sda1",
                    "isRoot": "true",
                    "status": "attached",
                    "volumeId": "vol-248d8f9b"
                }
            ],
            "dnsName": "",
            "ebsOptimized": false,
            "groupNames": [
                "launch-wizard-2"
            ],
            "groups": [
                "sg-13073d76"
            ],
            "imageId": "ami-52d1183f",
            "instanceId": "i-dbb9e363",
            "instanceState": "stopped",
            "instanceType": "t2.medium",
            "keyName": "test",
            "launchTime": "2016-08-18T10:18:25.000Z",
            "lifecycle": "normal",
            "monitoring": "disabled",
            "networkInterfaces": [
                {
                    "attachment": {
                        "attachTime": 1471515505,
                        "attachmentId": "eni-attach-5d4d4580",
                        "deleteOnTermination": true,
                        "deviceIndex": 0,
                        "status": "attached"
                    },
                    "description": "",
                    "networkInterfaceId": "eni-6f8d4544",
                    "ownerId": "258383858166",
                    "privateDnsName": "ip-172-31-3-160.cn-north-1.compute.internal",
                    "privateIpAddress": "172.31.3.160",
                    "privateIpAddresses": [
                        {
                            "primary": true,
                            "privateIpAddress": "172.31.3.160"
                        }
                    ],
                    "securityGroups": [
                        {
                            "securityGroupId": "sg-13073d76",
                            "securityGroupName": "launch-wizard-2"
                        }
                    ],
                    "sourceDestCheck": true,
                    "status": "in-use",
                    "subnetId": "subnet-c510c2b2",
                    "vpcId": "vpc-2a14fd4e"
                }
            ],
            "owner": "258383858166",
            "placementGroup": "",
            "privateDnsName": "ip-172-31-3-160.cn-north-1.compute.internal",
            "privateIpAddress": "172.31.3.160",
            "productCodes": [],
            "reservation": "r-22a6f19a",
            "rootDeviceName": "/dev/sda1",
            "rootDeviceType": "ebs",
            "securityGroups": [
                {
                    "securityGroupId": "sg-13073d76",
                    "securityGroupName": "launch-wizard-2"
                }
            ],
            "sourceDestCheck": true,
            "stateTransitionReason": "Client.UserInitiatedShutdown: User initiated shutdown",
            "subnetId": "subnet-c510c2b2",
            "tags": [
                {
                    "key": "Name",
                    "value": "redhat"
                }
            ],
            "tenancy": "default",
            "virtualizationType": "hvm",
            "vpcId": "vpc-2a14fd4e"
        }
    ],
    total: 4
});

Mock.mock('api/v1.0/images?order=asc&offset=0&limit=10&is-public=false', 'get', {
    list: [
        {
            "description": "Amazon Linux AMI 2016.03.3 (HVM), SSD Volume Type",
            "freeTier": true,
            "imageId64": "ami-8e6aa0e3",
            "platform": "amazon",
            "ports": [
                22
            ],
            "position": 0,
            "rootDeviceType": "ebs",
            "title": "Amazon Linux AMI 2016.03.3 (HVM), SSD Volume Type",
            "totalImageSize": 8,
            "virtualizationType": "hvm"
        },
        {
            "description": "Red Hat Enterprise Linux 版本 7.2 (HVM)，EBS 通用 (SSD) 卷类型",
            "freeTier": true,
            "imageId64": "ami-52d1183f",
            "platform": "rhel",
            "ports": [
                22
            ],
            "position": 1,
            "rootDeviceType": "ebs",
            "title": "Red Hat Enterprise Linux 7.2 (HVM)，SSD 卷类型",
            "totalImageSize": 10,
            "virtualizationType": "hvm"
        },
        {
            "description": "SUSE Linux Enterprise Server 12 SP1 (HVM)， EBS 通用型 (SSD) 卷类型。公有云， 高级系统管理， Web 与脚本， 和早期的模块功能。",
            "freeTier": true,
            "imageId64": "ami-41559c2c",
            "platform": "suse",
            "ports": [
                22
            ],
            "position": 2,
            "rootDeviceType": "ebs",
            "title": "SUSE Linux Enterprise Server 12 SP1 (HVM)， SSD 卷类型。",
            "totalImageSize": 10,
            "virtualizationType": "hvm"
        },
        {
            "description": "Ubuntu Server 14.04 LTS (HVM)，EBS 通用 (SSD) 卷类型，由 Canonical 提供支持 (http://www.ubuntu.com/cloud/services)。",
            "freeTier": true,
            "imageId64": "ami-0220b23b",
            "platform": "canonical",
            "ports": [
                22
            ],
            "position": 3,
            "rootDeviceType": "ebs",
            "title": "Ubuntu Server 14.04 LTS (HVM)，SSD 卷类型",
            "totalImageSize": 8,
            "virtualizationType": "hvm"
        },
        {
            "description": "Microsoft Windows 2012 R2 Standard edition with 64-bit architecture.[简体中文]",
            "freeTier": true,
            "imageId64": "ami-4d1bce20",
            "platform": "windows",
            "ports": [
                3389
            ],
            "position": 4,
            "rootDeviceType": "ebs",
            "title": "Microsoft Windows Server 2012 R2 Base（简体中文）",
            "totalImageSize": 40,
            "virtualizationType": "hvm"
        },
        {
            "description": "Microsoft Windows 2012 R2 Standard edition with 64-bit architecture.[繁体中文（香港）]",
            "freeTier": true,
            "imageId64": "ami-5a19cc37",
            "platform": "windows",
            "ports": [
                3389
            ],
            "position": 5,
            "rootDeviceType": "ebs",
            "title": "Microsoft Windows Server 2012 R2 Base（繁体中文，香港）",
            "totalImageSize": 40,
            "virtualizationType": "hvm"
        },
        {
            "description": "Microsoft Windows 2012 R2 Standard edition with 64-bit architecture.[繁体中文]",
            "freeTier": true,
            "imageId64": "ami-971fcafa",
            "platform": "windows",
            "ports": [
                3389
            ],
            "position": 6,
            "rootDeviceType": "ebs",
            "title": "Microsoft Windows Server 2012 R2 Base（繁体中文）",
            "totalImageSize": 40,
            "virtualizationType": "hvm"
        },
        {
            "description": "Microsoft Windows 2012 R2 Standard edition with 64-bit architecture.[英语]",
            "freeTier": true,
            "imageId64": "ami-2b1ecb46",
            "platform": "windows",
            "ports": [
                3389
            ],
            "position": 7,
            "rootDeviceType": "ebs",
            "title": "Microsoft Windows Server 2012 R2 Base (English)",
            "totalImageSize": 30,
            "virtualizationType": "hvm"
        },
        {
            "description": "Microsoft Windows Server 2012 R2 Standard edition, 64-bit architecture, Microsoft SQL Server 2016 Express edition. [English]",
            "freeTier": false,
            "imageId64": "ami-931fcafe",
            "platform": "windows",
            "ports": [
                1433,
                3389
            ],
            "position": 8,
            "rootDeviceType": "ebs",
            "title": "Microsoft Windows Server 2012 R2 with SQL Server Express",
            "totalImageSize": 50,
            "virtualizationType": "hvm"
        },
        {
            "description": "Microsoft Windows Server 2012 R2 Standard edition, 64-bit architecture, Microsoft SQL Server 2016 Web edition. [English]",
            "freeTier": false,
            "imageId64": "ami-8d1ecbe0",
            "platform": "windows",
            "ports": [
                1433,
                3389
            ],
            "position": 9,
            "rootDeviceType": "ebs",
            "title": "Microsoft Windows Server 2012 R2 with SQL Server Web",
            "totalImageSize": 50,
            "virtualizationType": "hvm"
        }
    ],
    region: "cn-north-1",
    total: 32
});

Mock.mock('api/v1.0/flavors', 'get', {
    success: true,
    object: {
        "families": [
            {
                "description": "微型实例是低成本的实例，可提供少量的 CPU 资源。微型实例很适合吞吐量较低的应用程序和需要定期增加计算周期的网站，但不适合需要持久 CPU 性能的应用程序。微型实例的常见用途包含: 低流量网站或博客、较小的管理应用程序、堡垒主机和开发 EC2 功能的免费试用。",
                "name": "微型实例",
                "types": [
                    {
                        "architectures": [
                            "x86_64",
                            "i386"
                        ],
                        "cpu": {
                            "cores": 1,
                            "units": "最多 2 个"
                        },
                        "description": "T1 微型",
                        "ebsEncryptionSupported": false,
                        "ebsOnly": true,
                        "family": "微型实例",
                        "freeTierEligible": true,
                        "legacy": true,
                        "memory": 0.613,
                        "networkPerformance": "Very Low",
                        "physicalProcessor": "Variable",
                        "typeName": "t1.micro",
                        "virtualizationTypes": [
                            "paravirtual"
                        ],
                        "vpc": true,
                        "windows": true
                    }
                ]
            },
            {
                "description": "通用型实例可实现计算、内存和网络资源的平衡，是很多应用程序的良好选择。建议将通用型实例用于小型和中型数据库、需要附加内存和缓存集群的数据处理作业，以及运行 SAP 的后端服务器、Microsoft SharePoint 和其他企业应用程序。",
                "name": "通用型",
                "types": [
                    {
                        "architectures": [
                            "x86_64",
                            "i386"
                        ],
                        "cpu": {
                            "cores": 1,
                            "units": "变量"
                        },
                        "description": "T2 微型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "family": "通用型",
                        "freeTierEligible": true,
                        "memory": 1,
                        "networkPerformance": "Low to Moderate",
                        "physicalProcessor": "Intel Xeon Family",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": false,
                        "typeName": "t2.micro",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64",
                            "i386"
                        ],
                        "cpu": {
                            "cores": 1,
                            "units": "变量"
                        },
                        "description": "T2 小型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "family": "通用型",
                        "memory": 2,
                        "networkPerformance": "Low to Moderate",
                        "physicalProcessor": "Intel Xeon Family",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": false,
                        "typeName": "t2.small",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64",
                            "i386"
                        ],
                        "cpu": {
                            "cores": 2,
                            "units": "变量"
                        },
                        "description": "T2 中型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "family": "通用型",
                        "memory": 4,
                        "networkPerformance": "Low to Moderate",
                        "physicalProcessor": "Intel Xeon Family",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": false,
                        "typeName": "t2.medium",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 2,
                            "units": "变量"
                        },
                        "description": "T2 大型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "family": "通用型",
                        "memory": 8,
                        "networkPerformance": "Low to Moderate",
                        "physicalProcessor": "Intel Xeon Family",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.4,
                        "spotSupported": false,
                        "typeName": "t2.large",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 1,
                            "units": "3"
                        },
                        "description": "M3 中型",
                        "dual": true,
                        "ebsEncryptionSupported": true,
                        "ebsOnly": false,
                        "family": "通用型",
                        "memory": 3.75,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 1,
                            "size": 4,
                            "ssd": true
                        },
                        "typeName": "m3.medium",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 2,
                            "units": "6.5"
                        },
                        "description": "M3 大型",
                        "dual": true,
                        "ebsEncryptionSupported": true,
                        "ebsOnly": false,
                        "ebsOptimizedSupported": false,
                        "family": "通用型",
                        "memory": 7.5,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 1,
                            "size": 32,
                            "ssd": true
                        },
                        "typeName": "m3.large",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 4,
                            "units": "13"
                        },
                        "description": "M3 超大型",
                        "dual": true,
                        "ebsEncryptionSupported": true,
                        "ebsOnly": false,
                        "ebsOptimizedSupported": true,
                        "family": "通用型",
                        "memory": 15,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 2,
                            "size": 40,
                            "ssd": true
                        },
                        "typeName": "m3.xlarge",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 8,
                            "units": "26"
                        },
                        "description": "M3 双倍超大型",
                        "dual": true,
                        "ebsEncryptionSupported": true,
                        "ebsOnly": false,
                        "ebsOptimizedSupported": true,
                        "family": "通用型",
                        "memory": 30,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 2,
                            "size": 80,
                            "ssd": true
                        },
                        "typeName": "m3.2xlarge",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64",
                            "i386"
                        ],
                        "cpu": {
                            "cores": 1,
                            "units": "1"
                        },
                        "description": "M1 小型",
                        "ebsEncryptionSupported": false,
                        "family": "通用型",
                        "legacy": true,
                        "memory": 1.7,
                        "networkPerformance": "Low",
                        "physicalProcessor": "Intel Xeon Family",
                        "riNotOfferedInRegions": [
                            "cn-north-1",
                            "cn-northwest-1"
                        ],
                        "storage": {
                            "count": 1,
                            "size": 160,
                            "ssd": false
                        },
                        "typeName": "m1.small",
                        "virtualizationTypes": [
                            "paravirtual"
                        ],
                        "vpc": true,
                        "windows": true
                    }
                ]
            },
            {
                "description": "计算优化型实例的 vCPU 与内存比率比其他系列高，且每个 vCPU 的成本是所有 Amazon EC2 实例类型中最低的。我们建议用计算优化型实例运行 CPU 限制型横向扩展应用程序。此类应用的示例包括，高流量前端集群、按需批量处理、分布式分析、Web 服务器、批量处理以及高性能科学与工程应用程序。",
                "name": "计算优化",
                "types": [
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 2,
                            "units": "8"
                        },
                        "description": "C4 大型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "ebsOptimizedByDefault": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 3.75,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2666v3",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.9,
                        "typeName": "c4.large",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 4,
                            "units": "16"
                        },
                        "description": "C4 超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "ebsOptimizedByDefault": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 7.5,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2666v3",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.9,
                        "typeName": "c4.xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 8,
                            "units": "31"
                        },
                        "description": "C4 双倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "ebsOptimizedByDefault": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 15,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2666v3",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.9,
                        "typeName": "c4.2xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 16,
                            "units": "62"
                        },
                        "description": "C4 四倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "ebsOptimizedByDefault": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 30,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2666v3",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.9,
                        "typeName": "c4.4xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 36,
                            "units": "132"
                        },
                        "description": "C4 八倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOnly": true,
                        "ebsOptimizedByDefault": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 60,
                        "networkPerformance": "10 Gigabit",
                        "physicalProcessor": "Intel Xeon E5-2666v3",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.9,
                        "typeName": "c4.8xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "vpcOnly": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64",
                            "i386"
                        ],
                        "cpu": {
                            "cores": 2,
                            "units": "7"
                        },
                        "description": "C3 大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": false,
                        "family": "计算优化",
                        "memory": 3.75,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2680v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.8,
                        "storage": {
                            "count": 2,
                            "size": 16,
                            "ssd": true
                        },
                        "typeName": "c3.large",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 4,
                            "units": "14"
                        },
                        "description": "C3 超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 7.5,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2680v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.8,
                        "storage": {
                            "count": 2,
                            "size": 40,
                            "ssd": true
                        },
                        "typeName": "c3.xlarge",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 8,
                            "units": "28"
                        },
                        "description": "C3 双倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 15,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2680v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.8,
                        "storage": {
                            "count": 2,
                            "size": 80,
                            "ssd": true
                        },
                        "typeName": "c3.2xlarge",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 16,
                            "units": "55"
                        },
                        "description": "C3 四倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "计算优化",
                        "memory": 30,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2680v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.8,
                        "storage": {
                            "count": 2,
                            "size": 160,
                            "ssd": true
                        },
                        "typeName": "c3.4xlarge",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 32,
                            "units": "108"
                        },
                        "description": "C3 八倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": false,
                        "family": "计算优化",
                        "memory": 60,
                        "networkPerformance": "10 Gigabit",
                        "physicalProcessor": "Intel Xeon E5-2680v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.8,
                        "storage": {
                            "count": 2,
                            "size": 320,
                            "ssd": true
                        },
                        "typeName": "c3.8xlarge",
                        "virtualizationTypes": [
                            "paravirtual",
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    }
                ]
            },
            {
                "description": "内存优化型实例的每 GB RAM 的成本是 Amazon EC2 实例类型中最低的。我们建议将内存优化型实例用于很多数据库应用程序、内存缓存和其他分布式缓存以及较大的企业应用程序部署，如 SAP 和 Microsoft SharePoint。",
                "name": "内存优化",
                "types": [
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 2,
                            "units": "6.5"
                        },
                        "description": "R3 大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": false,
                        "family": "内存优化",
                        "memory": 15,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 1,
                            "size": 32,
                            "ssd": true
                        },
                        "typeName": "r3.large",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 4,
                            "units": "13"
                        },
                        "description": "R3 超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "内存优化",
                        "memory": 30.5,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 1,
                            "size": 80,
                            "ssd": true
                        },
                        "typeName": "r3.xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 8,
                            "units": "26"
                        },
                        "description": "R3 双倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "内存优化",
                        "memory": 61,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 1,
                            "size": 160,
                            "ssd": true
                        },
                        "typeName": "r3.2xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 16,
                            "units": "52"
                        },
                        "description": "R3 四倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "内存优化",
                        "memory": 122,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 1,
                            "size": 320,
                            "ssd": true
                        },
                        "typeName": "r3.4xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 32,
                            "units": "104"
                        },
                        "description": "R3 八倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": false,
                        "family": "内存优化",
                        "memory": 244,
                        "networkPerformance": "10 Gigabit",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "storage": {
                            "count": 2,
                            "size": 320,
                            "ssd": true
                        },
                        "typeName": "r3.8xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    }
                ]
            },
            {
                "description": "存储优化型实例能向您提供经过优化，且适用于具有特定磁盘 I/O 和存储容量要求的应用程序的直连式存储选项。我们建议将 I2 实例用于可从极高的随机 I/O 性能与较低的直连式 SSD 请求延迟中获益的 NoSQL 数据库。我们建议使用 D2 实例运行较大规模的数据仓库或并行文件系统。",
                "name": "存储优化",
                "types": [
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 4,
                            "units": "14"
                        },
                        "defaultEphemerals": [
                            "f"
                        ],
                        "description": "高 I/O 超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "存储优化",
                        "memory": 30.5,
                        "networkPerformance": "Moderate",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": true,
                        "storage": {
                            "count": 1,
                            "size": 800,
                            "ssd": true
                        },
                        "typeName": "i2.xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 8,
                            "units": "27"
                        },
                        "defaultEphemerals": [
                            "f",
                            "g"
                        ],
                        "description": "高 I/O 双倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "存储优化",
                        "memory": 61,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": true,
                        "storage": {
                            "count": 2,
                            "size": 800,
                            "ssd": true
                        },
                        "typeName": "i2.2xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 16,
                            "units": "53"
                        },
                        "defaultEphemerals": [
                            "f",
                            "g",
                            "h",
                            "i"
                        ],
                        "description": "高 I/O 四倍超大型",
                        "ebsEncryptionSupported": true,
                        "ebsOptimizedSupported": true,
                        "family": "存储优化",
                        "memory": 122,
                        "networkPerformance": "High",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": true,
                        "storage": {
                            "count": 4,
                            "size": 800,
                            "ssd": true
                        },
                        "typeName": "i2.4xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    },
                    {
                        "architectures": [
                            "x86_64"
                        ],
                        "cpu": {
                            "cores": 32,
                            "units": "104"
                        },
                        "defaultEphemerals": [
                            "f",
                            "g",
                            "h",
                            "i",
                            "j",
                            "k",
                            "l",
                            "m"
                        ],
                        "description": "高 I/O 八倍超大型",
                        "ebsEncryptionSupported": true,
                        "family": "存储优化",
                        "memory": 244,
                        "networkPerformance": "10 Gigabit",
                        "physicalProcessor": "Intel Xeon E5-2670v2",
                        "placementGroupsSupported": true,
                        "processorFeatures": {
                            "AES-NI": true,
                            "AVX": true,
                            "Turbo": true
                        },
                        "processorSpeed": 2.5,
                        "spotSupported": true,
                        "storage": {
                            "count": 8,
                            "size": 800,
                            "ssd": true
                        },
                        "typeName": "i2.8xlarge",
                        "virtualizationTypes": [
                            "hvm"
                        ],
                        "vpc": true,
                        "windows": true
                    }
                ]
            }
        ],
        "footnotes": [
            {
                "text": "M1 实例是基于 Intel Xeon 处理器的。",
                "types": [
                    "m1.small"
                ]
            },
            {
                "text": "对于 M3 实例，每个 vCPU 均是来自 Intel Xeon E5-2670 处理器的硬件超线程。",
                "types": [
                    "m3.medium",
                    "m3.large",
                    "m3.xlarge",
                    "m3.2xlarge"
                ]
            },
            {
                "text": "C3 实例是最新一代的计算优化型实例。 对于 C3 实例，每个 vCPU 均是来自 Intel Xeon E5-2680v2 处理器的硬件超线程。",
                "types": [
                    "c3.large",
                    "c3.xlarge",
                    "c3.2xlarge",
                    "c3.4xlarge",
                    "c3.8xlarge"
                ]
            }
        ]
    }
});

Mock.mock('api/v1.0/login', 'post', {
    success: true,
    object: {
        token: 'sdaaafadsfewafeagfadgdfdfas',
        user: {
            id: 'userid',
            name: 'yangkai',
            accounts: [{
                sequenceId: 'sequenceId-1',
                type: 'amazon',
                alias: 'amazon-yangkai-001'
            }, {
                sequenceId: 'sequenceId-2',
                type: 'amazon',
                alias: 'amazon-yangkai-002'
            }, {
                sequenceId: 'sequenceId-3',
                type: 'aliyun',
                alias: 'aliyun-yangkai-001'
            }, {
                sequenceId: 'sequenceId-4',
                type: 'qingCloud',
                alias: 'qingCloud-yangkai-001'
            }, {
                sequenceId: 'sequenceId-5',
                type: 'tecent',
                alias: 'tecent-yangkai-001'
            }, {
                sequenceId: 'sequenceId-6',
                type: 'aliyun',
                alias: 'aliyun-yangkai-002'
            }]
        }
    }
});

Mock.mock('api/v1.0/login/exit', 'post', {
    success: true,
    object: {}
});

Mock.mock('api/v1.0/users/userid', 'get', {
    success: true,
    object: {
        id: 'userid',
        email: "yangkai@zte.com.cn",
        password: "200000",
        cellphone: "13913978541",
        name: "yangkai",
        accounts: [
            {
                sequenceId: "sequenceId-1",
                alias: "amazon-yangkai-001",
                type: "amazon",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "sequenceId-2",
                alias: "amazon-yangkai-002",
                type: "amazon",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "sequenceId-3",
                alias: "aliyun-yangkai-001",
                type: "aliyun",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "sequenceId-4",
                alias: "qingCloud-yangkai-001",
                type: "qingCloud",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "sequenceId-5",
                alias: "tecent-yangkai-001",
                type: "tecent",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "sequenceId-6",
                alias: "aliyun-yangkai-002",
                type: "aliyun",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            }
        ]
    }
});