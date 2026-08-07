const crypto = require('crypto');

class P2PUserIdentity {
    constructor() {
        this.identity = this.generateAutomaticIdentity();
    }

    generateAutomaticIdentity() {
        try {
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
            });

            const userId = crypto.createHash('sha256')
                                 .update(publicKey)
                                 .digest('hex')
                                 .substring(0, 24);

            return {
                userId: `P2P-${userId.toUpperCase()}`,
                publicKey,
                privateKey,
                createdAt: new Date().toISOString()
            };
        } catch (error) {
            console.error("Identity generation failed:", error);
            return null;
        }
    }

    getPublicProfile() {
        return {
            userId: this.identity.userId,
            publicKey: this.identity.publicKey
        };
    }
}

module.exports = P2PUserIdentity;
