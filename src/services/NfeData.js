const puppeteer = require('puppeteer');

exports.NfeData = async function NfeData(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    'https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml?p=' +
      url,
  );

  await page.waitForSelector('#formPrincipal');
  //Pegar todos os dados da nfe
  let teste = await page.evaluate(() => {
    //Extrair dados do estabelecimento
    let gasStation = document
      .querySelector('#page-content-wrapper .container .table tr > th > h4')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
    let address = document
      .querySelector(
        '#page-content-wrapper .container .table tbody tr:nth-child(2)',
      )
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
    let key = document
      .querySelector('#collapseTwo .table tbody tr')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
    let bruteDate = document
      .querySelector('#collapse4')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '')
      .split('Emissão')[1];

    //Formatar Data bruta recebida
    let date = bruteDate.substring(0, bruteDate.lastIndexOf('Valor total do'));
    let formatDate = date.substring(date.length - 19);
    let [day, month, year] = formatDate.split('/');
    let buyDate = `${month}/${day}/${year}`; //data já formatada, pronta para ser armazenada no BD.

    //Extrair dados do produto
    let name = document
      .querySelector('#myTable > tr > td:nth-child(1)')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
    let quantity = document
      .querySelector('#myTable tr > td:nth-child(2)')
      .textContent.split(': ')[1];
    let priceTotal = document
      .querySelector('#myTable tr > td:nth-child(4)')
      .textContent.replace(/[,]+/g, '.')
      .split('R$ ')[1];
    let price = priceTotal / quantity;

    return {
      gasStation,
      address,
      key,
      buyDate,
      name,
      quantity,
      price,
    };
  });
  await browser.close(); // Fechar o navegador quando tudo for concluido
  return teste;
};
