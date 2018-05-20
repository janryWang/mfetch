import fetchJSONP from 'fetch-jsonp'
import {lowerCase,removeHeader} from '../lang'

/**
 * 
 * method插件，用于设置method
 * 
 */

export const method = (method)=>({
    processOption(options,previous){
        options = previous(options)
        options.method = lowerCase(method)
        if(options.method.indexOf("get") > -1 && options.headers){
            options.headers = removeHeader(options.headers,'content-type')
        }
        return options
    },

    processFetch(options,previous){
        if(options.method == 'jsonp'){
            return fetchJSONP(options.url,options)
        } else {
            return previous(options)
        }
    }
})