// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// import VideoCard from '../../components/VideoCard';
// import NoResults from '../../components/NoResults';
// import useAuthStore from '../../store/authStore';
// import { IUser, IVideo } from '../../types';
// import { BASE_URL } from '../../utils';

// interface IProps {
//   videos: IVideo[];
// }

// const Search = ({ videos }: IProps) => {
//   const [isAccounts, setIsAccounts] = useState(true);
//   const router = useRouter();
//   const { searchTerm } = router.query;
//   const accountClasses = isAccounts
//     ? 'border-b-2 border-black'
//     : 'text-gray-400';
//   const videosClasses = !isAccounts
//     ? 'border-b-2 border-black'
//     : 'text-gray-400';
//   return (
//     <div className="w-full">
//       <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
//         <p
//           className={`text-xl font-semibold cursor-pointer mt-2 ${accountClasses}`}
//           onClick={() => setIsAccounts(true)}
//         >
//           Accounts
//         </p>
//         <p
//           className={`text-xl font-semibold cursor-pointer mt-2 ${videosClasses}`}
//           onClick={() => setIsAccounts(false)}
//         >
//           Videos
//         </p>
//       </div>
//       {isAccounts ? (
//         <div>Accounts</div>
//       ) : (
//         <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
//           {videos.length ? (
//             videos.map((video: IVideo) => (
//               <VideoCard post={video} key={video._id} />
//             ))
//           ) : (
//             <NoResults text={`No video results for ${searchTerm}`} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export const getServerSideProps = async ({
//   params: { searchTerm },
// }: {
//   params: { searchTerm: string };
// }) => {
//   const response = await axios.get(`${BASE_URL}/api/profile/${searchTerm}`);

//   return {
//     props: { videos: response.data },
//   };
// };

// export default Search;

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, IVideo } from '../../types';

const Search = ({ videos }: { videos: IVideo[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accountsClasses = isAccounts
    ? 'border-b-2 border-black'
    : 'text-gray-400';
  const videoClasses = !isAccounts
    ? 'border-b-2 border-black'
    : 'text-gray-400';
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="w-full  ">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl  font-semibold cursor-pointer ${accountsClasses} mt-2`}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${videoClasses} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user-profile"
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary lowercase">
                        {user.userName.replaceAll(' ', '')}{' '}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
          {videos.length ? (
            videos.map((post: IVideo) => (
              <VideoCard post={post} key={post._id} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
