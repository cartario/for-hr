import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  WebviewType,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store';
import {
  selectIsLoading,
  setVkUser,
  selectErrors,
  fetchArticles,
  fetchChannels,
  checkUserAuth,
} from './store/slice';

import PanelNames from './const/panels';
import ModalPages from './const/modalNames';

import Modal from './modals';
import Home from './panels/Home/index.js';
import Role from './panels/Role';
import Post from './panels/Post';
import NewArticle from './panels/NewArticle';
import Channel from './panels/Channel';
import './App.css';
const App = () => {
  const [scheme, setScheme] = useState('vkcom_light');
  const [activePanel, setActivePanel] = useState(PanelNames.HOME);
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [activeModal, setActiveModal] = useState(null);
  const [modalHistory, setModalHistory] = useState([]);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const errors = useSelector(selectErrors);

  useEffect(() => {
    if (fetchedUser) {
      dispatch(checkUserAuth())
      dispatch(fetchArticles());
      dispatch(fetchChannels());
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (isLoading) {
      setPopout(<ScreenSpinner size="large" />);
    } else {
      setPopout(null);
    }
  }, [isLoading]);

  useEffect(() => {
    if (errors) {
      changeActiveModal(ModalPages.ERRORS);
    }
  }, errors);

  const changeActiveModal = (activeModal) => {
    activeModal = activeModal || null;
    let localModalHistory = modalHistory ? [...modalHistory] : [];

    if (activeModal === null) {
      localModalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
    } else {
      localModalHistory.push(activeModal);
    }

    setActiveModal(activeModal);
    setModalHistory(localModalHistory);
  };

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2]);
  };

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        setScheme(data.scheme);
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      dispatch(setVkUser(user));
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider scheme={scheme} webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            popout={popout}
            modal={<Modal activeModal={activeModal} modalBack={modalBack} />}
          >
            <SplitCol>
              <View activePanel={activePanel}>
                <Role changeActiveModal={changeActiveModal} id={PanelNames.ROLE} go={go} />
                <Post changeActiveModal={changeActiveModal} id={PanelNames.POST} go={go} />
                <Home
                  fetchedUser={fetchedUser}
                  setActivePanel={setActivePanel}
                  changeActiveModal={changeActiveModal}
                  id={PanelNames.HOME}
                  go={go}
                />
                <NewArticle id={PanelNames.NEW_ARTICLE} go={go} />
                <Channel changeActiveModal={changeActiveModal} id={PanelNames.CHANNEL} go={go} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default ConnectedApp;
