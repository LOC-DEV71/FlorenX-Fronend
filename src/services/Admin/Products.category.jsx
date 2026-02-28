const API_URL = "http://localhost:3000/api/v1/product-categorys"
// const API_URL = `${import.meta.env.VITE_API_URL}/product-categorys`;


export const getCategorys = async () => {
    const res = await fetch(
        `${API_URL}`,
        { 
            method: "GET",
            credentials: "include"
         },
    )

    const result = await res.json();
    return result;
};

export const getCategory = async (data) => {
    const params = new URLSearchParams();
    if(data.search) params.append("search", data.search)
    if(data.sort) params.append("sort", data.sort)
    const res = await fetch(
        `${API_URL}?${params.toString()}`,
        { 
            method: "GET",
            credentials: "include"
         }
    );

    const result = await res.json();
    return result;
};

export const multiCategory = async data => {
    const res = await fetch(`${API_URL}/change-multi`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return {ok: res.ok, result};
}


export const createCategory = async (data) => {
    const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return {ok: res.ok, result};    
}
