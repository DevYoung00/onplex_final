import * as movieRepository from '../data/movie.js';
import * as screenRepository from '../data/screen.js';

export const getList = async (req, res) => {
  const { addressCode, date, depth } = req.query;

  const movieList = await movieRepository.getList();
  if (!depth || parseInt(depth) === 1) {
    return res.send({
      success: true,
      movieList,
    });
  }
  await Promise.all(
    movieList.map(
      async (el) =>
        (el.screenList = await screenRepository.getByMovieId(
          el.id,
          addressCode,
          date
        ))
    )
  );
  res.send({
    success: true,
    movieList,
  });
};

export const getReview = async (req, res) => {
  const movieReview = await movieRepository.getReview();
  res.send({
    success: true,
    movieReview,
  });
};

export const getRank = async (req, res) => {
  const movie = await movieRepository.getRankMovie();
  const review = await movieRepository.getRankReview();
  res.send({
    success: true,
    movie,
    review,
  });
};
