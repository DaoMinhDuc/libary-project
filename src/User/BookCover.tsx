import React from 'react';

interface BookCoverProps {
  bookImages: string[];
}

const BookCover: React.FC<BookCoverProps> = ({ bookImages }) => {
  return (
    <div className="book-cover-container">
      {bookImages.map((image, index) => (
        <img key={index} src={image} alt={`Book Cover ${index}`} className="book-cover" />
      ))}
    </div>
  );
};

export default BookCover;
