import React,{Component} from "react";
import { DatePicker, List ,Picker, InputItem , Button,WhiteSpace,Modal} from 'antd-mobile';
import axios from "axios";
import {connect} from "react-redux";
import {INIT_DATA,SUBMIT_USER} from "../store/reducer/actions";
import {PORT} from "../port"

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class Submit extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal1: false,
            modal2:false,
            date: now,
            money:"",
            remark:"",
            sValue: []
          }
    }
    render(){
        let {modal1,date,sValue,money,remark} = this.state;
        let {userList} = this.props;
        let userlist=[userList.map((item,index)=>{
            return {
                label:item.userName,
                value:item.userName
            }
        })]
        return <div className="submit" key="1212">
                <DatePicker
                    mode="date"
                    title="Select Date"
                    extra="Optional"
                    value={date}
                    onChange={date =>this.setState({ date })}
                    >
                    <List.Item arrow="horizontal">时间</List.Item>
                </DatePicker>
                <Picker
                    key="045"
                    data={userlist}
                    title="选择姓名"
                    cascade={false}
                    value={sValue}
                    onChange={v => this.setState({ sValue: v })}
                    onOk={v => this.setState({ sValue: v })}
                    >
                    <List.Item arrow="horizontal">姓名</List.Item>
                    </Picker>
                    <InputItem
                        placeholder="请输入金额"
                        onChange={(v)=>{this.setState({money:v})}}
                    >金额</InputItem>
                    <InputItem
                        placeholder="请输入备注"
                        onChange={v=>this.setState({remark:v})}
                    >用途备注</InputItem>
                    <div className="btn">
                    <Button inline="true" type="primary" size="small" onClick={
                        this.showModal('modal1')}>添加</Button>
                        <WhiteSpace />
                            <Modal
                                visible={modal1}
                                transparent
                                maskClosable={false}
                                onClose={this.onClose('modal1')}
                                footer={
                                    [
                                        { 
                                            text: '确定', 
                                            onPress: () => {  
                                                this.addList(this.dealDate(date),sValue,money,remark)
                                                this.onClose('modal1')(); 
                                            }
                                        },
                                        {
                                            text:"取消",
                                            onPress:()=>{
                                                console.log("qx");
                                                this.onClose("modal1")()
                                            }
                                        } 
                                    ]}
                                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            >
                            <div className="submit_modal">
                                <h2>请确认</h2>
                                <p><span>时间</span><span>{this.dealDate(date)}</span></p>
                                <p><span>姓名</span><span>{sValue}</span></p>
                                <p><span>金额</span><span>{money}</span></p>
                                <p><span>用途备注</span><span>{remark}</span></p>
                            </div>
                            </Modal>
                    <Button inline="true" type="warning" size="small">清空</Button>
                    </div>
            </div>
    }
    dealDate(data){
        return data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate()
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    showAlert = () => {
        alert('Delete', 'Are you sure???', [
          { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
          { text: 'OK', onPress: () => console.log('ok') },
        ])
    }
    showModal = key => (e) => {
        e.preventDefault(); 
        this.setState({
            [key]: true,
        });
    }
    addList(date,sValue,money,remark){
        let obj = {};
        obj.userName=sValue[0];
        obj.date=date;
        obj.money=money;
        obj.remark=remark;
        let aa=this.props.userList.filter((item)=>{
            return item.userName===sValue[0]
        })
        this.props.getLast(addRemark(aa[0].userId,obj))
        
    }
    componentDidMount(){
        axios.get(PORT+"/getallList").then((res)=>{
            this.props.getLast({type:INIT_DATA,allList:res.data})
        })
    }
}
let addRemark = (userId,userObj)=>{
    return (dispatch)=>{
        return axios.post("http://localhost:8000/remark",{
        data:{
            userId,
            userObj
        }
    }).then((res)=>{
        console.log(res.data)
        dispatch({type:SUBMIT_USER,userId,userObj,moneyList:res.data.moneyList})
    })
    }
    
}
let mapState = (state) => {
    return {
        userList:state.Count.userList,
        moneyList:state.Count.moneyList
    }
}
let mapDispatch = (dispatch) => {
    return {
        getLast(fn){
            dispatch(fn)
        }
    }
}
Submit=connect(mapState,mapDispatch)(Submit)
export default Submit;