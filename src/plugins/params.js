/**
 * 
 * params插件，用于设置params
 * 
 */

import { isStr, isObj,isForm ,getMethod,lowerCase,json2formdata,contentTypeIs,formdata2json} from '../lang'
import qs from 'query-string'


const parseUrl = (url) => {
    const ac = document.createElement('a')
    ac.href = url
    return ac
}

const appendUrl = ({query_string})=>(url, params) => {
    const ac = parseUrl(url)
    ac.search = query_string.stringify(params)
    return ac.href
}

const extractUrl = ({query_string})=>(url) => {
    return query_string.parse(
        query_string.extract(String(url))
    )
}


const extractParams = ({query_string,form_data})=>(params) => {
    const result = {}
    if(isStr(params)){
        return query_string.parse(params)
    } else if(isForm(params)){
        return form_data.parse(params)
    } else if(isObj(params)){
        return params
    } else {
        return result
    }
}



const transformParams = ({query_string,form_data})=>(options,params)=>{

    const is = type=>contentTypeIs(options,type)

    if(is(['application','json'])){
        return JSON.stringify(params)
    } else if(is(['multipart','formdata'])){
        return form_data.formify(params)
    } else if(is(['application','x-www-form-urlencoded'])){
        return query_string.stringify(params)
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

const createSerializer = (context,options)=>(method,...args)=>{
    return method(context.post('serializer',options))(...args)
}

export const params = (params) => ({

    processSerializer(options){
        return {
            query_string:{
                parse:qs.parse,
                stringify:qs.stringify,
                extract:qs.extract
            },
            form_data:{
                parse:formdata2json,
                formify:json2formdata
            }
        }
    },

    processOption(options, previous) {
        options = previous(options)

        const varNames = options.uri ? options.uri.varNames : []

        const serialize = createSerializer(this,options)

        params = serialize(extractParams,params)

        options.url = options.uri ? options.uri.fill(pickParams(params,varNames)) : options.url

        switch (getMethod(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                const url_params = Object.assign(
                    serialize(extractUrl,options.url),
                    filterParams(params,varNames)
                )

                options.url = serialize(appendUrl,options.url,url_params)

                return options


            default:

                options.body = serialize(transformParams,options,
                    Object.assign(
                        serialize(extractParams,options.body),
                        filterParams(params,varNames)
                    )
                )

                return options

        }

    }
})