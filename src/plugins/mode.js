
/**
 * 
 * timeout插件，用于设置mode
 * 
 */

export const mode = (mode)=>({
    processOption(options,previous){
        options = previous(options)
        options.mode = mode
        return options
    }
})