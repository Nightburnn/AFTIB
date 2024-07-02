export function getApproved(bool,array){
    if(Array.isArray(array)){
          return bool? array.filter(x=> x.approved ): array.filter(x=> !x.approved)
    }
    return []
  }