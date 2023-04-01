import url from "../utils/constants";

// creating custom fetch function to perform all actions with single function
const customFetch=async(url,{body,...customConfig})=>{
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
      };
    const config={
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers
        }
    }
    if(body)
    {
        config.body=JSON.stringify(body);
    }
    try{
    // getting response from API service with configurations provided
        const response=await fetch(url,config);
        if(response.ok)
        {
      // if successfull, return with data else return with success as false
            const data=await response.json();
            return {
                data: data,
                success: true,
              };
        }
        throw new Error(response);
    }
    catch(error){
        return {
            message: error,
            success: false,
          };
    }
}

// fetching todo list items from API service
export const getList = () => {
    return customFetch(url, {
      method: 'GET',
    });
  };
// adding a new todo list item in API service
  export const postList = (title) => {
    return customFetch(url, {
      method: 'POST',
      body :{
        title,
        completed:false,
        userId: 1
      }
    });
  };
// deleting todo list item from API service
  export const deleteList = (id) => {
    return customFetch(`${url}/${id}`, {
        method: 'DELETE',
    });
  };
// updating todo list item in API service
  export const updateList = (id,title,userId,completed) => {
    return customFetch(`${url}/${id}`, {
        method: 'PUT',
        body: {
            id,
            title,
            completed,
            userId
        },
    });
  };