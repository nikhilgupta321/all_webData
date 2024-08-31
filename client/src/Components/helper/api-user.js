const url = 'http://localhost:8080/user';

const getUser = async (credentials) => {
  try {
    let response = await fetch(`${url}/api/users/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.token,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const userById = async (params, signal) => {
  try {
    let response = await fetch(`${url}/api/users/${params.id}`, {
      method: 'GET',
      signal: signal,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

const updateUser = async (data, credentials, params) => {
  try {
    let response = await fetch(`${url}/api/users/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.token,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

export { getUser, updateUser, userById };


// const getUser = async (credentials) => {
//   try {
//     let response = await fetch("/api/users/", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.token,
//       },
//     });
//     return await response.json();
//   } catch (err) {
//     console.error(err);
//     return { error: err };
//   }
// };

// const userById = async (params, signal) => {
//   try {
//     let response = await fetch(`/api/users/${params.id}`, {
//       method: "GET",
//       signal: signal,
//     });
//     const result = await response.json();
//     return result
//   } catch (err) {
//     console.error(err);
//     return { error: err }
//   }
// }

// const updateUser = async (data, credentials, params) => {
//   try {
//     let response = await fetch(`/api/users/${params.id}`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.token,
//       },
//     });
//     console.error(response);
//     return await response.json();
//   } catch (err) {
//     console.error(err);
//     return { error: err };
//   }
// };

// export { getUser, updateUser, userById };



// // api-user.js
// import axios from 'axios';

// // Update user information
// export const updateUser = async (data, params, headers) => {
//   try {
//     const response = await axios.put(`/api/users/${params.id}`, data, { headers });
//     return response.data;
//   } catch (error) {
//     return { error: true, msg: error.message };
//   }
// };

// // Get user by ID
// export const userById = async (params, signal) => {
//   try {
//     const response = await axios.get(`/api/users/${params.id}`, { signal });
//     return response.data;
//   } catch (error) {
//     return { error: true, msg: error.message };
//   }
// };
