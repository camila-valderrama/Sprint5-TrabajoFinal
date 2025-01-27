window.addEventListener("load", () => {

    const btnCrearPais = document.getElementById('btnCrearPais');
    const formAgregar = document.getElementById('formAgregar');
  
    btnCrearPais.addEventListener('click', async (event) => {
      event.preventDefault();
  
      if (!formAgregar.checkValidity()) {
        formAgregar.reportValidity();
        return;
      }
  
      const pais = {
        name: {nativeName: { spa: { official: formAgregar.nombrePais.value } } },
        capital: formAgregar.capital.value.split(',').map(p => p.trim()),
        borders: formAgregar.fronteras.value.split(',').map(p => p.trim()),
        area: formAgregar.area.value,
        population: formAgregar.poblacion.value,
        gini: {
          [formAgregar.aniogini.value]: formAgregar.valorgini.value
        },
        timezones: formAgregar.timezones.value.split(',').map(p => p.trim())
      };
  
  
      try {
        const response = await fetch('/paises/agregar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pais)
        });
  
  
      if (response.ok) {
        const paisCreado = await response.json();
  
          alert(`País creado con éxito: ' ${ paisCreado.name.nativeName.spa.official}'`);
          window.location.href = `/paises`
      } else {
          const error = await response.json();
          const mensaje=error.error[0].message;
          //console.log(mensaje)
          alert('Error al crear el pais: ' + error.message + "\n" + mensaje);
      }
  
      } catch (error) {
  
        alert('Error al crear el país: ' + JSON.stringify(error));
      }
    });
  });