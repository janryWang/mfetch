/**
 * 
 * params插件，用于设置params
 * 
 */

import { isStr, isObj,isForm ,getMethod,lowerCase,json2formdata,contentTypeIs} from '../lang'
import qs from 'query-string'


const parseUrl = (url) => {
    const ac = document.createElement('a')
    ac.href = url
    return ac
}

const appendUrl = (url, params) => {
    const ac = parseUrl(url)
    ac.search = qs.stringify(params)
    return ac.href
}

const extractUrl = (url) => {
    return qs.parse(
        qs.extract(String(url))
    )
}


const extractParams = (params) => {
    const result = {}
    if(isStr(params)){
        return qs.parse(params)
    } else if(isForm(params)){
        for (let key of params.keys()) {
            if (!result.hasOwnProperty(key)) {
                result[key] = params.get(key)
            } else {
                result[key] = params.getAll(key)
            }
        }
        return result
    } else if(isObj(params)){
        return params
    } else {
        return result
    }
}



const transformParams = (options,params)=>{

    const is = type=>contentTypeIs(options,type)

    if(is(['application','json'])){
        return JSON.stringify(params)
    } else if(is(['multipart','formdata'])){
        return json2formdata(params)
    } else if(is(['application','x-www-form-urlencoded'])){
        return qs.stringify(params)
    }
}

const filterParams = (params,names)=>{
    return Object.keys(params || {}).reduce((buf,key)=>{
        if(names.indexOf(key) == -1){
            buf[key] = params[key]
        }
        return buf
    },{})
}

const pickParams = (params,names)=>{
    return Object.keys(params || {}).reduce((buf,key)=>{
        if(names.indexOf(key) > -1){
            buf[key] = params[key]
        }
        return buf
    },{})
}

export const params = (params) => ({
    processOption(options, previous) {
        options = previous(options)

        const varNames = options.uri ? options.uri.varNames : []

        params = extractParams(params)

        options.url = options.uri ? options.uri.fill(pickParams(params,varNames)) : options.url

        switch (getMethod(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                const url_params = Object.assign(
                    extractUrl(options.url),
                    filterParams(params,varNames)
                )

                options.url = appendUrl(options.url, url_params)

                return options


            default:

                options.body = transformParams(options,
                    Object.assign(
                        extractParams(options.body),
                        filterParams(params,varNames)
                    )
                )

                return options

        }

    }
})