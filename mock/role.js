module.exports = [
    {
        url: '/admin/role/list',
        type: 'get',
        response: config => {
            return {
                code: 0,
                msg: 'success',
                data: {
                    total: 100,
                    current: config.query.page,
                    limit: 15,
                    'data|15': [{
                        "id|+1": config.query.page * 15 - 14,
                        "roleName": "@ctitle(10)",
                    }]
                }
            }
        }
    },
    {
        url: '/admin/role/[0-9]',
        type: 'delete',
        response: () => {
            if (Math.random() * 10 > 7) {
                return {
                    code: 1,
                    msg: '删除失败',
                    data: {}
                }
            }
            return {
                code: 0,
                msg: 'success',
                data: {}
            };
        }
    }

]
