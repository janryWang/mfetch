/**
 * 
 * params插件，用于设置params
 * 
 */

import {
    isStr,
    isObj,
    isForm,
    getMethod,
    lowerCase,
    json2formdata,
    contentTypeIs,
    formdata2json,
    removeHeader,
    parseUrl,
    appendUrl,
    extractUrl,
    extractParams,
    transformParams,
    filterParams,
    pickParams,
    createSerializer
} from '../lang'
import qs from 'query-string'




export const params = (params) => ({

    processSerializer(options) {
        return {
            query_string: {
                parse: qs.parse,
                stringify: qs.stringify,
                extract: qs.extract
            },
            form_data: {
                parse: formdata2json,
                formify: json2formdata
            }
        }
    },

    processOption(options, previous) {
        options = previous(options)

        const varNames = options.uri ? options.uri.varNames : []

        const serialize = createSerializer(this, options)

        params = serialize(extractParams, options, params)

        options.url = options.uri ? options.uri.fill(pickParams(params, varNames)) : options.url

        delete options.uri

        switch (getMethod(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                const url_params = Object.assign(
                    serialize(extractUrl, options, options.url),
                    filterParams(params, varNames)
                )

                options.url = serialize(appendUrl, options, options.url, url_params)
                return options


            default:

                options.body = serialize(transformParams, options,
                    Object.assign(
                        serialize(extractParams, options, options.body),
                        filterParams(params, varNames)
                    )
                )

                return options

        }

    }
})