import Mock from "mockjs";

let userList=[];


let moneyList = []
Mock.mock("/getallList",(res)=>{
    return userList
})
Mock.mock("/addUser",(res)=>{
    let {userId,userName,moneyBase} = JSON.parse(res.body).data;
    
    let isSuccess=userList.filter((item,index)=>{
        return String(item.userId)===userId&&item.userName===userName
    })
    if(isSuccess.length>0){
        return {flag:0}
    }else if(userId===""||userName===""||moneyBase===""){
        return {flag:2}
    }else{
        userList.push({userId,userName,moneyBase});
        return {flag:1}
    }
})
Mock.mock("/modify",(res)=>{
    let {modifyName,userId} = JSON.parse(res.body);
    userList.forEach((item,index)=>{
        item.userId===userId?item.userName=modifyName:null
    })
    if(modifyName===""){
        return {flag:0}
    }else{
        return {flag:1}
    }
})
Mock.mock("/del",(res)=>{
    
    return {flag:1}
})
Mock.mock("/remark",(res)=>{
    let remarkKey = JSON.parse(res.body).userId;
    let obj = JSON.parse(res.body).userObj
    if(moneyList.length===0){
        moneyList.push({[remarkKey]:[obj]})
    }else{
        moneyList.forEach((item)=>{
            for(let key in item){
                if(key===remarkKey){
                    item[key].push(obj)
                }else{
                    moneyList.push({[remarkKey]:[obj]})
                }
            }
        })
    }
    let lObj=userList.find(it=>it.userName===obj.userName);
    lObj.moneyBase=lObj.moneyBase*1+obj.money*1
    return {moneyList,flag:1}
})
Mock.mock("/getDetail",(res)=>{
    return {flag:1}
})