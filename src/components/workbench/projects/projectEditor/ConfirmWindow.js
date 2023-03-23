import React, { useState } from "react";
import PropTypes from "prop-types";

const ConfirmWindow = ({ children, onConfirm, onCancel, title, text }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsClicked(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsClicked(false);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      {isClicked && (
        <>
          <div className="confirm-window__background"></div>
          <div className="confirm-window">
            <div className="confirm-window__title">{title}</div>
            <div className="confirm-window__info">{text}</div>
            <div className="confirm-window__buttons">
              <button
                className="confirm-window__buttons__confirm"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                className="confirm-window__buttons__cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

ConfirmWindow.propTypes = {
  children: PropTypes.element.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ConfirmWindow;
