Mock.mock('api/v1.0/users?sort=name&order=asc&offset=0&limit=10', 'get', {
    object: [{
        id: 1,
        name: 'ceshi1',
        password: 'xxxxxx',
        cellphone: '12312312333',
        email: 'super@123.com'

    }, {
        id: 2,
        name: 'ceshi2',
        password: 'xxxxxx',
        cellphone: '12312312333',
        email: 'super@123.com'
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
                id: "25552525",
                name: "awsaccount1",
                password: "ssssssss",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                id: "25552525",
                name: "awsaccount1",
                password: "ssssssss",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                id: "25552525",
                name: "awsaccount1",
                password: "ssssssss",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                id: "25552525",
                name: "awsaccount1",
                password: "ssssssss",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                id: "25552525",
                name: "awsaccount1",
                password: "ssssssss",
                type: "aws",
                awsAccessKeyId: "SSSEERERER",
                awsSecretAccessKey: "EEEEEEEEEE########"
            },
            {
                sequenceId: "25552525",
                id: "25552525",
                name: "awsaccount1",
                password: "ssssssss",
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

Mock.mock('api/v1.0/instances?order=asc&offset=0&limit=10','get',{
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