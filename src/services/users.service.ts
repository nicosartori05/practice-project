const apiURL = 'https://api.escuelajs.co/api/v1/users/'

/**
 * array de objetos con todos los usuarios registrados
 * @returns
 */
export const getAllUsers = async () => {
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
