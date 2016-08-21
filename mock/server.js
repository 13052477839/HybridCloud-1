Mock.mock('api/v1.0/users?order=asc&offset=0&limit=10', 'get', {
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