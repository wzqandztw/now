import {INIT_DATA,ADD_USER,DEL_USER,MODIFY_USER,SUBMIT_USER,DETAIL} from "./actions";

function computedMoney(userList){
    return userList.reduce((prev,item)=>{
        return prev+Number(item.moneyBase)
    },0)
}
let typeObj = {
    [INIT_DATA](state,action){
        state.userList=action.allList
        state.sumMoney=computedMoney(state.userList)
    },
    [ADD_USER](state,action){
        if(action.isSuccess===1){
            let userObj={userId:action.userId,userName:action.userName,moneyBase:action.moneyBase}
            state.userList.push(userObj)
        }
        state.sumMoney=computedMoney(state.userList)
    },
    [DEL_USER](state,action){
        let {userList} = state;
        let index=userList.findIndex((item)=>{return item.userId===action.userId})
        userList.splice(index,1)
        state.sumMoney=computedMoney(state.userList)
    },
    [MODIFY_USER](state,action){
        let {userList} = state;
        let {userId,modifyName} = action;
        userList.forEach((item,index)=>{
            item.userId===userId?item.userName=modifyName:null;
        })
        state.sumMoney=computedMoney(state.userList)
    },
    [SUBMIT_USER](state,action){
        let {userId,userObj,moneyList} = action;
        state.moneyList=moneyList;
        if(state.moneyList.length===0){
            state.moneyList.push({[userId]:[userObj]})
        }else{
            state.moneyList.forEach((item,index)=>{
                for(let key in item){
                    if(key===userId){
                        item[key].push(userObj)
                    }else{
                        state.moneyList.push({[userId]:[userObj]})
                        let lObj=state.userList.find(it=>it.userName===userObj.userName);
                        lObj.moneyBase=lObj.moneyBase*1+userObj.money*1
                    }
                }
            })
        }

    },
    [DETAIL](state,action){
        let {moneyList,detailList} = state;
        let {pid} = action;
        moneyList.map((item,index)=>{
            for(let key in item){
                if(pid===key){
                   return state.detailList=item[key]
                }
            }
        })
    }
}
const Count = (state={userList:[],sumMoney:0,moneyList:[],detailList:[]},action)=>{
    typeObj[action.type]&&typeObj[action.type](state,action);
    return {...state,userList:[...state.userList],sumMoney:state.sumMoney,moneyList:[...state.moneyList],detailList:[...state.detailList]}
}


export default Count;