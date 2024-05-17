const apiUrl = 'https://api.escuelajs.co/api/v1/'
const apiUrlFake = 'https://fakestoreapi.com/'
export const getProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}products`)
    if (!response.ok) {
      throw new Error('Error al obtener los productos')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    throw error
  }
}

export const getProduct = async (idProduct: number) => {
  try {
    const res = await fetch(`${apiUrl}products/${idProduct}`)
    if (!res.ok) {
      throw new Error('Error al obtener el producto')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    throw error
  }
}
