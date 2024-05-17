const apiURL = 'https://api.escuelajs.co/api/v1/users/'
export const tokenExpiry = 5 * 60 * 1000

import AlertService from '@/utils/alert.service'

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  // Verificar si el token está presente en el localStorage
  const token = localStorage.getItem('token')
  console.log(token ? 'hay token' : 'no hay token')
  return !!token // Devuelve true si el token existe, de lo contrario, false
}

// Función para crear un usuario
const createUser = async (userData: any) => {
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error('Error al crear usuario')
    }
    AlertService.show('success', 'Usuario creado con exito.')
    return response.json()
  } catch (error) {
    AlertService.show('error', 'Algo fallo, intente nuevamente.')
    throw new Error('Error al crear usuario')
  }
}

// Función para refrescar el token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const refreshResponse = await fetch('https://api.escuelajs.co/api/v1/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ refreshToken })
    })
    if (refreshResponse.ok) {
      const refreshedData = await refreshResponse.json()
      // Actualizar el token y el tiempo de expiración en el localStorage
      localStorage.setItem('token', refreshedData.access_token)
      localStorage.setItem('tokenExpiry', String(Date.now() + refreshedData.expires_in * 1000)) // Multiplicar por 1000 para convertir segundos a milisegundos
    } else {
      throw new Error('Error al refrescar el token')
    }
  } catch (error) {
    console.error('Error al refrescar el token:', error)
  }
}

// Función para eliminar el token
const deleteToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
  console.log('Token eliminado')
}

// Función para iniciar sesión
const logIn = async (userData: any) => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error('Error al iniciar sesión')
    }
    const data = await response.json()
    localStorage.setItem('token', data.access_token)

    return data
  } catch (error) {
    AlertService.show('error', 'Error al iniciar sesion, intente nuevamente.')
    throw new Error('Error al iniciar sesión')
  }
}

const logout = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Error al cerrar sesión')
    }
    localStorage.removeItem('token')
    console.log('Sesión cerrada exitosamente')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

// Función para obtener todos los usuarios
const getAllUsers = async () => {
  try {
    const response = await fetch(apiURL)
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios')
    }
    const data = await response.json()
    console.log('Usuarios:', data)
    return data
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    throw error
  }
}

export { isAuthenticated, createUser, getAllUsers, logIn, logout, deleteToken }
