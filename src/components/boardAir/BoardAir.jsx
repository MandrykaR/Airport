import React from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';

const BoardAir = () => {
  return (
    <main>
      <div className="container">
        <Search />
        <BoardContent />
      </div>
    </main>
  );
};

export default BoardAir;
