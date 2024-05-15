const apiUrl = 'https://api.escuelajs.co/api/v1/'

export const getProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}products`)
    if (!response.ok) {
      throw new Error('Error al obtener los productos')
    }
    const data = await response.json()
    // console.log('Productos:', data)
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
    console.log('Producto', data)
    return data
  } catch (error) {
    console.error('Error al obtener el producto:', error)
    throw error
  }
}
