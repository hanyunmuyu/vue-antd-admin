import {createRouter, createWebHashHistory} from "vue-router";

const Login = () => import('@/pages/login/index.vue')
const AdminLayout = () => import('@/components/AdminLayout.vue')
const DashBoard = () => import('@/pages/dashboard/index.vue')
const RoleList = () => import('@/pages/role/RoleList.vue')
const AdminList = () => import('@/pages/admin/AdminList.vue')
export const authRoutes = [
    {
        path: '/',
        component: AdminLayout,
        name: 'dashboard',
        title: '仪表盘',
        icon: 'HomeOutlined',
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                title: '仪表盘',
                icon: 'UserOutlined',
                component: DashBoard,
            }
        ]
    },
    {
        path: '/role',
        name: 'role',
        title: '角色管理',
        icon: 'UserOutlined',
        component: AdminLayout,
        children: [
            {
                path: '/role/list',
                name: 'roleList',
                title: '角色列表',
                icon: 'UserOutlined',
                component: RoleList,
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        title: '管理员管理',
        icon: 'UserOutlined',
        component: AdminLayout,
        children: [
            {
                path: '/admin/list',
                name: 'adminList',
                title: '管理员列表',
                icon: 'UserOutlined',
                component: AdminList,
            }
        ]
    },
]
export const routes = [
    ...authRoutes,
    {path: '/login', component: Login},
]
const router = createRouter({history: createWebHashHistory(), routes: routes})
// 可以在这里做权限管理
// const path = '/role/list'
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         next()
//     } else {
//         if (to.path !== path) {
//             next({path: '/login'});
//         } else {
//             return next()
//         }
//     }
// })
export default router
