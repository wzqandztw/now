import React,{Component} from "react";
import {NavBar,Icon,Modal, Button, WingBlank,InputItem,List} from "antd-mobile";
import {connect} from "react-redux";
import {INIT_DATA,ADD_USER,DEL_USER,MODIFY_USER} from "../store/reducer/actions";
import axios from "axios";
import {PORT} from "../port"

const Item = List.Item;
const alert = Modal.alert;

class Manger extends Component{
    constructor(props) {
        super(props);
        this.footer1=[
            { 
                text: '确定', 
                onPress: () => {
                    this.onClose('modal1')();
                    this.click();
                }
            },
            {
                text:"取消",
                onPress:()=>{console.log("qx");this.onClose("modal1")()}
            } 
        ]
        this.state = {
          modal1: false,
          modal2:false,
          userId:"",
          userName:"",
          moneyBase:"",
          modifyName:"",
          changId:0
        };
      }
    render(){
        let {userList} = this.props;
        let {modifyName} = this.state;
        return <div className="manger">
            <header key="0">
            <NavBar
                key="0"
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.routemasg.history.push("/count/home")}
                rightContent={[
                    <WingBlank size="lg">
                        <Button onClick={this.showModal('modal1')}>添加</Button>
                            <Modal
                                visible={this.state.modal1}
                                transparent
                                onClose={this.onClose('modal1')}
                                footer={this.footer1}
                            >
                            <div>
                                <InputItem
                                    key="0"
                                    placeholder="请输入用户id"
                                    onChange={val=>this.setState({userId:val})}
                                >用户id</InputItem>
                                <InputItem
                                    key="1"
                                    placeholder="请输入用户姓名"
                                    onChange={val=>this.setState({userName:val})}
                                >姓名</InputItem>
                                <InputItem
                                    key="2"
                                    placeholder="请输入用户金钱基数"
                                    onChange={val=>this.setState({moneyBase:val})}
                                >金钱基数</InputItem>
                            </div>
                            </Modal>
                        </WingBlank>
                ]}
                >用户管理</NavBar>
            </header>
            <section>
            <List className="my-list">
            <Item>
                <Button inline="true">操作</Button>
                <Button inline="true">姓名</Button>
                <Button inline="true">用户ID</Button>
                <Button inline="true">操作</Button>
            </Item>
                {
                    userList&&userList.map((item,index)=>{
                        return <Item key={index}>
                                    <Button inline="true" onClick={this.showModal('modal2',item.userId)}>修改</Button>
                                    <Button inline="true">{item.userName}</Button>
                                    <Button inline="true">{item.userId}</Button>
                                    <Button inline="true" onClick={()=>{
                                        this.showAlert(item.userId)
                                    }}>del</Button>
                                </Item>
                    })
                }
                <Modal
                    visible={this.state.modal2}
                    transparent
                    onClose={this.onClose('modal2')}
                    footer={[
                        { 
                            text: '确定', 
                            onPress: (val) => {
                                this.onClose('modal2')();
                                this.modify(modifyName)
                            }
                        },
                        {text:"取消",onPress:()=>{console.log("qx");this.onClose("modal2")()}} 
                    ]}
                >
                <div>
                    <h3>修改用户名</h3>
                    <InputItem
                        key="1"
                        placeholder="请输入用户姓名"
                        onChange={val=>this.setState({modifyName:val})}
                    >姓名</InputItem>
                </div>
                </Modal>
            </List>
            </section>
        </div>
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    showModal = (key,userId) => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
            userId:userId
        });
    }
    showAlert = (userId) => {
        alert('Delete', 'Are you sure???', [
          { text: 'Cancel', onPress: () => console.log('cancel')},
          { text: 'OK', onPress: () => {
              this.del(userId)
          } },
        ])
    }
    click(){
        let {userId,userName,moneyBase} = this.state;
        this.props.adduser(adduserFn({userId,userName,moneyBase}))
        this.setState({ userId:"",userName:"",moneyBase:""})
    }
    del(userId){
        axios.post(PORT+"/del",{
            data:{userId}
        }).then((res)=>{
            if(res.data.flag===1){
                this.props.adduser({type:DEL_USER,userId})
                alert("删除成功")
            }
        })
        
    }
    modify(modifyName){
        let {userId} = this.state;
        axios.post(PORT+"/change",{
            data:{userId,modifyName}
        }).then((res)=>{
            if(res.data.flag===0){
                alert("修改内容不能为空")
            }else if(res.data.flag===1){
                this.props.adduser({type:MODIFY_USER,userId,modifyName})
                alert("修改成功")
            }
        })
        this.setState({modifyName:""})

    }
    componentDidMount(){
        axios.get(PORT+"/getallList").then((res)=>{
            console.log(res.data)
            this.props.adduser({type:INIT_DATA,allList:res.data})
        })
    }
}
let adduserFn=({userId,userName,moneyBase})=>{
    return (dispatch)=>{
        axios.post(PORT+"/addUser",{
            data:{userId,userName,moneyBase}
        }).then((res)=>{
            if(res.data.flag===0){
                alert("id不能重复")
            }else if(res.data.flag===1){
                dispatch({type:ADD_USER,isSuccess:res.data.flag,userId,userName,moneyBase})
            }else if(res.data.flag===2){
                alert("输入内容不能为空")
            }
        })
    }
}
let mapState = (state)=>{
    return {
        userList:state.Count.userList
    }
}
let mapDispatch = (dispatch)=>{
    return {
        adduser(fn){
            dispatch(fn)
        }
    }
}
Manger = connect(mapState,mapDispatch)(Manger)
export default Manger;