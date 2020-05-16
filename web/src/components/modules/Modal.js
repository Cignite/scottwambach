import React, { useState } from 'react';

import styled from 'styled-components';
import { colors, font, misc } from '../../styles/utilities/settings';
import { absoluteCenter } from '../../styles/utilities/elements';

const Modal = ({ children, modalContent }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalClose = () => {
    global.document.addEventListener('click', e => {
      if (e.target.id === 'outter' || e.key === 'Escape') {
        setModalOpen(false);
      }
    });

    global.document.onkeydown = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };
  };

  return (
    <>
      <ModalTrigger
        style={{ cursor: 'pointer' }}
        href={null}
        onClick={() => {
          setModalOpen(!modalOpen);
          modalClose();
        }}
      >
        {children}
      </ModalTrigger>
      {modalOpen && (
        <SModal id="outter">
          <a
            style={{ cursor: 'pointer' }}
            href={null}
            className="close"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <span />
            <span />
          </a>
          <div className="inner">{modalContent}</div>
        </SModal>
      )}
    </>
  );
};

export default Modal;

export const ModalTrigger = styled.a`
  position: relative;
  display: block;

  svg {
    ${absoluteCenter};
    z-index: 4;
    opacity: 0.5;
    max-width: 80px;
  }
`;

export const SModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${colors.blackOverlay};
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    ${({ loading }) => (loading ? '' : `border: 4px solid ${colors.white};`)};
  }

  .control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 60px;
    z-index: 101;
    cursor: pointer;
    text-decoration: none;
    color: ${colors.white};

    span {
      display: block;
      height: 3px;
      width: 30px;
      background-color: ${colors.white};
      top: 17px;
      position: relative;

      + span {
        margin-top: 18px;
      }
    }
  }

  .previous {
    left: 5%;
    span {
      transform: rotate(-45deg);
      + span {
        transform: rotate(45deg);
      }
    }
  }

  .next {
    right: 5%;
    span {
      transform: rotate(45deg);
      + span {
        transform: rotate(-45deg);
      }
    }
  }

  .close {
    position: absolute;
    right: 5%;
    top: 5%;
    height: 30px;
    z-index: 101;
    cursor: pointer;
    text-decoration: none;
    color: ${colors.white};

    &:hover {
      color: ${colors.white};
    }

    &:before {
      content: 'Close';
      display: block;
      position: absolute;
      font-family: ${font.primary};
      text-transform: uppercase;
      right: calc(100% + 10px);
      top: calc(50% - 13px);
      transform: translateY(-50%);
    }

    span {
      display: block;
      height: 3px;
      width: 30px;
      background-color: ${colors.white};
      transform: rotate(45deg);

      + span {
        margin-top: -3px;
        transform: rotate(-45deg);
      }
    }
  }

  .image-container {
    max-width: 1000px;
    max-height: 90vh;
    margin: 0 auto;

    &.loading {
      img {
        opacity: 0;
      }
    }

    img {
      max-width: 100%;
      max-height: 90vh;
      height: auto;
      width: auto;
      margin: 0 auto;
      opacity: 1;
      transition-duration: ${misc.animSpeed};
    }
  }
`;
