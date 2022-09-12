import { useResetState } from '@events-helsinki/core-lib';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import React from 'react';

const MessageDisplayTime = 4000; // 4s

type ButtonProps = JSX.IntrinsicElements['button'];
interface Props extends ButtonProps {
  string: string;
  successClass?: string;
  successMessage: React.ReactNode;
}

const CopyButton: React.FC<Props> = ({
  string,
  successClass = 'success',
  successMessage,
  ...rest
}) => {
  const [isShowCopySuccess, setIsShowCopySuccess] = useResetState(
    false,
    MessageDisplayTime
  );

  const handleButtonClick = () => {
    copy(string);
    setIsShowCopySuccess(true);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        {...rest}
        className={classNames(rest.className, {
          [successClass]: isShowCopySuccess,
        })}
      />
      {isShowCopySuccess && successMessage}
    </>
  );
};

export default CopyButton;
