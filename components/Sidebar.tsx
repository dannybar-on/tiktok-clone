import React from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

const Sidebar = () => {
  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start cursor-pointer font-semibold text-[#f51997] rounded';
  return (
    <div>
      <div className="lg:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 lg:border-0 p-3">
        <div className="lg:border-b-2 border-gray-200 lg:pb-4 flex">
          <Link href="/">
            <div className={normalLink}>
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="text-xl hidden lg:block">For You</span>
            </div>
          </Link>
        </div>
        <Discover />
        <SuggestedAccounts />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
