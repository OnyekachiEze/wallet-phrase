// Initialize Web3.js and Ethers.js providers
let web3;
let provider;
let signer;
let address;

document.getElementById('connectMetaMask').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      address = await signer.getAddress();
      document.getElementById('walletAddress').innerText = `Connected Address: ${address}`;
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById('connectWalletConnect').addEventListener('click', async () => {
  const WalletConnectProvider = window.WalletConnectProvider.default;
  const walletConnectProvider = new WalletConnectProvider({
    infuraId: "YOUR_INFURA_PROJECT_ID" // You need an Infura ID for WalletConnect
  });

  provider = new ethers.providers.Web3Provider(walletConnectProvider);
  signer = provider.getSigner();
  
  try {
    await walletConnectProvider.enable();
    address = await signer.getAddress();
    document.getElementById('walletAddress').innerText = `Connected Address: ${address}`;
  } catch (error) {
    console.error("Error connecting to WalletConnect: ", error);
  }
});
