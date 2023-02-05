import { API } from "./backend"
export const getServices=()=>{
    console.log('api',API)
    return fetch(`${API}/location/services`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            // Authorization:`Bearer ${token}`
        }
    }).then(async response=>{
        let services=await response.json();
        console.log(services);
        return services.map((service)=>{
            return service.service;
        })
    }).catch(err=>{
        console.log('error in getBills',err);
    });
}

export const getLocations=(location)=>{
    return fetch(`${API}/location/service/${location}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            // Authorization:`Bearer ${token}`
        }
    }).then(async response=>{
        let services= await response.json();
        return services.map((service)=>{
            return service.location;
        })
    }).catch(err=>{
        console.log('error in getBills',err);
    });
}

export const submitApplication=(data)=>{
    return fetch(`${API}/appointment/create`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
           
            // Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(data)
    }).then(async response=>{
        return await response.json();
    }).catch(err=>{
        console.log('error in submitting application',err);
    });
}

export const signIn=(username,password)=>{
    console.log('veing consoled')
    return fetch(`${API}/signin`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
           
            // Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({username,password})
    }).then(async response=>{
        const sign= await response.json();
        if(sign.authToken){
            localStorage.setItem("user",username);
            return true
        }
        
        return false;
    }).catch(err=>{
        console.log('error in submitting application',err);
        return false
    });
}

export const signUp=(username,password,email)=>{
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
           
            // Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({username,password,email})
    }).then(async response=>{
        const sign= await response.json();
        if(sign.err){
            return false
        }
        localStorage.setItem("user",username);
        return true;
    }).catch(err=>{
        console.log('error in submitting application',err);
        return false
    });
}