Mock.mock('api/v1.0/users?sort=name&order=asc&offset=0&limit=10', 'get', {
    object: [{
        id:1,
        name:'ceshi1',
        password: 'xxxxxx',
        cellphone: '12312312333',
        email: 'super@123.com'

    },{
        id:2,
        name:'ceshi2',
        password: 'xxxxxx',
        cellphone: '12312312333',
        email: 'super@123.com'
    }],
    total: 2
});

Mock.mock('api/v1.0/users/1','get',{
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

Mock.mock('api/v1.0/images/private?order=asc&offset=0&limit=10','get',{
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
   ] 
});