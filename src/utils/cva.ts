import { cva } from 'class-variance-authority';

// header styles
export const headerList = cva('flex', {
  variants: {
    child: {
      a: 'text-text-light dark:hover:text-white hover:text-black',
    },
  },
});
export const dropdownButton = cva(
  'block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 rounded'
);

// login styles
export const loginInput = cva(
  'w-full p-2 mb-2 border border-gray-300 rounded dark:bg-custom-gray-dark dark:border-[rgb(51,61,75)]'
);

// sidebar styles
export const sidebarBox = cva(
  'w-full p-6 border border-gray-300 rounded-lg shadow-md mb-8 dark:border-[rgb(51,61,75)]'
);
export const title = cva(
  'text-lg font-medium mb-6 text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)]'
);

// our mission styles
export const ourMissionArticleH2 = cva(
  `text-3xl text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)] mb-2 font-semibold`
);
// our offer styles
export const ourOfferBlock = cva(`w-full flex flex-col items-center mb-12`);
export const ourOfferRow = cva(`flex gap-6 w-full pt-8`);
export const ourOffercard = cva(
  `w-1/3 border border-solid border-[rgb(229,231,235)] dark:border-[rgb(31,41,55)] p-6 rounded-[12px] flex flex-col`
);
export const offerCardTitle = cva(
  `text-[16px] text-[rgb(3,5,12)] dark:text-[rgb(255,255,255)] mb-6 font-semibold`
);
export const offerCardtext = cva(
  `text-[14px] text-[rgb(85,88,104)] dark:text-[rgb(151,155,170)]`
);
// Author Page Styles
export const socialMediaIcon = cva(
  'w-9 h-9 rounded-full flex justify-center items-center border border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700',
  {
    variants: {
      child: {
        img: 'w-4 h-4',
      },
    },
  }
);

export const followersColumn = cva('flex items-center gap-2');
export const followersIcon = cva('w-4 h-4 text-royalblue');
export const followersText = cva('text-sm text-gray-600 dark:text-gray-400');
