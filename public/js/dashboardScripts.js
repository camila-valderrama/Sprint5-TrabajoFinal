/*window.addEventListener("load", () => {

    // Obtener solo inputs de tipo button editar

    const inputsButtonEditar = document.querySelectorAll('.button-editar');
    const inputsButtonEliminar = document.querySelectorAll('.button-eliminar');


    inputsButtonEditar.forEach(input => {
        input.addEventListener('click', () => {
            //alert(input.id)
            let pais = {}

            fetch(`/paises/id/${input.value}`)
                .then(response => response.json())
                .then(response => pais = JSON.stringify(response))
                //  .then(response => console.log(pais))
                .then(response => window.location.href = `paises/editar?id=${input.value}&pais=${pais}`)

                .catch(error => {
                    console.error('Error:', error);
                });
        })
    });

    //// boton Eliminar
    inputsButtonEliminar.forEach(input => {

        input.addEventListener('click', () => {
            const respuesta = confirm('¿Está seguro que quiere eliminar el país?')
            if (respuesta) {
                let pais = {}

                fetch(`/paises/eliminar/${input.value}`, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(response => pais = JSON.stringify(response))
                    .then(response => {
                        //alert(`se elimino correctamente a ${response.Nombre}`)
                        location.reload();
                    })

                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        })
    });


})*/

window.addEventListener("load", () => {
    // Obtener botones de editar y eliminar
    const inputsButtonEditar = document.querySelectorAll('.button-editar');
    const inputsButtonEliminar = document.querySelectorAll('.button-eliminar');

    // Botón editar
    inputsButtonEditar.forEach(input => {
        input.addEventListener('click', () => {
            // Inicializar el objeto país
            let pais = {};

            // Hacer la solicitud para obtener los datos del país
            fetch(`/paises/id/${input.value}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos del país');
                    }
                    return response.json();
                })
                .then(response => {
                    pais = JSON.stringify(response);
                    // Redirigir al usuario a la página de edición
                    window.location.href = `paises/editar?id=${input.value}&pais=${encodeURIComponent(pais)}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });

    // Botón eliminar
    inputsButtonEliminar.forEach(input => {
        input.addEventListener('click', () => {
            const respuesta = confirm('¿Está seguro que quiere eliminar el país?');
            if (respuesta) {
                fetch(`/paises/eliminar/${input.value}`, { method: 'DELETE' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al eliminar el país');
                        }
                        return response.json();
                    })
                    .then(response => {
                        console.log(`País eliminado: ${response.Nombre}`);
                        location.reload(); // Recargar la página para reflejar cambios
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    });
});

