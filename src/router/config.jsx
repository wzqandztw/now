import Count from "../components/Count";
import Home from "../components/Home";
import Detail from "../components/Detail";
import Submit from "../components/Submit";
import Computed from "../components/Computed";
import Manger from "../components/Manger";

let routerConfig = [
    {
        path:"/count",
        component:Count,
        children:[
            {
                path:"/home",
                title:"首页",
                component:Home,
                type:"cross-circle"
            },
            {
                path:"/detail",
                component:Detail,
                title:"详情",
                type:"cross-circle"
            },
            {
                path:"/submit",
                component:Submit,
                title:"提交",
                type:"cross-circle"
            },
            {
                path:"/computed",
                component:Computed,
                title:"结算",
                type:"cross-circle"
            }
        ]
    },
    {
        path:"/manger",
        component:Manger
    }
];

export default routerConfig;