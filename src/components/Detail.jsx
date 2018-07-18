import React,{Component} from "react";
import axios from "axios";
import {DETAIL} from "../store/reducer/actions";
import {connect} from "react-redux";
import {PORT} from "../port"

class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:"-1"
        }
    }
    render(){
        let {detailList} = this.props;
        return <div className="detail">
                    <h3>用户信息</h3>
                    <h3>{detailList[0]?detailList[0].userName:null}</h3> 
                {
                    detailList&&detailList.map((item,index)=>{
                        return index===detailList.length-1?null:<p key={index}>
                                <span>{item.date}</span>
                                <span>{item.money}</span>
                                <span>{item.remark}</span>
                            </p>
                    })
                }
                
            }
        </div>
    }
    componentDidMount(){
       
        axios.get("/getDetail").then((res)=>{
            this.props.getData({type:DETAIL,pid:this.props.location.state.pid?this.props.location.state.pid:""})
        })
        let pid = this.props.location.state.pid
    }
}
let mapState = (state) => {
    return {
        detailList:state.Count.detailList
    }
}
let mapDispatch = (dispatch) =>{
    return {
        getData(fn){
            dispatch(fn)
        }
    }
}
Detail = connect(mapState,mapDispatch)(Detail)
export default Detail;