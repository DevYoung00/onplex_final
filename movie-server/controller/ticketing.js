import * as ticketingRepository from '../data/ticketing.js';
//import * as screenRepository from '../data/screen.js';
import * as nonmemberRepository from '../data/nonmember.js';
import * as memberRepository from '../data/member.js';
//import * as movieRepository from '../data/movie.js';
//import * as branchRepository from '../data/branch.js';

// 영화, 지점, 날짜 데이터 불러오기
export const getList = async (req, res) => {
  const { mov_id, branch_id, date } = req.query;
  const MovieList = await ticketingRepository.getMovieList(mov_id);
  const BranchList = await ticketingRepository.getBranchList(branch_id);
  const DateList = await ticketingRepository.getMovieList(date);

  res.send({
    success: true,
    MovieList,
    BranchList,
    DateList,
  });
};

export const getDetail = async (req, res) => {
  const { mov_id, branch_id, date } = req.query;

  const movie = await ticketingRepository.getByMovie(mov_id);
  if (!movie) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }

  const branch = await ticketingRepository.getByBranch(branch_id);
  if (!branch) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }

  const scrdate = await ticketingRepository.getByDate(date);
  if (!date) {
    return res.send({ success: false, message: 'Invalid information exists' });
  }

  res.send({
    success: true,
    movie,
    branch,
    scrdate,
  });
};

// 예매내역 불러오기
// 회원일때
export const getReservedList = async (req, res) => {
  const { movie, theater } = req.body;
  let a = req.body.seat;
  a = a.slice(1, a.length - 1);
  // a = a.replace(/'/gi, '');
  a = a.split(',');
  req.body.seat = a;
  const memberId = await memberRepository.findById(req.memberId);
  if (!memberId) {
    return res.send({ success: false, message: 'Unauthorized' });
  }
  const movieId = await ticketingRepository.findByMovId(movie);
  const branchId = await ticketingRepository.findByBranchId(theater);

  await Promise.all(
    req.body.seat.map(async (el) => {
      console.count('ticketing');
      return await ticketingRepository.getMemTicketingList({
        ...req.body,
        movie: movieId,
        theater: branchId,
        memberId,
        seat: el,
      });
    })
  );
  //   await ticketingRepository.getMemTicketingList({
  //     ...req.body,
  //     movie: movieId,
  //     theater: branchId,
  //     memberId,
  //   });
  console.log(2);
  const ticketingList = await ticketingRepository.getMemTicketingResult(
    memberId.mem_id,
    movieId.mov_id
  );
  res.send({ success: true, ticketingList });
};

// 비회원일때
export const getNonReservedList = async (req, res) => {
  const nonmemberId = await nonmemberRepository.findById(req.nonmem_id);
  if (!nonmemberId) {
    return res.send({ success: false, message: 'Unauthorized' });
  }

  const ticketingList = await ticketingRepository.getNonmemTicketingList(
    req.nonmem_id
  );
  res.send({ success: true, ticketingList });
};

export const cancel = async (req, res) => {
  const { memtkid } = req.body;
  await ticketingRepository.cancelTicketing(memtkid);
  res.send({ success: true });
};
