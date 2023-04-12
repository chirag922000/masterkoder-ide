import   { useState, useEffect } from 'react'

function LocalStorage(key,initialValue) {

    const PREFIX="MasterKoder"
    const prefixedKey=PREFIX+key

    const [value,setValue]=useState(()=>{
        const jsonvalue=localStorage.getItem(prefixedKey)
        if(jsonvalue!=null) return JSON.parse(jsonvalue)
        if(typeof initialValue ==="function"){
            return initialValue()
        }else{
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey,JSON.stringify(value))

    },[prefixedKey,value])
  return [value,setValue]
}

export default LocalStorage