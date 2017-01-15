/**
 *
 * credentials插件，用于设置credentials
 *
 */

export const credentials = (credentials)=>({
    processOption(options,previous){
        options = previous(options)
        options.credentials = credentials || 'include'
        return options
    }
})
