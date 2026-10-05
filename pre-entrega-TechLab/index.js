//Mensaje inicial para la consola
console.log("Iniciando sistema de gestión de productos");

// Capturamos los argumentos de la terminal y definimos la URL base de la API
const args = process.argv.slice(2);
const ApiUrl = "https://fakestoreapi.com";

// Función para obtener productos (todos o por ID según el parámetro recibido)
async function obtenerProductos(url){
    try {
        const response = await fetch(`${ApiUrl}/${url}`);
        if (!response.ok) throw new Error(`Estado de respuesta: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error ("Error en la petición GET:", error.message);

    }
}

// Función para eliminar un producto enviado el método DELETE
async function eliminarProducto(producto){
    try {
        const response = await fetch(`${ApiUrl}/${producto}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error(`Estado de respuesta: ${response.status}`);
        return await response.json();

    } catch (error) {
        console.error ("Error en la petición DELETE:", error.message);

    }
}

// Función para crear un nuevo producto enviando los datos por POST en formato JSON
async function crearProducto(producto) {
    try {
        const response = await fetch (`${ApiUrl}/products`, {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify (producto) 
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Producto registrado con éxito:");
            console.log(data);
            console.log("ID asignado:", data.id);
        }
    } catch (error) {
        console.error("Error en la petición POST", error.message);
    
    }
}

// Estructura de control para evaluar el comando ingresado en la terminal (args[0])
switch (args[0]) {
    case "GET":
        console.log (`Acción detectada: [GET]`);
        if (args[1] && args[1].startsWith("products")) {
            const productos = await obtenerProductos(args[1]);
            console.log(productos);

        }else {
            console.log("Comando incorrecto. Ejemplo: npm run start GET products o GET products/15");

        }break;

        case "POST":
            console.log(`Acción detectada: [POST]`);
            if (args[1] && args[2] && args[3] && args[4] && args[1] === "products") {
               await crearProducto({
                title: args[2],
                price: Number(args[3]),
                category: args[4]
               });
            }else {
                console.log ("comando incompleto. Ejemplo: npm run start POST products T-Shirt-Rex 300 remeras");
            }break;
        case "DELETE":
            console.log(`Acción detectada: [DELETE]`);
            if (args[1] && args[1].startsWith("products/") && args[1].length > 9) {
               const response = await eliminarProducto (args[1]);
               console.log("Resultado de eliminación:", response); 
            }else {
                console.log("comando incompleto. Ejemplo : npm run start DELETE products/7");
            }break;
        default:
            console.log("Comando no reconocido. Utilice GET, POST o DELETE");
}
