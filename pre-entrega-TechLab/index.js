const ApiUrl = 'https://fakestoreapi.com/products';


const [metod, recurso, ...restoArgs] = process.argv.slice(2);

try{
    if (metod === 'GET' && recurso === 'products') {
       const respuesta = await fetch(ApiUrl);

       if (!respuesta.ok){
            throw new Error (`Error en el servidor: ${respuesta.status} ${respuesta.statusText}`);
       }
       const productos = await respuesta.json();
       
       console.log("Lista completa de productos:");
       console.log(productos);
    }
    else if (metod === 'GET' && recurso && recurso.startsWith('products/'))
    {
        const [nombreRecurso, productId] = recurso.split('/');
        
        const respuesta = await fetch(`${ApiUrl}/${productId}`);
        const producto = await respuesta.json();

        console.log(`Producto con ID ${productId}:`);
        console.log(producto);
    }
    else if (metod === 'POST' && recurso === 'products')
    {
        const [title, price, category] = restoArgs;

        const respuesta = await fetch (ApiUrl,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                price: Number(price),
                category
            })
        });
        const resultado = await respuesta.json();

        console.log("Producto creado con éxito:");
        console.log(resultado);
    }

    else if (metod === 'DELETE' && recurso && recurso.startsWith('products/'))
    {
        const [nombreRecurso, productId] = recurso.split('/');
        
        const respuesta = await fetch(`${ApiUrl}/${productId}`,
            {
                method: 'DELETE'
            });
        
        const resultado = await respuesta.json();
        
        console.log(`Producto con ID ${productId} eliminado:`);
        console.log(resultado);
    }

    else {
        console.log("Comando no reconocido o incompleto. Revisar la documentación de la API.");
    
    }

} catch (error){

    console.error("Ocurrió un error en la ejecución:", error.message);
}