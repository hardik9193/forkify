import { TIMEOUT_SEC } from "./config";
import { async } from "regenerator-runtime";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)

        }) : fetch(url);


        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;
    }
}

// export const getJSON = async function (url) {
//     try {
//         const fetchProm = fetch(url);
//         const res = await Promise.race([fetchProm, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }

// export const sendJSON = async function (url, uploadData) {
//     try {
//         const fetchProm = fetch(url, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(uploadData)

//         });
//         const res = await Promise.race([fetchProm, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }