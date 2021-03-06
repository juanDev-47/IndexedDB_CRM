(function(){

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });


    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
        }



    }

    function validarCliente(e) {
        e.preventDefault();

        // leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === '' ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // crear un objeto con la informacion 

        const cliente = {
            nombre, email, telefono, empresa, id: Date.now()
        }

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente) {  
        // const { nombre, email, telefono, empresa, id } = cliente; // destructuring

        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error, correo debe ser unico', 'error');
        }

        transaction.oncomplete = function() {
            imprimirAlerta('El cliente se ha creado correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000)
        }

    }

    

})();