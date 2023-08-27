const crypto = require('crypto');

class DataEncryptionUtility {
    constructor(secretKey = 'defaultSecretKey') {
        this.secretKey = secretKey;
        this.algorithm = 'aes-256-cbc';
    }

    encrypt(data) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
        const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
        return `${iv.toString('hex')}:${encryptedData.toString('hex')}`;
    }

    decrypt(encryptedData) {
        const parts = encryptedData.split(':');
        const iv = Buffer.from(parts.shift(), 'hex');
        const encryptedText = Buffer.from(parts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
        const decryptedData = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decryptedData.toString();
    }
}

module.exports = DataEncryptionUtility;
