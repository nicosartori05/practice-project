const apiURL = 'https://api.escuelajs.co/api/v1/users/'
export const tokenExpiry = 5 * 60 * 1000

import type { userData } from '@/interfaces/userData.interface'
import AlertService from '@/utils/alert.service'

/**
 * devuelve true o false si encuentra un token en localstorage
 * @returns boolean
 */
const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  console.log(token ? 'hay token' : 'no hay token')
  return !!token
}

/**
 *se le envia un objeto y retorna crea un usuario
 * @param userData
 * @returns
 */
const createUser = async (userData: userData) => {
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

/**
 * refresca el token de usuario que se encuenta en localstorage
 */
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
      localStorage.setItem('token', refreshedData.access_token)
      localStorage.setItem('tokenExpiry', String(Date.now() + refreshedData.expires_in * 1000))
      throw new Error('Error al refrescar el token')
    }
  } catch (error) {
    console.error('Error al refrescar el token:', error)
  }
}

/**
 * elimina el token y el tiempo de expiracion del mismo
 */
const deleteToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
}

/**
 * se envia un objeto con email y password y te devuelve un access_token
 * @param userData
 * @returns
 */
const logIn = async (userData: userData) => {
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

/**
 * elimina el token de usuario de localstorage y recarga la pagina, por ende te envia al login
 */
const logout = async () => {
  localStorage.removeItem('token')
  location.reload()
}

export { isAuthenticated, createUser, logIn, logout, deleteToken }
