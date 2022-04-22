import React from "react";
import { PropTypes } from "prop-types";

function Carts({ width, height }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      data-name='Layer 1'
      viewBox='0 0 478.28 489.25'
      width={width}
      height={height}
    >
      <path
        d='M8.66 11.67c-3.3.6-7.71 4.81-8.31 8C-.45 24.09 1.55 28.89 5 31c3 1.9 5.3 2 33.45 2h30.2l1 5.21c.6 2.9 13.22 65.7 27.94 139.51 18.53 92.13 27.75 136.2 29.45 140.51a79 79 0 0053.38 46.87c6.71 1.8 12.72 1.9 144 1.9h137.12l2.9-3.3a10.4 10.4 0 00-4.8-17.13c-2.61-.7-46.17-1.1-135.51-1.1-144.81 0-136.8.3-150-6.11-12.12-5.91-24-19.93-27.74-32.55-.8-2.9-14.32-69.1-29.95-147.12C95.09 53.53 87.48 17.28 86.08 15.77c-4-4.6-6.31-4.8-41.56-4.7-18.33.1-34.46.4-35.86.6zM175.8 391.6c-14.1 3.4-29.2 15.3-35.7 28.1-10.9 21.8-7 47.4 9.9 64.3 11.1 11.1 23.7 16.3 39.5 16.3 24-.1 44.3-14.8 52.1-37.9A54.66 54.66 0 00228 406a55.37 55.37 0 00-52.2-14.4zM398.1 391.6a56.38 56.38 0 00-39.6 38.7c-2.2 7.7-2.2 21.7 0 29.3 5.6 19.2 19.7 33.3 39.1 39 7.7 2.2 21.1 2.2 29-.1 23.9-6.9 40.4-28.6 40.4-53-.1-25.6-17.7-48.2-42.2-54-7.9-1.8-19.7-1.8-26.7.1z'
        transform='translate(-.17 -11.05)'
      ></path>
      <path
        fill='#ffcd05'
        stroke='#f68c22'
        strokeMiterlimit='10'
        strokeWidth='0.921'
        d='M106.05 90.52L150.53 310.01 438.83 272.95 477.83 90.52'
      ></path>
      <path
        fill='#fff'
        stroke='#f68c22'
        strokeMiterlimit='10'
        strokeWidth='0.921'
        d='M139.83 130.95L173.83 271.95 196.83 266.95 161.83 130.95'
      ></path>
      <path
        fill='#fff'
        stroke='#f68c22'
        strokeMiterlimit='10'
        strokeWidth='0.921'
        d='M189.04 123.73L223.04 264.73 246.04 259.73 211.04 123.73'
      ></path>
      <path
        fill='#fff'
        stroke='#f68c22'
        strokeMiterlimit='10'
        strokeWidth='0.921'
        d='M272.9 123.53L284.89 263.45 261.38 264.57 251.2 119.89'
      ></path>
      <path
        fill='#fff'
        stroke='#f68c22'
        strokeMiterlimit='10'
        strokeWidth='0.851'
        d='M317.44 132.88L305.25 257.28 328.23 261.69 337.93 140.9'
      ></path>
      <path
        fill='#fff'
        stroke='#f68c22'
        strokeMiterlimit='10'
        strokeWidth='0.921'
        d='M370.37 118.15L353.42 262.2 376.73 265.48 391.01 125.77'
      ></path>
    </svg>
  );
}

Carts.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Carts.default = {
  width: 26,
  height: 26,
};

export default Carts;
