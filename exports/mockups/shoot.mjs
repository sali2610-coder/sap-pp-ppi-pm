import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url='file://'+process.cwd()+'/exports/mockups/catalog-mockup.html';
const br=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--force-device-scale-factor=2']});
const shots=[['desktop',1440,1180],['tablet',768,1500],['mobile',390,1700]];
for(const [name,w,h] of shots){
  const pg=await br.newPage();
  await pg.setViewport({width:w,height:h,deviceScaleFactor:2});
  await pg.goto(url,{waitUntil:'networkidle0'});
  await pg.screenshot({path:`exports/mockups/catalog-${name}.png`,fullPage:true});
  await pg.close();
  console.log('shot',name,w+'x'+h);
}
await br.close();
