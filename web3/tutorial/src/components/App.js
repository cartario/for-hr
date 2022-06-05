import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json';
import Navbar from './Navbar';
import Main from './Main';

async function loadWeb3() {
  if (window.etherium) {
    window.web3 = new Web3(window.etherium);
    await window.etherium.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('non-etherium browser detected. You should concider trying MetaMask');
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      decentagram: null,
      images: [],
      loading: true,
      imageCount: null,
    };
  }

  async loadBlockChainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkID = await web3.eth.net.getId();
    const networkData = Decentragram.networks[networkID];

    if (networkData) {
      const decentagram = await new web3.eth.Contract(Decentragram.abi, networkData.address); //подключение к контракту
      const imageCount = await decentagram.methods.imageCount().call(); //не забыть сделать миграцию

      this.setState({ decentagram, loading: false, imageCount });
    } else {
      alert('Contract is not deployed on this network');
    }

    this.setState({
      account: accounts[0],
    });
  }

  async componentDidMount() {
    await loadWeb3();
    await this.loadBlockChainData();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
          // Code...
          />
        )}
        }
      </div>
    );
  }
}

export default App;
