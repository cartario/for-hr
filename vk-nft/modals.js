import { ModalRoot, ModalPage, ModalCard, ModalPageHeader } from '@vkontakte/vkui';
import { Icon56ErrorTriangleOutline } from '@vkontakte/icons';
import TestModal from '../modals/TestModal';
import ConnectWallet from '../modals/ConnectWallet';

import ModalPages from '../const/modalNames';
import { useSelector, useDispatch } from 'react-redux';
import { selectErrors, setErrors } from '../store/slice';

const Modal = ({ activeModal, modalBack }) => {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage onClose={modalBack} id={ModalPages.SELECT}>
        <TestModal />
      </ModalPage>
      <ModalCard onClose={modalBack} id={ModalPages.FAQ}>
        faq...
      </ModalCard>
      <ModalPage
        onClose={modalBack}
        id={ModalPages.CONNECT_WALLET}
        header={<ModalPageHeader>Подключение кошелька</ModalPageHeader>}
      >
        <ConnectWallet onClose={modalBack} />
      </ModalPage>
      <ModalCard
        icon={<Icon56ErrorTriangleOutline />}
        header="Не авторизован"
        subheader={errors}
        onClose={() => {
          modalBack();
          dispatch(setErrors(null));
        }}
        id={ModalPages.ERRORS}
      ></ModalCard>
    </ModalRoot>
  );
};

export default Modal;
