import fetchJSONP from 'fetch-jsonp'
import {lowerCase} from '../lang'

/**
 * 
 * method插件，用于设置method
 * 
 */

export const method = (method)=>({
    processOption(options,previous){
        options = previous(options)
        options.method = lowerCase(method)
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