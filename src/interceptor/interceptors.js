import { isFn, process } from '../lang'

export default {

    request(fn) {
        return {
            processAfterOption(options, previous) {
                return process(options, previous, (options) => {
                    return isFn(fn) ? fn(options,this.options) : options
                })
            }
        }
    },

    response(fn) {
        return {
            processResponse(promise, previous) {
                return process(promise, previous, (payload) => {
                    return isFn(fn) ? fn(payload,this.options) : payload
                })
            }
        }
    },

    resolve(fn) {
        return {
            processResponse(promise, previous) {
                return process(promise, previous, (payload) => {
                    return isFn(fn) ? fn(payload,this.options) : payload
                })
            }
        }
    },

    reject(fn) {
        return {
            processResponse(promise, previous) {
                return process(promise, previous, (payload) => payload, (payload) => {
                    return isFn(fn) ? fn(payload,this.options) : payload
                })
            }
        }
    }

}