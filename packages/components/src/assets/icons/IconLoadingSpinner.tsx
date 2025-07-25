import type { ReactElement } from 'react';
import React from 'react';

type Props = { className?: string };

const IconLoadingSpinner = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 70 40"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {}
      <g transform="translate(-243.000000, -825.000000)">
        {/* eslint-disable-next-line @stylistic/max-len */}
        <path d="M278,835.434783 C264.604333,835.434783 253.719637,846.118748 253.503282,859.379973 L253.5,859.782609 C253.5,862.664094 251.149495,865 248.25,865 C245.350505,865 243,862.664094 243,859.782609 L243,859.782609 C243,840.572704 258.670034,825 278,825 C297.136667,825 312.686233,840.262808 312.995311,859.207415 L313,859.782609 C313,862.664094 310.649495,865 307.75,865 C304.850505,865 302.5,862.664094 302.5,859.782609 L302.5,859.782609 C302.5,846.335676 291.530976,835.434783 278,835.434783 Z" />
      </g>
    </g>
  </svg>
);

export default IconLoadingSpinner;
