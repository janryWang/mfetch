'use strict'
import { createPluginService } from 'super-plugin'
import { core } from './core'
import { createInterceptor } from './interceptor'
import * as plugins from './plugins'
import * as utils from './lang'

const { isFn, isObj, isStr, createSerializer, extractParams } = utils

let EXTENSIONS = []

const getOptions = (url, options) => {
  if (isStr(url) || url instanceof URL) {
    return Object.assign({ url }, options)
  } else if (isObj(url)) {
    return Object.assign(url, options)
  }

  return {}
}

const createParams = options => {
  return Object.keys(options).reduce((buf, key) => {
    if (plugins[key]) {
      return buf.concat(plugins[key](options[key]))
    } else {
      return buf
    }
  }, [])
}

const mergeParams = data => {
  return {
    processBeforeOption(options) {
      const serialize = createSerializer(this, options)
      options.params = Object.assign(
        serialize(extractParams, options, options.params),
        serialize(extractParams, options, data)
      )
      return options
    }
  }
}

const http = (args, options) => {
  const pluginService = createPluginService(
    class Context {
      options() {
        return options
      }
    }
  )

  if (options.data) {
    options.params = options.data
  }

  pluginService.extension(core)
  pluginService.extension(args)
  pluginService.extension(EXTENSIONS)
  return pluginService.post(
    'request',
    pluginService.post(
      'afterOption',
      pluginService.post('option', pluginService.post('beforeOption', options))
    )
  )
}

let monkey_patch_fetch

export const fetch = (url, _options) => {
  const options = getOptions(
    url,
    Object.assign(
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      },
      _options
    )
  )
  if (monkey_patch_fetch) return monkey_patch_fetch(options)
  return http(createParams(options), options)
}

export const patch = fetch => {
  monkey_patch_fetch = fetch
}

export const resource = (url, _options) => {
  if (isFn(url)) {
    return data => Promise.resolve(url(data))
  }

  const options = getOptions(url, _options)

  const params = createParams(options)

  return data => {
    return http([mergeParams(data)].concat(params), options)
  }
}

export const extension = (...args) => {
  EXTENSIONS = EXTENSIONS.concat(args)
}

export const interceptor = specs => {
  EXTENSIONS = EXTENSIONS.concat(createInterceptor(specs))
}
Object.assign(module.exports, utils)
