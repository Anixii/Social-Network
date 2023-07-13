export const updateObjectInArr = (items:any, userId:any, prop:any, newObj:any) =>{ 
    return items.map( (item:any)=> {  
        if(item[prop] === userId){  
            return{...item, ...newObj}
        } 
        return item;
    })
}