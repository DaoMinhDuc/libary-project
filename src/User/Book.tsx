import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import SearchIcon from '@mui/icons-material/Search';
import BookCover from './BookCover';
import './Book.css';

function Book() {
  const [listBook, setListBook] = useState<any[]>([]);
  const [badgeCount, setBadgeCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    axios
      .get('https://6469ffaa03bb12ac20975da5.mockapi.io/book')
      .then((res) => setListBook(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const storedBadgeCount = sessionStorage.getItem('badgeCount');
    if (storedBadgeCount) {
      setBadgeCount(Number(storedBadgeCount));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('badgeCount', String(badgeCount));
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, [badgeCount]);

  const addToCart = (item: any) => {
    axios
      .post('https://647f3ccbc246f166da9062b2.mockapi.io/muonsach', item)
      .then((res) => {
        console.log('Item added to cart:', res.data);
        setBadgeCount((prevCount) => prevCount + 1);
      })
      .catch((err) => console.log(err));
  };

  const filteredListBook = listBook.filter((item) => {
    const { name, description, price } = item;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseSearchTerm) ||
      description.toLowerCase().includes(lowerCaseSearchTerm) ||
      price.toString().includes(lowerCaseSearchTerm)
    );
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Xác định kích thước màn hình dưới 768px là điện thoại
    };

    checkIsMobile(); // Kiểm tra kích thước màn hình ban đầu

    window.addEventListener('resize', checkIsMobile); // Thêm sự kiện kiểm tra kích thước màn hình khi có sự thay đổi

    return () => {
      window.removeEventListener('resize', checkIsMobile); // Gỡ bỏ sự kiện khi component bị hủy
    };
  }, []);

  const bookCoverImages = [
    'dist/assets/Tiếng Anh.jpg',
    'dist/assets/Văn.jpg',
   'dist/assets/Tiếng Anh.jpg',
   'dist/assets/Văn.jpg',
   'dist/assets/Địa Lý.jpg',
   'dist/assets/Công nghệ.jpg',
   'dist/assets/GDCD.jpg',
   'dist/assets/Hình Học.jpg',
   'dist/assets/Sinh Học.jpg',
   'dist/assets/Tiếng Anh.jpg',
   'dist/assets/Văn.jpg',
   'dist/assets/Địa Lý.jpg',
   'dist/assets/Công nghệ.jpg',
   'dist/assets/GDCD.jpg',
   'dist/assets/Hình Học.jpg',
   'dist/assets/Sinh Học.jpg',
   'dist/assets/Tiếng Anh.jpg',
   'dist/assets/Văn.jpg',
   'dist/assets/Địa Lý.jpg',
   'dist/assets/Công nghệ.jpg',
   'dist/assets/GDCD.jpg',
   'dist/assets/GDCD.jpg',
  ];
  return (
    <>
      {!isMobile && <Header badgeCount={badgeCount} addToCart={addToCart} />} {/* Ẩn Header nếu đang sử dụng trên điện thoại */}
      <div className="left-tab">
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm ..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button style={{ backgroundColor: '#509dd1', border: 'none' }}>
            <SearchIcon style={{ color: 'white' }}></SearchIcon>
          </button>
        </div>
        <div className="tab-container">
          <button className="tab-button">Sách giáo khoa</button>
          <button className="tab-button">Truyện Tranh</button>
          <button className="tab-button">Tiểu thuyết</button>
          <button className="tab-button">Tài liệu tham khảo</button>
        </div>
      </div>
      <div className="book-container">
        {filteredListBook.map((item, index) => (
          <div key={item.id} className="card-container">
            <div className="card">
              <div className="avatar">
              <img src={bookCoverImages[item.id]} alt="Book Cover" />
              </div>
              <div className="info">
                <div className="nameBook">{item.name}</div>
                <div className="description">{item.description}</div>
                <div className="price">{item.price}</div>
              </div>
              <button className="Book-Button" onClick={() => addToCart(item)}>
                Mượn sách
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Book;
