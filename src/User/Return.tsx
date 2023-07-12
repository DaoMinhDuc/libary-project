import { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Return.css';

function ReturnBook() {
  const [returnItems, setReturnItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('https://64731641d784bccb4a3c4073.mockapi.io/themuon/themuon')
      .then(res => setCartItems(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleCheckboxChange = (itemId: string) => {
    const isChecked = returnItems.includes(itemId);
    if (isChecked) {
      const updatedItems = returnItems.filter(item => item !== itemId);
      setReturnItems(updatedItems);
    } else {
      setReturnItems([...returnItems, itemId]);
    }
  };

  const handleReturn = () => {
    for (const itemId of returnItems) {
      axios
        .delete(`https://64731641d784bccb4a3c4073.mockapi.io/themuon/themuon/${itemId}`)
        .then(() => {
          console.log("Item returned:", itemId);
          const updatedItems = cartItems.filter(item => item.id !== itemId);
          setCartItems(updatedItems);
        })
        .catch(err => console.log(err));
    }
    setReturnItems([]);
  };
  const handleReturnAll = () => {
    const allItemIds = cartItems.map(item => item.id);
    setReturnItems(allItemIds);
  };
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="return">
        <h1 style={{ textAlign: 'center' }}> Trả Sách</h1>
        <button style={{ marginLeft: '1100px' }} className="cart-button" onClick={handleReturnAll}>
            Trả tất cả
          </button>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="return-avatar">{item.avatar}</div>
              <div className="name-return">{item.name}</div>
              <div className="return-price">{item.price}</div>
              <div> <input
                type="checkbox"
                checked={returnItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              /><p>Trả sách</p></div>
             
            </li>
          ))}
        </ul>
        
        <button className="return-button" onClick={handleReturn}>
          Trả sách
        </button>
      </div>
    </>
  );
}

export default ReturnBook;
