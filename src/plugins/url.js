import ut from 'uri-templates'
/**
 * 
 * url插件，用于设置Url
 * 
 */

export const url = (url)=>({
    processOption(options,previous){
        options = previous(options)
        options.url = url
        options.uri = new ut(String(url))
        return options
    }
})