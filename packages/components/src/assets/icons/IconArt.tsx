import type { ReactElement } from 'react';
import React from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
const IconArt = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50.66 50.66"
    className={className}
  >
    <path d="M25.33,0A25.67,25.67,0,0,0,0,25.33,25.4,25.4,0,0,0,24.54,50.65h.36a10.93,10.93,0,0,0,11-9.55A10.68,10.68,0,0,0,35,35.52a2.76,2.76,0,0,1,3.61-3.68l.3.14a8.78,8.78,0,0,0,5.64.89,7.88,7.88,0,0,0,6.14-7.81A25.42,25.42,0,0,0,25.33,0ZM40.4,28.64l-.35-.17a6.43,6.43,0,0,0-8.41,8.59,7,7,0,0,1,.59,3.66A7.33,7.33,0,0,1,24.89,47h-.23a21.83,21.83,0,0,1-21-21.65A22,22,0,0,1,25.33,3.67,21.73,21.73,0,0,1,47,25.1a4.16,4.16,0,0,1-3.18,4.16A5.25,5.25,0,0,1,40.4,28.64Z" />
    <path d="M22.33,43.22a5.8,5.8,0,1,1,5.8-5.8A5.8,5.8,0,0,1,22.33,43.22Zm0-8.6a2.8,2.8,0,1,0,2.8,2.8A2.81,2.81,0,0,0,22.33,34.62Z" />
    <path d="M12.58,32.17a5.8,5.8,0,1,1,5.8-5.8A5.8,5.8,0,0,1,12.58,32.17Zm0-8.6a2.8,2.8,0,1,0,2.8,2.8A2.8,2.8,0,0,0,12.58,23.57Z" />
    <path d="M16.53,18.58A4.55,4.55,0,1,1,21.08,14,4.55,4.55,0,0,1,16.53,18.58Zm0-6.09a1.55,1.55,0,0,0,0,3.09,1.55,1.55,0,1,0,0-3.09Z" />
    <path d="M28.38,15.58A4.55,4.55,0,1,1,32.92,11,4.55,4.55,0,0,1,28.38,15.58Zm0-6.09A1.55,1.55,0,1,0,29.92,11,1.54,1.54,0,0,0,28.38,9.49Z" />
    <path d="M38.15,21.67a4.55,4.55,0,1,1,4.54-4.55A4.55,4.55,0,0,1,38.15,21.67Zm0-6.09a1.55,1.55,0,1,0,1.54,1.54A1.55,1.55,0,0,0,38.15,15.58Z" />
  </svg>
);

export default IconArt;