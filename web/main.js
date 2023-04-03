// lee el archivo productos.json
fetch('../Productos.json')
    .then((response) => response.json())
    .then((json) => RellenarTabla(json));


function RellenarTabla(datos = []) {
    let igic = 0;
    let total = 0;
    let texto = document.getElementById('tabla');

    for (let i = 0; i < datos.length; i++) {

        //variables de precio.
        igic = parseInt(datos[i].Precio_Sin_IVA) * 1.07;
        total += igic;

        //rellena la tabla con los datos de productos.json
        texto.innerHTML += `<tr><td>${datos[i].name}</td><td class="precio">${datos[i].Precio_Sin_IVA}€</td><td class="precio">${igic.toFixed(2)}€</td></tr>`;
    }
    texto.innerHTML += `<tr><th colspan="2" class="total">Total:</th><td class ="precio">${total}€</td></tr>`;
}
