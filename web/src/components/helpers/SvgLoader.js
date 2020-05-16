import React from 'react';
import { colors } from '../../styles/utilities/settings';

const SvgLoader = ({ name, color, width }) => (
  <>
    {name.toLowerCase() === 'circle' && <Circle color={color} width={width} />}
    {name.toLowerCase() === 'square' && <Square color={color} width={width} />}
    {name.toLowerCase() === 'play' && <Play color={color} width={width} />}
    {name.toLowerCase() === 'angleArrow' && (
      <AngleArrow color={color} width={width} />
    )}
    {name.toLowerCase() === 'search' && <Search color={color} width={width} />}
    {name.toLowerCase() === 'facebook' && (
      <Facebook color={color} width={width} />
    )}
    {name.toLowerCase() === 'instagram' && (
      <Instagram color={color} width={width} />
    )}
    {name.toLowerCase() === 'youtube' && (
      <Youtube color={color} width={width} />
    )}
    {name.toLowerCase() === 'pinterest' && (
      <Pinterest color={color} width={width} />
    )}
  </>
);

export default SvgLoader;

export const AngleArrow = ({ color, width }) => (
  <svg width={width || '239.073'} viewBox="0 0 330 330">
    <path
      fill={color || '#000'}
      d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
    />
  </svg>
);

export const Circle = ({ color, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || '239.073'}
    viewBox="0 0 239.073 239.073"
  >
    <circle
      cx="102.037"
      cy="102.037"
      r="102.037"
      transform="translate(17.5 17.5)"
      fill="none"
      stroke={color || '#000'}
      strokeMiterlimit="10"
      strokeWidth="35"
    />
  </svg>
);

export const Square = ({ color, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || '239.073'}
    viewBox="0 0 284.22 284.22"
  >
    <rect
      width="249.22"
      height="249.22"
      transform="translate(17.5 17.5)"
      fill="none"
      stroke={color || '#000'}
      strokeMiterlimit="10"
      strokeWidth="35"
    />
  </svg>
);

export const Play = ({ color, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || '172.941'}
    viewBox="0 0 172.941 172.941"
  >
    <g transform="translate(9.756 9.756)">
      <rect
        width="153.429"
        height="153.429"
        rx="70.459"
        transform="translate(0 0)"
        fill="none"
        stroke={color || '#000'}
        strokeMiterlimit="10"
        strokeWidth="19.512"
      />
      <path
        d="M-146.088,464.039V385.271l71.251,39.384Z"
        transform="translate(196.952 -347.94)"
        fill={color || '#000'}
      />
    </g>
  </svg>
);

export const Search = ({ color, width }) => (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 489.713 489.713"
    xmlSpace="preserve"
    width={width || '18'}
  >
    <g>
      <path
        fill={color || '#000'}
        d="M483.4,454.444l-121.3-121.4c28.7-35.2,46-80,46-128.9c0-112.5-91.5-204.1-204.1-204.1S0,91.644,0,204.144
        s91.5,204,204.1,204c48.8,0,93.7-17.3,128.9-46l121.3,121.3c8.3,8.3,20.9,8.3,29.2,0S491.8,462.744,483.4,454.444z M40.7,204.144
        c0-90.1,73.2-163.3,163.3-163.3s163.4,73.3,163.4,163.4s-73.3,163.4-163.4,163.4S40.7,294.244,40.7,204.144z"
      />
    </g>
  </svg>
);

export const Facebook = ({ color, width }) => (
  <svg width={width || '18'} viewBox="0 0 24 24">
    <path
      fill={color || colors.facebook}
      d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
    />
  </svg>
);

const Instagram = ({ color, width }) => (
  <svg width={width || '18'} viewBox="0 0 24 24">
    <path
      fill={color || colors.instagram}
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);

export const Youtube = ({ color, width }) => (
  <svg width={width || '18'} viewBox="0 0 24 24">
    <path
      fill={color || colors.youtube}
      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
    />
  </svg>
);

export const Pinterest = ({ color, width }) => (
  <svg width={width || '18'} viewBox="0 0 24 24">
    <path
      fill={color || colors.pinterest}
      d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);
