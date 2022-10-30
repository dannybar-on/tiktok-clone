import React from 'react';

import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items, mt }: { items: string[]; mt: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'} `}>
      {items.map((item) => (
        <p
          key={item}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  const lists = [footerList1, footerList2, footerList3];
  return (
    <div className="mt-6 hidden lg:block">
      {lists.map((list, idx) => (
        <List items={list} key={idx} mt={idx === 0 ? false : true} />
      ))}
      <p className="text-gray-400 text-sm mt-5">2022 TikTak</p>
    </div>
  );
};

export default Footer;
