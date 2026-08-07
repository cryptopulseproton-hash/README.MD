const P2PUserIdentity = require('./identity');

console.log("=== P2P Global Communication App Initializing ===");

// অ্যাপ ইনস্টল হওয়ার সাথে সাথে স্বয়ংক্রিয় আইডি তৈরি
const currentUser = new P2PUserIdentity();
const profile = currentUser.getPublicProfile();

console.log("------------------------------------------------");
console.log("অ্যাপ সফলভাবে রান হয়েছে!");
console.log("আপনার অটো-জেনারেটেড ইউনিক আইডি:", profile.userId);
console.log("স্ট্যাটাস: ডিভাইসটি এখন একটি লোকাল সার্ভার হিসেবে প্রস্তুত।");
console.log("------------------------------------------------");
