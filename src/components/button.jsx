// import React from 'react';

// export default function Button({ variant = 'primary', children, className = '', ...props }) {
//   let variantClass = '';

//   switch (variant) {
//     case 'secondary':
//       variantClass = 'bg-gray-600 text-white hover:bg-gray-700';
//       break;
//     case 'outline':
//       variantClass = 'border border-gray-600 text-gray-600 hover:bg-gray-100';
//       break;
//     case 'danger':
//       variantClass = 'bg-red-600 text-white hover:bg-red-700';
//       break;
//     case 'primary':
//     default:
//       variantClass = 'bg-blue-600 text-white hover:bg-blue-700';
//       break;
//   }

//   const baseClass = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200';

//   return (
//     <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// }
