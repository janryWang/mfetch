import {mergeHeaders} from '../lang'

/**
 * 
 * headers插件，用于设置headers
 * 
 */

export const headers = (headers)=>({
    processOption(options,previous){
        options = previous(options)

        options.headers = mergeHeaders(options.headers,headers)

        return options
    }
})