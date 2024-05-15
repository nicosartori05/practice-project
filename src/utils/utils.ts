export const formatText = (str: string, longitud: number) => {
    // Verifica si la longitud del string es mayor que la longitud especificada
    if (str.length > longitud) {
        // Recorta el string a la longitud especificada y agrega puntos suspensivos
        return str.slice(0, longitud) + '...';
    }
    // Devuelve el string original si no es necesario recortarlo
    return str;
}