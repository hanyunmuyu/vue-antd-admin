import request from "@/utils/request";

export const getRoleList = (page: number = 1) => {
    return request({
        url: '/admin/role/list',
        params: {page: page}
    })
}

export const deleteRoleById = (roleId: number) => {
    return request({
        url: '/admin/role/' + roleId,
        method: 'delete'
    })
}
