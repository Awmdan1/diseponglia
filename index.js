require('dotenv').config();
const { ethers } = require('ethers');

// Konfigurasi
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const faucetAmount = ethers.parseEther('0.01'); // Mengirimkan 0.01 ETH

// Fungsi untuk mengirim ETH
async function sendFaucet(address) {
  try {
    const tx = await wallet.sendTransaction({
      to: address,
      value: faucetAmount
    });
    console.log(`Faucet sent: ${tx.hash}`);
  } catch (err) {
    console.error('Error sending faucet:', err);
  }
}

// Menjalankan Faucet Secara Terus-Menerus
async function runFaucet() {
  while (true) {
    const randomAddress = ethers.Wallet.createRandom().address; // Generasi alamat random
    console.log(`Sending faucet to: ${randomAddress}`);
    
    await sendFaucet(randomAddress);

    // Menunggu 5 menit sebelum mengirim lagi
    await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
  }
}

runFaucet();
