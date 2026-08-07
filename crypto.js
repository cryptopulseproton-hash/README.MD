/**
 * Security & Encryption Module
 * Ensures end-to-end encryption for text, calls, and files.
 */

const crypto = require('crypto');

class P2PSecurity {
    // মেসেজ এনক্রিপ্ট করার ফাংশন
    static encryptMessage(text, sharedKey) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(sharedKey, 'hex'), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted
        };
    }

    // মেসেজ ডিক্রিপ্ট (পড়ার উপযোগী) করার ফাংশন
    static decryptMessage(encryptedData, iv, sharedKey) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(sharedKey, 'hex'), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

module.exports = P2PSecurity;
