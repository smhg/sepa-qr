#!/usr/bin/env node
const qrcode = require('qrcode-terminal');
const clipboardy = require('clipboardy');

const text = clipboardy.readSync();

const remittanceParser = /[\+\*]{3}[0-9\/\s]+[\+\*]{3}/;
const ibanParser = /[A-Z]{2}[0-9 ]{2,}/;
const amountParser = /(EUR|euro|€)?\s*(\s?\.?,?\d\.?,?\s?)+\s*(EUR|euro|€)?/;

let remittance = '';
let amount = 0.01;

if (!ibanParser.test(text)) {
  throw Error('Unable to locate an IBAN account number on clipboard.');
}

let [iban] = ibanParser.exec(text);
iban = iban.replace(/[^A-Z0-9]/g, '');
console.log(`IBAN: ${iban}`);

if (amountParser.test(text)) {
  [amount] = amountParser.exec(text);
  if (/\./.test(amount) && /,/.test(amount)) {
      amount = amount.replace(/\./, '');
  }
  amount = parseFloat(amount.replace(/[^0-9.,]/g, '').replace(/,/, '.'));
}
console.log(`Amount: EUR${amount}`);

if (remittanceParser.test(text)) {
  [remittance] = remittanceParser.exec(text);
  remittance = remittance.replace(/\s/g, '');
}
console.log(`Remittance Reference: ${remittance}`);

const serviceTag = 'BCD';
const version = '002';
const characterSet = 1;
const identification = 'SCT';

const bic = '';
const name = '';
const purpose = '';
const information = '';

qrcode.setErrorLevel('M');
qrcode.generate(
  [
    serviceTag,
    version,
    characterSet,
    identification,
    bic,
    name,
    iban,
    `EUR${amount}`,
    purpose,
    remittance,
    information
  ].join('\n'),
  {small: true}
);
