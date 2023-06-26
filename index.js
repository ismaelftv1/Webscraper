const { firefox } = require('playwright');
const fs = require('fs');
const { checkPrime } = require('crypto');

//Lee los links del archivo link.txt y los guarda en un array.
let text = fs.readFileSync("./link.txt", "utf-8");
let links = text.split("\n");

let json = [];

(async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();

    let precio;
    let producto;
    let descuento;


    console.log("iniciando programa");

    for (let i = 0; i < links.length; i++) {
        await page.goto(links[i]); //busca la pagina
        precio = await page.textContent('[class="no-iva-base"]'); // busca el precio sin iva
        producto = await page.textContent('[class="articulo"]'); // busca el nombre del articulo
        checkdescuento= await page.locator("[class=badget-discount--number]").count(); // comprueba si hay o no descuento

        if (checkdescuento > 0) { // comprueba si hay descuento
            descuento = await page.textContent('[class="badget-discount--number"]'); // % de descuento
        }else{
            descuento = '0%'; // si no pone el descuento a 0%
        };

        precio = precio.replace(/,/g,'.'); // remplaza las comas por puntos en los precios

        // guardar las variables tipo objeto
        const productos = {
            name: producto,
            Precio_Sin_IVA: precio,
            descuento: descuento
        };

        //lo añadimos a un array
        json.push(productos);

        console.log(`Elemento ${i+1} Cargado`)

    }
    //cierra el navegador
    await browser.close();
    //crea un archivo con los productos tipo .json
    EscribirJson(json);
})();

function EscribirJson(data) {
    //escribe el .json
    fs.writeFileSync("Productos.json",JSON.stringify(data,null,2), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Archivo Productos.json creado con éxito");
        }
    });
}
