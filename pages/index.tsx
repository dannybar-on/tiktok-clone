import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { IVideo } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils';

interface IProps {
  videos: IVideo[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: IVideo) => (
          <VideoCard post={video} key={video._id} isShowingOnHome />
        ))
      ) : (
        <NoResults text={'No Videos'} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { topic },
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
