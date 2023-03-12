import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery, useGetArtistTopSongQuery } from '../redux/services/shazam';

const ArtistDetails = () => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  const {
    data: relatedSongData,
    isFetching: isFetchingArtistTopSong,
  } = useGetArtistTopSongQuery(artistId);

  if (isFetchingArtistDetails && isFetchingArtistTopSong) return <Loader title="Loading Artist Details" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={relatedSongData?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
