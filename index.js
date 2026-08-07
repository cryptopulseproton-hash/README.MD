/**
 * Main Application Entry Point
 * Integrates Identity, Network, and Security modules for the P2P App.
 */

const P2PUserIdentity = require('./identity');
const P2PNetwork = require('./network');
const P2PSecurity = require('./crypto');

console.log("=== P2P Global Communication App Initializing ===");

// ১. অটোমেটিক ইউজার আইডি এবং ক্রিপ্টোগ্রাফিক কি তৈরি
const currentUser = new P2PUserIdentity();
const profile = currentUser.getPublicProfile();

console.log("------------------------------------------------");
console.log("✅ ইউজার তৈরি সফল হয়েছে!");
console.log("আপনার ইউনিক আইডি:", profile.userId);
console.log("------------------------------------------------");

// ২. পিয়ার-টু-পিয়ার নেটওয়ার্ক নোড স্টার্ট করা
const p2pNode = new P2PNetwork(40000);

// ৩. সিকিউরিটি টেস্ট (এনক্রিপশন ও ডিক্রিপশন যাচাই)
const dummySharedKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const originalMessage = "Hello from Decentralized P2P World!";

const encrypted = P2PSecurity.encryptMessage(originalMessage, dummySharedKey);
console.log("🔒 এনক্রিপ্টকৃত ডাটা:", encrypted.encryptedData.substring(0, 30) + "...");

const decrypted = P2PSecurity.decryptMessage(encrypted.encryptedData, encrypted.iv, dummySharedKey);
console.log("🔓 ডিক্রিপ্টকৃত মূল মেসেজ:", decrypted);
console.log("------------------------------------------------");
console.log("স্ট্যাটাস: অ্যাপটি এখন সম্পূর্ণ প্রস্তুত এবং এটি একটি লোকাল সার্ভার হিসেবে কাজ করছে।");
