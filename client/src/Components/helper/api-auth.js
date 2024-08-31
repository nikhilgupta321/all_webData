const login = async (credentials) => {
  try {
    let response = await fetch('http://localhost:8080/auth/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })
    return await response.json()
  } catch (err) {
    return { error: err }
  }
}

const verifyToken = async (credentials) => {
  try {
    let response = await fetch('http://localhost:8080/auth/verify-token/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      },
    })
    return await response.json()
  } catch (err) {

    return { error: err }
  }
}

export {
  verifyToken,
  login,
}