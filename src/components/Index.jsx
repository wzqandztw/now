import React,{Component} from "react";
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom";
import routerConfig from "../router/config.jsx"

class Index extends Component{
    render(){
        return <Router>
            <Switch>
            {
                routerConfig.map((item,index)=>{
                    return <Route key={index} path={item.path} render={(routemasg)=>{
                        let Com = item.component;
                        return <Com children={item.children} routemasg={routemasg}/>
                    }}/>
                })
            }
            <Redirect from="/" to="/count"></Redirect>
            </Switch>
        </Router>
    }
}
export default Index;