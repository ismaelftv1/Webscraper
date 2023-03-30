fetch('../Productos.json')
    .then((response) => response.json())
    .then((json) => RellenarTabla(json));


    function RellenarTabla(datos=[]) {
        for (let i = 0; i < datos.length; i++) {
            let texto = document.getElementById('tabla');
            
            texto.innerHTML += `<tr><td>${datos[i].name}</td><td>${datos[i].Precio_Sin_IVA}€</td></tr>`;
        }
    };