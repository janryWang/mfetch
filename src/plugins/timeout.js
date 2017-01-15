
/**
 * 
 * timeout插件，用于设置timeout
 * 
 */

export const timeout = (timeout)=>({
    processOption(options,previous){
        options = previous(options)
        options.timeout = timeout
        return options
    }
})