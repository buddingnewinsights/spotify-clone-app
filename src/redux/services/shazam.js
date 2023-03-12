import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', 'e507684cadmsh7fd7a73e4d6088cp12edf3jsnc68b3787dc6e');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/track' }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `search?term=${searchTerm}&limit=10` }),
    getSongsByGenre: builder.query({
      query: (genre) => `charts/track?locale=en-EN&listId=genre-global-chart-${genre}`,
    }),
    getSongDetails: builder.query({ query: ({ songid }) => `songs/get-details?key=${songid}` }),
    getSongRelated: builder.query({
      query: ({ songid }) => `charts/track?/songs/list-recommendations?key=${songid}`,
    }),
    getArtistDetails: builder.query({ query: (artistid) => `artists/get-details?id=${artistid}` }),
    getArtistTopSong: builder.query({
      query: (artistid) => `artists/get-top-songs?id=${artistid}`,
    }),
    getSongsByCountry: builder.query({ query: () => 'charts/list' }),
    getSongChartsByCountry: builder.query({
      query: (listId) => `charts/track?locale=en-EN&listId=ip-country-chart-${listId}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongQuery,
  useGetSongsByCountryQuery,
  useGetSongChartsByCountryQuery,
} = shazamApi;
