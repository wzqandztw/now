import React,{Component} from "react";
import {InputItem,List} from "antd-mobile";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {INIT_DATA} from "../store/reducer/actions";
import axios from "axios";
import {PORT} from "../port"

const Item = List.Item;

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow:true,
            val:""
        }
    }
    render(){
        let {isShow,val}=this.state;
        let {userList,sumMoney} = this.props;
        return <div className="home">
                <section>
                    <p className="sum">{sumMoney}</p>
                    <h4>嗨，402的美女帅哥</h4>
                    <button className="input">
                    {isShow?<InputItem
                        type="password"
                        placeholder="****"
                        onChange={(val)=>{this.setState({val})}}
                        onKeyDown={(e)=>{
                            if(e.keyCode===13){
                                if(val==="123"){
                                    this.setState({isShow:false})
                                }else{
                                    alert("密码错误")
                                }
                            }
                        }}
                    >密码</InputItem>:<Link to="/manger">管理用户</Link>}
                    </button>
                    <ol className="pao">
                        <li>xxx提交了xxx元钱</li>
                    </ol>
                    <List className="my-list">
                    {
                        userList&&userList.map((item,index)=>{
                            //return <Link to={{path:"/count/detail",state:{pid:item.usrId}}}><Item extra={`${item.moneyBase}`}>{item.userName}</Item></Link>
                            return <span key={index} onClick={this.click.bind(this,item.userId)}><Item extra={`${item.moneyBase}`}>{item.userName}</Item></span>
                        })
                    }
                    </List>
                </section>
            </div>
    }
    click(userId){
        this.props.history.push({ pathname:'/count/detail',state:{pid : userId } })
    }
    componentDidMount(){
        axios.get(PORT+"/getallList").then((res)=>{
            this.props.getLast({type:INIT_DATA,allList:res.data})
        })
    }
}
let mapState = (state) => {
    return {
        userList:state.Count.userList,
        sumMoney:state.Count.sumMoney
    }
}
let mapDispatch = (dispatch) => {
    return {
        getLast(fn){
            dispatch(fn)
        }
    }
}
Home=connect(mapState,mapDispatch)(Home)
export default Home;