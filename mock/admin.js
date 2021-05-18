module.exports = [
    {
        url: '/admin/login',
        type: 'post',
        response: () => {
            return {
                code: 20000,
                data: 'token'
            }
        }
    }
]
