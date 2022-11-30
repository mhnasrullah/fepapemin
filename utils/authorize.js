import { useRouter } from "next/router"
import { useEffect,useState } from "react"

const authorize = () => {
    const {push} = useRouter()

    useEffect(()=>{
        if( localStorage.getItem("user") == null){
            push("/login")
        }
    })
    
}

export default authorize