const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateEnergyContractPDF = async (contractData, outputPath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(outputPath);

        doc.pipe(stream);

        // Encabezado
        doc.fontSize(20)
            .font('Helvetica-Bold')
            .text('CONTRATO DE COMPRAVENTA DE ENERGÍA', { align: 'center' });

        doc.moveDown(0.5);
        doc.fontSize(10)
            .font('Helvetica')
            .text(`N° ${contractData.contractId}`, { align: 'center' });

        doc.moveDown(2);

        // Datos del contrato
        doc.fontSize(12)
            .text(`Fecha: ${new Date(contractData.createdAt).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })}`, { align: 'right' });

        doc.moveDown(2);

        // Partes
        doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('PARTES INTERVINIENTES:', { underline: true });

        doc.moveDown();

        // Vendedor
        doc.fontSize(12)
            .font('Helvetica-Bold')
            .text('VENDEDOR:');

        doc.font('Helvetica')
            .text(`${contractData.sellerNames} ${contractData.sellerSurnames}`);
        doc.text(`Documento: ${contractData.sellerDocument}`);
        doc.text(`Tipo de usuario: ${contractData.sellerType}`);

        doc.moveDown();

        // Comprador
        doc.font('Helvetica-Bold')
            .text('COMPRADOR:');

        doc.font('Helvetica')
            .text(`${contractData.buyerNames} ${contractData.buyerSurnames}`);
        doc.text(`Documento: ${contractData.buyerDocument}`);
        doc.text(`Tipo de usuario: ${contractData.buyerType}`);

        doc.moveDown(2);

        // Términos
        doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('TÉRMINOS DEL CONTRATO:', { underline: true });

        doc.moveDown();

        doc.font('Helvetica')
            .text(`1. OBJETO: El VENDEDOR se compromete a suministrar y el COMPRADOR a adquirir ${contractData.quantity} Wh de energía eléctrica.`);

        doc.moveDown();

        doc.text(`2. PRECIO: Las partes acuerdan un precio de $${contractData.agreedPrice} por Wh.`);

        doc.moveDown();

        doc.text('3. PLAZO: Este contrato tendrá una vigencia de un (1) mes a partir de la fecha.');

        doc.end();

        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
    });
};

module.exports = { generateEnergyContractPDF };