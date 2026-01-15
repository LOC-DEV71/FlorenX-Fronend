const API_URL = "http://localhost:3000/api/v1"

export const getCategorys = async (data) => {
    const res = await fetch(
        `${API_URL}/product-categorys`,
        { method: "GET" }
    );

    const result = await res.json();
    return result;
};
