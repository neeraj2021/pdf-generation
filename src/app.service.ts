import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPdf(res: Response) {
    const templatePath = path.join(__dirname, '../templates/test.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf-8');

    const browser = await puppeteer.launch();

    const page = await browser.newPage();


    await page.setContent(templateHtml, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ url:'https://cdn.tailwindcss.com' });

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    browser.close();
    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=temp.pdf`);

    return res.send(buffer);
  }
}
