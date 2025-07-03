# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js CLI tool that generates SEPA payment QR codes from clipboard text containing payment details. It reads clipboard content, extracts IBAN, amount, and remittance information using regex patterns, then generates a QR code following the SEPA QR code standard.

## Key Commands

- **Run the tool**: `node index.js` or `sepa-qr` (if installed globally)
- **Install globally**: `npm i -g https://github.com/smhg/sepa-qr`
- **Test**: No test framework configured (placeholder script exists)

## Architecture

The application is a single-file Node.js script (`index.js`) that:

1. **Input Processing**: Reads clipboard content synchronously using `clipboardy`
2. **Data Extraction**: Uses three regex patterns to extract payment information:
   - `ibanParser`: Extracts IBAN account numbers (format: 2 letters + 2+ digits/spaces)
   - `amountParser`: Extracts monetary amounts with EUR/euro/€ symbols
   - `remittanceParser`: Extracts structured remittance references (format: +++digits/spaces+++)
3. **Amount Parsing**: Handles complex amount formats with both dots and commas
4. **QR Code Generation**: Creates SEPA-compliant QR codes using the BCD format with fields:
   - Service Tag: BCD
   - Version: 002
   - Character Set: 1
   - Identification: SCT
   - Required fields: IBAN, amount in EUR
   - Optional fields: BIC, name, purpose, remittance, information

## Dependencies

- `clipboardy`: Clipboard access
- `qrcode-terminal`: QR code generation and terminal display

## Error Handling

The application will throw an error if no IBAN is found in the clipboard text. It defaults to EUR 0.01 if no amount is detected.