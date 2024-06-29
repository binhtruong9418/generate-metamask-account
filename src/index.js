const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const mnemonic = dotenv.config().parsed.MNEMONIC;
const NUMBER_OF_ACCOUNTS = 20;

const createAccounts = async () => {
    let accounts = [];
    for (let i = 0; i < NUMBER_OF_ACCOUNTS; i++) {
        const path = `m/44'/60'/0'/0/${i}`;
        const newWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, path);
        accounts.push({
            address: newWallet.address,
            privateKey: newWallet.privateKey
        });
    }
    console.log(`Created ${NUMBER_OF_ACCOUNTS} accounts`)
    return accounts
}

const saveAccounts = async (accounts) => {
    const filePath = path.join(__dirname, 'accounts.json');
    const obj = accounts.reduce((acc, account) => {
        acc.accounts.push(account);
        return acc;
    }, { accounts: [] })
    
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
    console.log(`Accounts saved to ${filePath}`);
}

const main = async () => {
    const accounts = await createAccounts();
    await saveAccounts(accounts);
}

main().then(() => {
    console.log("Created accounts successfully!")
    process.exit(0);
})