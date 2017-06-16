


window.fetch = (url,options)=>{
    return Promise.resolve({
        url,
        ...options
    })
}