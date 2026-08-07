/**
 * P2P Network Module
 * Handles direct connection between peers without a central server.
 */

const dgram = require('dgram'); // UDP socket for peer discovery

class P2PNetwork {
    constructor(port = 40000) {
        this.port = port;
        this.socket = dgram.createSocket('udp4');
        this.initServer();
    }

    initServer() {
        this.socket.on('error', (err) => {
            console.error(`Network error:\n${err.stack}`);
            this.socket.close();
        });

        this.socket.on('message', (msg, rinfo) => {
            console.log(`Received message from ${rinfo.address}:${rinfo.port} -> ${msg.toString()}`);
        });

        this.socket.on('listening', () => {
            const address = this.socket.address();
            console.log(`P2P Node is active and listening on ${address.address}:${address.port}`);
        });

        this.socket.bind(this.port);
    }

    // অন্য পিয়ারে মেসেজ বা সিগন্যাল পাঠানোর ফাংশন
    sendMessage(message, targetIp, targetPort) {
        const data = Buffer.from(message);
        this.socket.send(data, targetPort, targetIp, (err) => {
            if (err) {
                console.error("Failed to send message:", err);
            } else {
                console.log(`Message successfully sent to ${targetIp}:${targetPort}`);
            }
        });
    }
}

module.exports = P2PNetwork;
