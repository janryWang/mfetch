# sugar-fetch

sugar-fetch will provide you with a strong ability to request resource management, at the same time, you can use it very simply

# Installation

You can install with npm.

```
npm install sugar-fetch

```

# Usage

The sugar-fetch not only supports any request method, but also supports jsonp request, and it also supports request/response global interceptor.

## Fetch something in sample way

```

import {fetch} from 'sugar-fetch'

fetch('http://xxxx',{
	params:{
		arg:'This is arg'
	}
}) .then(res=>res.json())
.then(res=>console.log(res))

or

fetch({
    url:'http://xxxx',
    params:{
        arg:'This is arg'
    }
}).then(res=>res.json())
.then(res=>console.log(res))


```

## Fetch something with complex parameters

```

import {fetch} from 'sugar-fetch'

const complex_params = {
    param1:'param1',
    param2:'param2'
}

fetch({
    url:'http://xxxx',
    params:{
        arg:'This is arg',
        obj:JSON.stringify(complex_params)
    }
}).then(res=>res.json())
.then(res=>console.log(res))


```

## Fetch jsonp

```
import {fetch} from 'sugar-fetch'

fetch({
    url:'http://xxxx',
    method:'jsonp',
    params:{
        arg:'This is arg'
    }
}).then(res=>res.json())
.then(res=>console.log(res))


```

## send request with cookie

### CORS request

```
import {fetch} from 'sugar-fetch'

fetch({
    url:'http://xxxx',
    method:'jsonp',
    params:{
        arg:'This is arg'
    },
    credentials:'include'
}).then(res=>res.json())
.then(res=>console.log(res))

```

### same domain

```
import {fetch} from 'sugar-fetch'

fetch({
    url:'http://xxxx',
    method:'jsonp',
    params:{
        arg:'This is arg'
    },
    credentials:'same-origin'
}).then(res=>res.json())
.then(res=>console.log(res))
```


## Fetch FormData

```

import {fetch} from 'sugar-fetch'


fetch({
    url:'http://xxxx',
    method:'post',
    headers:{
        'Content-Type':'multipart/formdata;charset=utf8'
    },
    params:{
        arg:'This is arg'
    }
}).then(res=>res.json())
.then(res=>console.log(res))


```

## Use interceptor to intercept requests

```
import {fetch,interceptor} from 'sugar-fetch'


interceptor({
    request(options){
        options.url += '&aaa=bbb'
        return options         // You can solve the asynchronous problem by returning the Promise object.
    },
    response(response){
        return response.json()
    }
})



fetch({
    url:'http://xxxx',
    params:{
        arg:'This is arg'
    }
}).then(res=>console.log(res))


```


## Use the resource API to abstract your requests

```
import {resource} from 'sugar-fetch'

const getSiteInfo = resource('http://xxxxx',{/** options **/})
const getUserInfo = resource({
    url:'http://xxxx',
    method:'jsonp'
})

const getCombineInfo = resource((data)=>{
    return getSiteInfo(data)
        .then(res=>res.json())
        .then(res=>getUserInfo(res.data))
})

getCombineInfo({
    params:'params'
}).then(res=>res.json())
.then((res)=>{
    console.log(res)
})


```


## Use URI Template([RFC6570](http://tools.ietf.org/html/rfc6570))

```

import {resource} from 'sugar-fetch'

const getSiteInfo = resource('/{id}?xxx')

getSiteInfo({
    id:12333
})
.then(res=>res.json())
.then(()=>{


})


```


# API

## fetch

fetch(url : String,[options : Object]) : Promise

fetch(options : Object) : Promise

## resource

resource(url : String,[options : Object]) : Promise

resource(options : Object) :Promise

resource(callback : Function) :Promise



## interceptor


interceptor(Interceptors : Object)


## extension

extension([plugins,...])



# License

MIT
