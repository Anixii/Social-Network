export const updateObjectInArr = (items, userId, prop, newObj) =>{ 
    return items.map( (item)=> {  
        if(item[prop] === userId){  
            return{...item, ...newObj}
        } 
        return item;
    })
}