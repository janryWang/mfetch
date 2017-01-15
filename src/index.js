'use strict'
import createPluginService from 'super-plugin'
import { isFn, isObj, isStr } from './lang'
import { core } from './core'
import { createInterceptor } from './interceptor'

import * as plugins from './plugins'

let EXTENSIONS = []


const createParams = (url, options) => {

    if(isStr(url)){
        options = Object.assign(
            { url },
            options
        ) 
    } else if(isObj(url)){
        options = Object.assign(
            url,
            options
        ) 
    }

    return Object.keys(options).reduce((buf, key) => {
        if (plugins[key]) {
            return buf.concat(plugins[key](options[key]))
        } else {
            console.warn(`[serve-fetch] No ${key} plugins for serve-fetch!`)
            return buf
        }
    }, [])
}

const http = (args) => {
    const pluginService = createPluginService()
    const options = {
        url: '/',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }

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


export const fetch = (url, options) => {
    return http(createParams(url, options))
}

export const resource = (url, options) => {
    if (isFn(url)) {
        return data => Promise.resolve(url(data))
    }
    const params = createParams(url, options)

    return (data) => {
        return http(params.concat(plugins.params(data)))
    }
}

export const extension = (...args) => {
    EXTENSIONS = EXTENSIONS.concat(args)
}


export const interceptor = (specs) => {
    EXTENSIONS = EXTENSIONS.concat(createInterceptor(specs))
}