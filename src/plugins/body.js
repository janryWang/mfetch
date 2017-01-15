import { getMethod} from '../lang'

/**
 * 
 * body插件，用于设置body
 * 
 */

export const body = (body)=>({
    processOption(options,previous){
        options = previous(options)
        switch(getMethod(options)){
            case 'get':
            case 'head':
                return options
            default:
                options.body = body
                return options
        }
    }
})