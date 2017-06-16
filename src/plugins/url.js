import ut from 'uri-templates'
/**
 * 
 * url插件，用于设置Url
 * 
 */

export const url = (url) => ({
    processOption(options, previous) {
        options = previous(options)
        options.url = url
        if (options.uriTemplate) {
            options.uri = new ut(String(url))
            delete options.uriTemplate
        }
        return options
    }
})