import { isFn, process } from '../lang'

export default {

    request(fn) {
        return {
            processAfterOption(options, previous) {
                return process(options, previous, (options) => {
                    return isFn(fn) ? fn(options) : options
                })
            }
        }
    },

    response(fn) {
        return {
            processResponse(promise, previous) {
                return process(promise, previous, (payload) => {
                    return isFn(fn) ? fn(payload) : payload
                })
            }
        }
    },

    resolve(fn) {
        return {
            processResponse(promise, previous) {
                return process(promise, previous, (payload) => {
                    return isFn(fn) ? fn(payload) : payload
                })
            }
        }
    },

    reject(fn) {
        return {
            processResponse(promise, previous) {
                return process(promise, previous, (payload) => payload, (payload) => {
                    return isFn(fn) ? fn(payload) : payload
                })
            }
        }
    }

}