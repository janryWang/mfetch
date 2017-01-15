'use strict'

import {isFn} from '../lang'
import interceptors from './interceptors'

export const createInterceptor = (specs) => {
    return Object.keys(specs || {}).reduce((buf,key)=>{
        if(interceptors[key] && isFn(specs[key])){
            return buf.concat(
                interceptors[key](
                    specs[key].bind(specs)
                )
            )
        }

        return buf
    },[])
}
