export const required = value =>{ 
    if(value){ 
        return undefined
    } 
    return 'error'
} 

export const maxLength = length =>{ 
    return (value) =>{ 
        if(value && value.length > length    ) { 
            return 'max'
        } 
        return undefined
    }
}