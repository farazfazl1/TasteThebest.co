
const timeout = function (s) {
    return new Promise(function (_, reject) {
    setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};



export const getJson = async function (link) {
    try {
        const res = await Promise.race([fetch(link), timeout(11)]);
        const data = await res.json();


        if(!res.ok) {
        throw new Error(`${data.message} (${res.status})`)
        }
        return data; 

    } catch (error) {
        throw error;
    }
}