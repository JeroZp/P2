const { generateEnergyContractPDF } = require('../utils/contractGenerator');
const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// Crear directorio si no existe
const contractsDir = path.join(__dirname, '../../contracts');
if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
}

const generateAndSaveContract = async (contractId) => {
    try {
        // Obtener datos completos del contrato
        const contractQuery = `
            SELECT ec.*, 
                   seller.names as seller_names, seller.surnames as seller_surnames, 
                   seller.cedulaOrNit as seller_document, seller.userType as seller_type,
                   buyer.names as buyer_names, buyer.surnames as buyer_surnames,
                   buyer.cedulaOrNit as buyer_document, buyer.userType as buyer_type
            FROM energy_contracts ec
            JOIN offer o ON ec.offer_id = o.id
            JOIN users seller ON o.userId = seller.id
            JOIN users buyer ON ec.buyer_id = buyer.id
            WHERE ec.id = $1
        `;

        const contractData = await db.one(contractQuery, [contractId]);

        // Generar nombre de archivo único
        const fileName = `contract_${contractId}_${Date.now()}.pdf`;
        const filePath = path.join(contractsDir, fileName);

        // Generar PDF
        await generateEnergyContractPDF({
            contractId: contractData.id,
            createdAt: contractData.created_at,
            sellerNames: contractData.seller_names,
            sellerSurnames: contractData.seller_surnames,
            sellerDocument: contractData.seller_document,
            sellerType: contractData.seller_type,
            buyerNames: contractData.buyer_names,
            buyerSurnames: contractData.buyer_surnames,
            buyerDocument: contractData.buyer_document,
            buyerType: contractData.buyer_type,
            quantity: contractData.quantity,
            agreedPrice: contractData.agreed_price
        }, filePath);

        // Actualizar contrato con la ruta del PDF
        await db.none(
            'UPDATE energy_contracts SET contract_pdf_path = $1 WHERE id = $2',
            [fileName, contractId]
        );

        return fileName;
    } catch (error) {
        console.error('Error generating contract:', error);
        throw error;
    }
};

module.exports = {
    generateAndSaveContract
};