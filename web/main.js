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
        precio = parseFloat(datos[i].Precio_Sin_IVA);
        igic = precio * 1.07;
        total += igic;

        //rellena la tabla con los datos de productos.json
        texto.innerHTML += `<tr><td>${datos[i].name}</td><td class="precio">${precio}€</td><td class="precio">${igic.toFixed(2)}€</td></tr>`;
    }
    texto.innerHTML += `<tr><th colspan="2" class="total">Total:</th><td class ="precio">${total.toFixed(2)}€</td></tr>`;
}
