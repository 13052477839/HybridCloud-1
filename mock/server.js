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