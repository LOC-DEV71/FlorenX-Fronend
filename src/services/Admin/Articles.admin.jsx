// const API_URL = "http://localhost:3000/api/v1/articles"
const API_URL = `${import.meta.env.VITE_API_URL}/articles`;

export const getListArticle = async (data) => {
    const params = new URLSearchParams();
    if (data.page) params.append("page", data.page);
    if (data.limit) params.append("limit", data.limit);
    if (data.sort) params.append("sort", data.sort);
    if (data.search) params.append("search", data.search);
    const res = await fetch(`${API_URL}/get-list?${params.toString()}`, {
        method: "GET",
        credentials: "include"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}

export const createArticle = async (data) => {
    const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        credentials: "include",
        body: data
    });
    const result = await res.json();
    return {ok: res.ok, result}
} 
export const getDetailArticles = async (slug) => {
    const res = await fetch(`${API_URL}/detail?slug=${slug}`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}

export const updateAticles = async (data) => {
    const res = await fetch(`${API_URL}/update?slug=${data.slug}`, {
        method: "POST",
        credentials: "include",
        body: data.formData
    });
    const result = await res.json();
    return {ok: res.ok, result}
}

export const changeMulti = async (data) => {
    const res = await fetch(`${API_URL}/change-multi`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
    const result = await res.json();
    return {ok: res.ok, result}
}

export const deleteArticle = async (id) => {
    const res = await fetch(`${API_URL}/delete?id=${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}