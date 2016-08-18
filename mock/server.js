Mock.mock('api/rest/table1?order=asc&offset=0&limit=10', 'get', {
    res: [{
        id:1,
        name:'ceshi1'
    },{
        id:2,
        name:'ceshi2'
    }],
    total: 2
});