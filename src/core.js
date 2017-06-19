import { 
    isNumber,
    process,
    getMethod,
    json2formdata,
    formdata2json,
    appendUrl,
    extractUrl,
    extractParams,
    transformParams,
    filterParams,
    pickParams,
    createSerializer
 } from './lang'
 import qs from 'query-string'



export const core = {

    processFetch(options, previous) {
        options = previous(options)
        return window.fetch(options.url, options)
    },

    processRequest(options, previous) {
        return process(options, previous,options => {
            if (isNumber(options.timeout)) {
                const {timeout} = options
                delete options['timeout']
                return this.post('response',
                    new Promise((resolve, reject) => {
                        setTimeout(function () {
                            reject(new Error(`[mfetch Error] request "${options.url}" is timeout!`))
                        }, timeout)
                        this.post('fetch', options).then(resolve, reject)
                    })
                )
            }
            return this.post('response', this.post('fetch', options))
        })

    },

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

    processAfterOption(options, previous) {
        options = previous(options)

        const varNames = options.uri ? options.uri.varNames : []

        const serialize = createSerializer(this, options)

        options.params = serialize(extractParams, options, options.params)

        options.url = options.uri ? options.uri.fill(pickParams(options.params, varNames)) : options.url

        delete options.uri

        switch (getMethod(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                const url_params = Object.assign(
                    serialize(extractUrl, options, options.url),
                    filterParams(options.params, varNames)
                )

                options.url = serialize(appendUrl, options, options.url, url_params)
                return options


            default:

                options.body = serialize(transformParams, options,
                    Object.assign(
                        serialize(extractParams, options, options.body),
                        filterParams(options.params, varNames)
                    )
                )

                return options

        }

    }
}