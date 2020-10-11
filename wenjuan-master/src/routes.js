import Login from './views/Login.vue'
import Home from './views/Home.vue'
import MyQuestion from './pages/MyQuestion.vue'
import CreateQuestion from './pages/CreateQuestion.vue'
import EditQuestion from './pages/EditQuestion.vue'
import UserCenter from './pages/UserCenter.vue'
import H5 from './pages/H5.vue'
import Static from './pages/static.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        title: "首页",
        children: [{
            path: '/create',
            component: CreateQuestion,
            name: '创建问卷',
            hidden: true
        },{
            path: '/myquestion',
            component: MyQuestion,
            name: '创建问卷',
            hidden: true
        },{
            path: '/editquestion',
            component: EditQuestion,
            name: '编辑问卷',
            hidden: true
        },{
            path: '/userCenter',
            component: UserCenter,
            name: '用户中心',
            hidden: true
        },{
            path: '/static',
            component: Static,
            name: '统计分析',
            hidden: true
        }]
    },{
        path: '/h5',
        component: H5,
        name: '',
        hidden: true
    }

];

export default routes;