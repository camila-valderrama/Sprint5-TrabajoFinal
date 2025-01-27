
window.addEventListener("load", () => {

    const btnEditarPais = document.getElementById('btnEditarPais')
    const formEditar = document.getElementById('formEditar')

    btnEditarPais.addEventListener('click', async (event) => {
        event.preventDefault()

        if (!formEditar.checkValidity()) { //habilita la validación del formulario
            formEditar.reportValidity();
            return;
        }


    const pais = {
        name: {nativeName: { spa: { official: formEditar.nombrePais.value } } },
        capital: formEditar.capital.value.split(',').map(p => p.trim()),
        borders: formEditar.fronteras.value.split(',').map(p => p.trim()),
        area: formEditar.area.value,
        population: formEditar.poblacion.value,
        gini: {
          [formEditar.aniogini.value]: formEditar.valorgini.value
        },
        timezones: formEditar.timezones.value.split(',').map(p => p.trim())
      };

        try {

            const response = await fetch(`/paises/actualizar/${formEditar.id.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pais),
            });

            if (response.ok) {
                const paisActualizado = await response.json();

                window.location.href = `/paises`  //redirige al dashboard
            } else {
                const error = await response.json();
                alert('Error al editar el pais: ' + error.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }




    });

})
