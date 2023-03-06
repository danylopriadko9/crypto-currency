import axios from 'axios';
import React from 'react';
import './App.css';
import ReactLoading from 'react-loading';
import { useQuery } from 'react-query';

const fetchCata = async (skip = 0) => {
  const { data } = await axios.get(
    `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10&currency=USD`
  );
  return data.coins;
};

function App() {
  const [page, setPage] = React.useState(0);
  const { data, isLoading, isError } = useQuery(
    ['coins', page],
    () => fetchCata(page),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return (
      <div className='w-full h-[100vh] bg-slate-900 flex justify-center items-center'>
        <ReactLoading type={'bars'} color={'#fff'} width={100} height={100} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='w-full h-[100vh] bg-slate-900 flex justify-center items-center'>
        <h2>Error...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='w-full h-[100vh] bg-slate-900 flex justify-center items-center'>
        <h2>No data...</h2>
      </div>
    );
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 10);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 10);
    }
  };

  return (
    <div className='w-full py-[100px] bg-slate-900 flex justify-center items-center flex-col gap-5'>
      <table className='w-[50%] border-2 border-white/[0.1]'>
        <thead className='even:bg-white/[0.2] text-white/[0.5] '>
          <th className='text-left p-2 border-r-2 border-white/[0.1]'>№</th>
          <th className='text-left p-4 border-r-2 border-white/[0.1]'>Name</th>
          <th className='text-left p-4'>Price</th>
        </thead>
        {data.map((el, i) => (
          <tbody
            className='even:bg-white/[0.2] even:text-black text-white/[0.6]'
            key={i}
          >
            <td className='text-left p-4'>{el.rank}</td>
            <td className='text-left p-4 flex gap-5'>
              <img
                className='w-[20px] h-[20px]'
                src={el.icon}
                alt={el.symbol}
              />
              {el.name}
            </td>
            <td className='text-left p-4'>$ {el.price}</td>
          </tbody>
        ))}
      </table>
      <div className='inline-flex'>
        <button
          onClick={handlePrevPage}
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
