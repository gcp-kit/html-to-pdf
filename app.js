const fs = require('fs');
const express = require('express');
const puppeteer = require('puppeteer');
const tmp = require('tmp');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.text({ type: '*/*' }));

app.post('/create_ledger', (req, res) => {
  // Content-Type validation
  if (!req.is('text/html')) {
    res.status(400);
    return;
  }

  const html = req.body;

  const tmpObj = tmp.fileSync({ postfix: '.html' });
  fs.writeFileSync(tmpObj.fd, html, () => {
    res.status(500);
  });

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file://${tmpObj.name}`, {
      waitUntil: 'networkidle2',
    });
    await page.emulateMediaType('screen');

    // TODO: クエリで切り替えられるようにする
    const buf = await page.pdf({ format: 'a4' });

    res.set('Content-Type', 'application/pdf');
    res.send(buf);

    await browser.close();
    tmpObj.removeCallback();
  })();
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
