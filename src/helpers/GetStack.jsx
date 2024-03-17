import { Global } from "./Global"

export const GetStack = async (userId, nextPage = 1) => {
    const request = await fetch(Global.url + "stack/listuser/" + userId +'/'+ nextPage , {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await request.json();
   
    
    return data; // Devuelve solo los stacks de la página solicitada
  };