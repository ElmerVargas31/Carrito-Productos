/*
    Estudiante: Elmer Vargas Salazar
    Curso: Desarrollo de Aplicaciones Web Dinámicas con Javascript 
*/

/*CLASES*/
class Producto{
    //Método Constructor
    constructor(nombre,marca,precio,cantidad,fecha){
        /*Estas propiedades se están asignando en base 
        a las mismas que se están pasando del constructor*/
        this.nombre=nombre;
        this.marca=marca;
        this.precio=precio;
        this.cantidad=cantidad;
        this.fecha=fecha;
    }
}//Fin class Producto

class Interfaz{
    //Métodos Adicionales
    agregarProd(producto){
        const listaProducto = document.getElementById("lista_prod");
        const elemento = document.createElement("div");
        elemento.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <strong>Nombre</strong>: ${producto.nombre} -
                    <strong>Marca</strong>: ${producto.marca} -
                    <strong>Precio</strong>: ${producto.precio} -
                    <strong>Cantidad</strong>: ${producto.cantidad} -
                    <strong>Año</strong>: ${producto.fecha} 
                    <a href="#" class="btn btn-danger ml-2" name="eliminar">Eliminar</a> 
                </div>
            </div>
        `; 
        /* comilla inversa `` = Permite escribir información string en múltiples líneas */

        listaProducto.appendChild(elemento); //Agregar un elemento hijo a listaProducto
    }

    resetForm(){
        document.getElementById("form_prod").reset(); 
        /*Borrar datos escritos en 
        formulario cuando estos se guardan*/
    }

    elimProd(elemento){
        if(elemento.name === "eliminar"){
           elemento.parentElement.parentElement.parentElement.remove();
           this.mostrarMsj("¡Producto Eliminado Exitosamente!","info")
        }
    }

    mostrarMsj(mensaje, claseCss){
        const div = document.createElement("div");
        div.className = `alert alert-${claseCss} mt-3`;
        div.appendChild(document.createTextNode(mensaje));
        //Mostrando en el DOM
       const contenedor = document.querySelector(`.container`);
       const app = document.querySelector(`#App`);
       contenedor.insertBefore(div, app); // el div se está insertando dentro de contenedor antes de app

       setTimeout(function (){
            document.querySelector(`.alert`).remove(); //eliminar todas las clases Bootstrap .alert
       }, 3000);

       /* setTimeout(función(){contenido función}, por cuanto tiempo se espera que ejecuta la función )*/
    }
}//Fin class Interfaz

//EVENTOS DOM

//Comportamiento del formulario cuando se vincula botón "Guardar"
document.getElementById("form_prod").addEventListener("submit", function(e) {
        const nombre = document.getElementById("nombre").value;
        const marca = document.getElementById("marca").value;
        const precio = document.getElementById("precio").value;
        const cantidad = document.getElementById("cantidad").value;
        const fecha = document.getElementById("fecha").value;

        const producto= new Producto(nombre,marca,precio,cantidad,fecha);

        const interfaz= new Interfaz();

        if(nombre == "" || marca == "" || precio == "" || cantidad == "" || fecha == ""){
           return interfaz.mostrarMsj("¡Por favor, debe llenar los campos!","danger");
        }
        interfaz.agregarProd(producto);
        interfaz.resetForm();
        interfaz.mostrarMsj("¡Producto Agregado Exitosamente!","success")

        e.preventDefault();
})

//Comportamiento al vincular botón "Eliminar" en la interfaz información de productos
document.getElementById("lista_prod").addEventListener("click", function(e) {
    const interfaz= new Interfaz()
    interfaz.elimProd(e.target)
})

/*
    function(e) = Representa un evento del ratón 
*/