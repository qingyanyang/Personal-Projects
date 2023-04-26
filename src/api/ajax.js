import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){
    
    return new Promise((resolve,reject)=>{
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response=>{
            resolve(response)
        }).catch(error=>{
            // reject(error)
            message.error('something wrong:' + error.message)
        })
    })
    
}
//ajax('/login',{username:'Tom',password:'12345'},"POST").then()
