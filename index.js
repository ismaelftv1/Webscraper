const { firefox } = require('playwright');
const fs = require('fs');

//Lee los links del archivo link.txt y los guarda en un array.
let text = fs.readFileSync("./link.txt", "utf-8");
let links = text.split("\n");


(async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    for (let i = 0; i < links.length; i++) {
        await page.goto(links[i]);
        //await page.screenshot({path: 'gafrica.png'});
        const precio = await page.textContent('[class="no-iva-base"]');
        const producto = await page.textContent('[class="articulo"]');
        console.log(`Precio Sin IVA: ${precio}€ , Producto: ${producto}`);

    }
    await browser.close();
})();
