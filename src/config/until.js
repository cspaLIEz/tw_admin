export function pramsChange(arr,type=";",objKey){
    let str=""
    arr.map((item,index)=>{
        if(!item){
            
            return;
        }
        if(objKey){
            if(index==arr.length-1){
                str+=item[objKey]
            }else{
                str += item[objKey] + type;
            }
        }else{
            if(index==arr.length-1){
                str+=item
            }else{
                str += item + type;
            }
        }
        
    })
    return str;
}