import React,{Component} from "react";
import {Route,NavLink,Redirect,Switch} from "react-router-dom";
import {Icon,NavBar} from "antd-mobile";

class Count extends Component{
    render(){
        let {children,routemasg} = this.props;
        return <div className="wrap">
                <header>
                    <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => routemasg.history.go(-1)}
                    ></NavBar>
                </header>
            <Switch>
            {
                children.map((item,index)=>{
                    return <Route key={index} path={routemasg.match.url+item.path} render={({history,location,match})=>{
                        let Con=item.component;
                        return <Con history={history} location={location} match={match}/>
                    }}></Route>
                })
                
            }
            
            <Redirect from="/count" to="/count/home"></Redirect>
            </Switch>
            <footer>
            {
                children.map((item,index)=>{
                    return <NavLink key={index} to={routemasg.match.url+item.path}>
                        <Icon type={item.type}></Icon>
                        {item.title}</NavLink>
                    
                })
            }
            
            </footer>
            
        </div>
    }
}
export default Count;