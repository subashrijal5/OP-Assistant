import React from "react";

const Footer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 ">
      <footer className="bg-gray-200 border-t-2 border-gray-200 dark:border-gray-700 dark:bg-gray-600 ">
        <div className="flex flex-col items-center mt-6">
        
          <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>Subash Rijal</div>
            <div> • </div>
            <div>© 2023</div>
            <div> • </div>
            <a href="https://eyemovic.com">Eyemovic Inc.</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
