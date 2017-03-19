import {fetch,interceptor,resource,extension} from 'mfetch'





extension({
    processOption(options,previous){
        console.log('这是一个扩展，它会给options注入一些值')
        options.stamp = new Date().getTime()
        return previous(options)
    }
})

interceptor({
    request(options){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log('发请求了',options)
                resolve(options)
            },4000)
        })
    },
    response(res){
        console.log(res)
        return res
    }
})

fetch({
    url:'/',
    method:'post',
    headers:{
        'Content-Type':'multipart/formdata;charset=utf8'
    },
    params:{
        a:'aaa',
        b:'bbb',
        'a&b':'cccc'
    },
    credentials:'include'
}).then((res)=>res.json())
.then(res=>{
    console.log(res)
})


fetch({
    url:'/test',
    params:{
        a:'b',
        'c&&k':5
    }
}).then((res)=>res.json())
.then(res=>{
    console.log(res)
})

resource('hello1232333',{
    url:'/{id}?oop=1222',
    method:'post',
    headers:{
        'Content-Type':'multipart/formdata;charset=utf8'
    },
    body:'hello=sss&id=3',
    params:{
        nima:'sucks'
    }
})({
    test:[1,2,3,4],
    id:'123123',
    test1:'aaa2'
})


resource((data)=>{
    return new Promise((resolve)=>{
        setTimeout(function() {
            resolve(data)
        }, 1000);
    })
})({
    params:'aaaa'
}).then(res=>console.log(res))
