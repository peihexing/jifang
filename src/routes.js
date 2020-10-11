import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Devices from './pages/jigui/Devices.vue'
import DevicesDetail from './pages/jigui/DevicesDetail.vue';

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
            path: '/devices',
            component: Devices,
            name: 'devices',
            hidden: true
        },{
            path: '/detail',
            component: DevicesDetail,
            name: 'detail',
            hidden: true
        }]
    }
];

export default routes;