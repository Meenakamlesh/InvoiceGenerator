"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = exports.createInvoice = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const Invoice_1 = __importDefault(require("../models/Invoice"));
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.body;
        const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const gstAmount = subtotal * 0.18;
        const totalAmount = subtotal + gstAmount;
        const invoiceNumber = `INV-${Date.now()}`;
        const invoice = yield Invoice_1.default.create({
            userId: req.user.id,
            products: products.map((p) => (Object.assign(Object.assign({}, p), { total: p.price * p.quantity }))),
            subtotal,
            gst: 18,
            totalAmount,
            invoiceNumber,
        });
        res.status(201).json({ success: true, invoice });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createInvoice = createInvoice;
const generatePDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId } = req.params;
        const invoice = yield Invoice_1.default.findById(invoiceId).populate('userId');
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        const browser = yield puppeteer_1.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = yield browser.newPage();
        const htmlContent = generateInvoiceHTML(invoice);
        yield page.setContent(htmlContent);
        const pdf = yield page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px',
            },
        });
        yield browser.close();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
        res.send(pdf);
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating PDF' });
    }
});
exports.generatePDF = generatePDF;
const generateInvoiceHTML = (invoice) => {
    var _a, _b;
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .invoice-info {
            padding: 30px;
            background: #f8f9fa;
        }
        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .table-container {
            padding: 0 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        .total-section {
            padding: 30px;
            background: #f8f9fa;
            border-top: 3px solid #667eea;
        }
        .total-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        .final-total {
            font-size: 1.2em;
            font-weight: bold;
            color: #667eea;
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <h1>INVOICE</h1>
            <p>Invoice #${invoice.invoiceNumber}</p>
        </div>
        
        <div class="invoice-info">
            <div class="invoice-details">
                <div>
                    <h3>Bill To:</h3>
                    <p>${((_a = invoice.userId) === null || _a === void 0 ? void 0 : _a.name) || 'Customer'}</p>
                    <p>${((_b = invoice.userId) === null || _b === void 0 ? void 0 : _b.email) || ''}</p>
                </div>
                <div>
                    <h3>Invoice Details:</h3>
                    <p><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString()}</p>
                    <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
                </div>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.products.map((product) => `
                        <tr>
                            <td>${product.name}</td>
                            <td>₹${product.price}</td>
                            <td>${product.quantity}</td>
                            <td>₹${product.total}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="total-section">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>₹${invoice.subtotal}</span>
            </div>
            <div class="total-row">
                <span>GST (${invoice.gst}%):</span>
                <span>₹${(invoice.subtotal * invoice.gst / 100).toFixed(2)}</span>
            </div>
            <hr>
            <div class="total-row final-total">
                <span>Total Amount:</span>
                <span>₹${invoice.totalAmount}</span>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
