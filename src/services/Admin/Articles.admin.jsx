// const API_URL = "http://localhost:3000/api/v1/articles"
const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/articles"
// const API_URL = `${import.meta.env.VITE_API_URL}/articles`;


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