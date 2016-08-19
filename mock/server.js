Mock.mock('api/v1.0/user?order=asc&offset=0&limit=10', 'get', {
    res: [{
        id:1,
        name:'ceshi1',
        creater: 'super',
        phone: '12312312333',
        email: 'super@123.com'

    },{
        id:2,
        name:'ceshi2',
        creater: 'super',
        phone: '12312312333',
        email: 'super@123.com'
    }],
    total: 2
});