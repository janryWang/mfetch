'use strict'
import { createPluginService } from 'super-plugin'
import { isFn, isObj, isStr } from './lang'
import { core } from './core'
import { createInterceptor } from './interceptor'

import * as plugins from './plugins'

let EXTENSIONS = []


const getOptions = (url,options)=>{
    if (isStr(url)) {
        return Object.assign(
            { url },
            options
        )
    } else if (isObj(url)) {
        return Object.assign(
            url,
            options
        )
    }

    return {}
}

const createParams = (options) => {
    return Object.keys(options).reduce((buf, key) => {
        if (plugins[key]) {
            return buf.concat(plugins[key](options[key]))
        } else {
            return buf
        }
    }, [])
}

const http = (args,_options) => {
    const pluginService = createPluginService()
    const options = Object.assign({
        url: '/',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    },_options)

    pluginService.extension(core)
    pluginService.extension(args)
    pluginService.extension(EXTENSIONS)
    return pluginService.post('request',
        pluginService.post('afterOption',
            pluginService.post('option',
                pluginService.post('beforeOption', options)
            )
        )
    )
}


export const fetch = (url, _options) => {
    const options = getOptions(url,_options)
    return http(createParams(options),options)
}

export const resource = (url, _options) => {
    if (isFn(url)) {
        return data => Promise.resolve(url(data))
    }

    const options = getOptions(url,_options)

    const params = createParams(options)

    return (data) => {
        return http(params.concat(plugins.params(data)),options)
    }
}

export const extension = (...args) => {
    EXTENSIONS = EXTENSIONS.concat(args)
}


export const interceptor = (specs) => {
    EXTENSIONS = EXTENSIONS.concat(createInterceptor(specs))
}