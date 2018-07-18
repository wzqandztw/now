import React,{Component} from "react";
import {connect} from "react-redux";
import axios from "axios";
import {INIT_DATA} from "../store/reducer/actions";
import {PORT} from "../port"

class Computed extends Component{
    render(){
        let {userList,sumMoney} = this.props;
        return <div className="computed">
                <header>
                    <h3>{sumMoney}</h3>
                </header>
                <section>
                    <ul>
                        <li>
                            <span>姓名</span>
                            <span>个人总计</span>
                            <span>平均金额</span>
                            <span>应付</span>
                            <span>应收</span>
                        </li>
                        {
                            userList&&userList.map((item,index)=>{
                                let average = sumMoney/userList.length;
                                let should = item.moneyBase<average?average-item.moneyBase:0
                                let have = item.moneyBase>average?item.moneyBase-average:0
                                return <li>
                                            <span>{item.userName}</span>
                                            <span>{item.moneyBase}</span>
                                            <span>{average}</span>
                                            <span>{should}</span>
                                            <span>{have}</span>
                                        </li>
                            })
                        }
                    </ul>
                </section>
            </div>
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
Computed = connect(mapState,mapDispatch)(Computed)
export default Computed;