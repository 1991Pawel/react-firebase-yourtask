import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { db } from '../firebase/firebase';
import { useCurrentUser } from '../hook/useCurrentUser';
import Button from './Button';
import { useModalContext } from '../hook/useModalContext';
import 'react-toastify/dist/ReactToastify.css';

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  padding: 2rem 1rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  background: #fff;
  width: 280px;
`;

const ModalHeading = styled.h3`
  font-size: 1rem;
`;

const ModalForm = styled.form`
  input {
    width: 100%;
    height: 2rem;
    margin: 1.2rem 0;
    padding: 0 0.2rem;
  }
`;

const ModalMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1rem;
`;
const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-right: 0;
  }
`;

const AddTaskModal = () => {
  const { setModalOpen } = useModalContext();
  const [project, setProject] = useState('');
  const [error, setError] = useState(false);
  const context = useCurrentUser();

  const handleHide = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (project.trim().length) {
      db.collection('projects').add({
        title: project,
        isDone: false,
        userId: context?.uid,
        createdAt: new Date(),
      });
      toast.info('Zadanie zostało dodane', {
        position: 'bottom-right',
      });
      setError(false);
      setModalOpen(false);
    } else {
      setError(true);
    }
    setProject('');
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (

    <ModalWrapper
      onClick={handleHide}
      initial={{ opacity:.5 }}
      animate={{ opacity:1 }}
    >
      <Modal>
        <ModalHeading>Zadanie:</ModalHeading>
        {error && <ModalMessage>input is empty</ModalMessage>}
        <ModalForm onSubmit={(e) => onSubmit(e)}>
          <input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            type="text"
            maxLength={80}
          />
        </ModalForm>
        <ModalButtonGroup>
          <Button onClick={onSubmit} primary>
            Dodaj
          </Button>
          <Button onClick={closeModalHandler}>Anuluj</Button>
        </ModalButtonGroup>
      </Modal>
    </ModalWrapper>
  );
};

export default AddTaskModal;
