const puppeteer = require('puppeteer');
const empresas = "A46103834 A28003119 A28015865 A80298839 A15075062 A15075062 A28049161 A28425270 A82018474 A86171964 A95758389 A36602837 A08001851 A47000518 A95758371 A82489451 A85850394 A79380465 A82009812 B5062918 B62661558 B86670643 B65843864 B64274137 B98399892 B06617815 B01507243 A46103834 A28047223 A81948077 A28017895 B46066361 A60195278 A28238988 B88351036 B18610741"
const listEmpresas = empresas.split(' ')



const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://www.infoempresas.pro/`);
  await page.waitForTimeout(100)

  const element = await page.waitForSelector('#noticeCookiesBtn')
  await element.click()

  const scrapingEmpresa = async (empresa, jsonEmpresas, jsonNoEncontradas) => {


    const buscador = await page.waitForSelector('#busqueda')
    await buscador.click()
    await page.keyboard.type(empresa)

    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    let hayDatos = (await page.evaluate(() => { return document.querySelector('.div50.bloque .mitad:nth-child(3) .trozosperfil a') })) != null
    if (!hayDatos) {

      jsonNoEncontradas.push(await empresa)
      
      return
    }
    try {
      const persona = await page.evaluate(
        (empresa) => {
          let empr = {
            Name: document.querySelector('.div50.bloque > .titulo').textContent,
          }
          let child = 0
          const nameAtributo = (child, mitad) => {
            return document.querySelector(`.div50.bloque > .mitad:nth-child(${mitad}) > div:nth-child(${child})  > h3`).textContent.replace(' ', '').replace(':', '').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          }
          const sanitizarDatos = (datos) => {

            return datos.replace('\n', '').trim()

          }
          do {

            if (document.querySelector(`.div50.bloque > .mitad:nth-child(2) > div:nth-child(${child})  > h3`)) {
              empr[nameAtributo(child, 2)] = sanitizarDatos(document.querySelector(`.div50.bloque > .mitad:nth-child(2) > div:nth-child(${child})  > .trozosperfil`).textContent)

            }
            child++
          } while (child != 15);

          child = 0
          do {

            if (document.querySelector(`.div50.bloque > .mitad:nth-child(3) > div:nth-child(${child})  > h3`)) {
              empr[nameAtributo(child, 3)] = sanitizarDatos(document.querySelector(`.div50.bloque > .mitad:nth-child(3) > div:nth-child(${child})  > .trozosperfil`).textContent)

            }
            child++
          } while (child != 15);

          empr.Name = empr.Name.replace('Información general de ', '')

          return empr
        }, empresa
      )

      jsonEmpresas.push(await persona)

    } catch (error) {
      console.log(error)

    }







  }



  let d = new Date()

  let jsonEmpresas = []
  let jsonNoEncontradas = [];
  for (let index = 0; index < listEmpresas.length; index++) {
    const element = listEmpresas[index];


    try {
      await scrapingEmpresa(element, jsonEmpresas, jsonNoEncontradas)

    } catch (error) {
      console.log(error)
    }




  }

  console.log({ EmpresasEncontradas: await jsonEmpresas, EmpresasNoEncontradas: await jsonNoEncontradas, CifEmpresas: listEmpresas, lengthEmpresasEncontradas: await jsonEmpresas.length, lengthEmpresasNoEncontradas: await jsonNoEncontradas.length, lenghtlistEmpresas: listEmpresas.length })



  console.log('ha empezado a la hora' + d.getHours() + ':' + d.getMinutes())
  d = new Date()

  console.log('ha terminado a la hora' + d.getHours() + ':' + d.getMinutes())



  await browser.close()



}

main()