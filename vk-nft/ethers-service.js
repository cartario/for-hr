import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import api from '../api';
import ContentOwnerAbi from '../abis/ContentOwner.json';
import ContentEditorAbi from '../abis/ContentEditor.json';
import ContentViewerAbi from '../abis/ContentViewer.json';
import MarketAccessContent from '../abis/MarketAccessContent.json';
import ContractAddress from '../const/smartContracts';

const domain = window.location.host;
const origin = window.location.origin;

class EthersService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.nonce = null;
    this.message = null;
    this.signature = null;
    this.userId = null;
    this.contract = null;
    this.contracts = {
      [ContractAddress.OWNER]: null,
      [ContractAddress.VIEWER]: null,
      [ContractAddress.MARKET]: null,
      [ContractAddress.EDITOR]: null,
    };
  }

  setUserId(userId) {
    this.userId = userId;
  }

  async getProvider() {
    try {
      if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is not installed!');
      } else {
        console.log('MetaMask is installed!');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        this.provider = provider;
        this.signer = signer;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async connectWallet() {
    try {
      const accounts = await this.provider.send('eth_requestAccounts', []);
      return accounts[0];
    } catch (e) {
      console.log('user rejected request');
      throw new Error(e);
    }
  }

  async signInWithEthereum() {
    try {
      const message = await this.createSiweMessage(
        await this.signer.getAddress(),
        'Sign in with Ethereum to the app.',
      );

      const signature = await this.signer.signMessage(message);

      this.message = message;
      this.signature = signature;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createSiweMessage(address, statement) {
    const response = await api.generateNonce(this.userId);
    this.nonce = response.nonce;

    try {
      const message = new SiweMessage({
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: '1',
        nonce: response.nonce,
      });
      return message.prepareMessage();
    } catch (e) {
      throw new Error(e);
    }
  }

  async sendForVerification() {
    try {
      const response = await api.sendForVerification(
        this.userId,
        this.nonce,
        this.message,
        this.signature,
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  async connectContract(address) {
    try {
      const mapping = {
        [ContractAddress.OWNER]: ContentOwnerAbi,
        [ContractAddress.EDITOR]: ContentEditorAbi,
        [ContractAddress.VIEWER]: ContentViewerAbi,
        [ContractAddress.MARKET]: MarketAccessContent,
      };
      const abi = mapping[address].abi;

      const contract = new ethers.Contract(address, abi, this.signer);

      this.contracts[address] = contract;
      return contract;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createNewContent(onSuccess) {
    try {
      await this.contracts[ContractAddress.OWNER].safeMint();

      this.contracts[ContractAddress.OWNER].once('Transfer', (from, to, value, event) => {
        onSuccess(value._hex.toString());
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async buyContent(mintId, cost) {
    try {
      const costInEthers = ethers.utils.formatEther(cost);
      await this.contracts[ContractAddress.MARKET].buy(mintId, { value: cost });

      // this.contracts[ContractAddress.MARKET].once('Transfer', (from, to, value, event) => {
      //   onSuccess(from, to, value, event);
      // });
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new EthersService();
