import { createSlice } from '@reduxjs/toolkit';
import web3Service from '../services/web3-service';
import ethersService from '../services/ethers-service';
import api from '../api';
import ContractAddresses from '../const/smartContracts';
import ContentType from '../const/contentType';

const initialState = {
  value: 0,
  vkUser: null,
  account: '',
  isLoading: false,
  articles: null,
  channels: null,
  errors: null,
  isContractConnected: false,
  isAuthCheked: false,
  isLogout: false,
  current: {
    channel: null,
    artivle: null,
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAuthChecked: (state, { payload }) => {
      state.isAuthCheked = payload;
    },
    setArticles: (state, { payload }) => {
      state.articles = payload;
    },
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setVkUser: (state, { payload }) => {
      state.vkUser = payload;
    },
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
    setCleareWallet: (state, { payload }) => {
      state.isLogout = payload;
    },
    setContractConnected: (state, { payload }) => {
      state.isContractConnected = payload;
    },
    setCurrentChannel: (state, { payload }) => {
      state.current.channel = payload;
    },
  },
});

export const {
  setAccount,
  setLoading,
  setAuthChecked,
  setArticles,
  setChannels,
  setVkUser,
  setErrors,
  setContractConnected,
  setCurrentChannel,
} = counterSlice.actions;

//Selectors
export const selectCount = (state) => state.counter.value;
export const selectAccount = (state) => state.counter.account;
export const selectIsLoading = (state) => state.counter.isLoading;
export const selectIsAuthChecked = (state) => state.counter.isAuthCheked;
export const selectArticles = (state) => state.counter.articles;
export const selectChannels = (state) => state.counter.channels;
export const selectVkUserId = (state) => state.counter.vkUser.id;
export const selectErrors = (state) => state.counter.errors;
export const selectIsContractConnected = (state) => state.counter.isContractConnected;
export const selectCurrentChannel = (state) => {
  const channelIndex = state.counter.current.channel;
  return state.counter.channels[channelIndex];
};

//Async
export const connectWallet = (walletId, onSuccess) => async (dispatch, getState) => {
  const vkUser = selectVkUserId(getState());

  dispatch(setLoading(true));
  try {
    ethersService.setUserId(vkUser);
    await ethersService.getProvider();
    const account = await ethersService.connectWallet();
    await ethersService.signInWithEthereum();
    await ethersService.sendForVerification();
    const ownerContract = await ethersService.connectContract(ContractAddresses.OWNER);
    const editorContract = await ethersService.connectContract(ContractAddresses.EDITOR);
    const viewerContract = await ethersService.connectContract(ContractAddresses.VIEWER);
    const marketContract = await ethersService.connectContract(ContractAddresses.MARKET);
    console.log({ ownerContract, editorContract, viewerContract, marketContract });
    dispatch(setAccount(account));
    dispatch(setContractConnected(true));
    onSuccess();
  } catch (e) {
    dispatch(setErrors(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchArticles = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const articles = await api.getArticles();
    dispatch(setArticles(articles));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkUserAuth = () => async (dispatch, getState) => {
  const vkUserId = selectVkUserId(getState());
  try {
    const { status, data } = await api.checkAuthenticate(vkUserId);
    if (status === 'ok') {
      dispatch(setAuthChecked(true));
      await ethersService.getProvider();
      const ownerContract = await ethersService.connectContract(ContractAddresses.OWNER);
      const editorContract = await ethersService.connectContract(ContractAddresses.EDITOR);
      const viewerContract = await ethersService.connectContract(ContractAddresses.VIEWER);
      const marketContract = await ethersService.connectContract(ContractAddresses.MARKET);
      console.log({ ownerContract, editorContract, viewerContract, marketContract });
      dispatch(setAccount(data.wallet_address));
      dispatch(setContractConnected(true));
    } else {
      dispatch(setAuthChecked(false));
    }
  } catch (e) {
    console.log(e);
  }
};

export const logoutWallet = () => async (dispatch, getState) => {
  const vkUserId = selectVkUserId(getState());
  try {
    const { status } = await api.logout(vkUserId);
    if (status === 'ok') {
      dispatch(setAuthChecked(false));
      dispatch(setAccount(''));
      dispatch(setContractConnected(false));
      dispatch(setCleareWallet(true));
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchChannels = () => async (dispatch, getState) => {
  const vkUserId = selectVkUserId(getState());
  dispatch(setLoading(true));
  try {
    const channels = await api.getChannels(vkUserId);
    dispatch(setChannels(channels));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const connectOwnerContract = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const contract = await ethersService.connectContract(ContractAddresses.OWNER);
    dispatch(setContractConnected(true));
    console.log({ contract });
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNewArticle = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const onSuccess = async (articleTokenId) => {
      console.log({ articleTokenId });
      const response = await api.createNewContent(articleTokenId, ContentType.ARTICLES);
      console.log({ response });
    };

    await ethersService.createNewContent(onSuccess);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const buyContent = (mintId, cost) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await ethersService.buyContent(mintId, cost);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const submitArticle = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.submitArticle(data);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export default counterSlice.reducer;
