import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import './Cart.css';
import { Box, TextField, Button,  InputLabel } from '@mui/material';

interface CartItem {
  id: string;
  avatar: string;
  name: string;
  price: string;
}

interface FormData {
  username: string;
  address: string;
 phone: string;
}

const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    address: '',
     phone: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    axios
      .get('https://647f3ccbc246f166da9062b2.mockapi.io/muonsach')
      .then((res) => setCartItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += parseFloat(item.price);
    }
    setTotalPrice(total);
  };

  const removeItem = (itemId: string) => {
    axios
      .delete(`https://647f3ccbc246f166da9062b2.mockapi.io/muonsach/${itemId}`)
      .then(() => {
        console.log("Item removed:", itemId);
        const updatedItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedItems);
      })
      .catch((err) => console.log(err));
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Bạn cần nhập tên'),
    address: Yup.string().required('Bạn cần nhập địa chỉ'),
    phone: Yup.string().required('Bạn cần nhập số điện thoại'),
  
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Gửi thông tin của người dùng đến API tại đây
        axios
          .post('https://64731641d784bccb4a3c4073.mockapi.io/themuon/themuon', {
            username: formData.username,
            address: formData.address,
            phone: formData.phone,
            cartItems: cartItems,
          })
          .then((response) => {
            console.log('Data saved:', response.data);
            // Thực hiện các hành động khác sau khi lưu thành công vào API

            // Reset form
            setFormData({
              username: '',
              address: '',
              phone:'',
            });
            setCartItems([]);
            setErrors({});
          })
          .catch((error) => {
            console.log('Error:', error);
            // Xử lý lỗi nếu có
          });
      })
      .catch((validationErrors) => {
        const errors: Partial<FormData> = {};
        validationErrors.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setErrors(errors);
      });
  };

  return (
    <>
     
      <div className='cart-container'>
        <div className="cart">
          <h2 style={{ textAlign: 'center' }}>Danh sách đơn hàng</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
               
                <div className="name-cart">{item.name}</div>
                <div className="cart-price">{item.price}</div>
                <button className="cart-button" onClick={() => removeItem(item.id)}>
                 Xóa
                </button>
              </li>
            ))}
          </ul>
        
          <h2 style={{ marginLeft: '450px' }}>Tổng tiền: {totalPrice}</h2>
        </div>
        <div className="form-container">
          <h2 style={{ textAlign: 'center' }}>Thông tin</h2>
          <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '350px' },
  }}
  noValidate
  autoComplete="off"
  onSubmit={handleSubmit}
>
  <div className="form-group">
    <TextField
      required
      id="username"
      name="username"
      label="Tên người dùng"
      value={formData.username}
      onChange={handleChange}
    />
    {errors.username && <div className="error">{errors.username}</div>}
  </div>
  <div className="form-group">
    <TextField
      required
      id="address"
      name="address"
      label="Địa chỉ"
      value={formData.address}
      onChange={handleChange}
    />
    {errors.address && <div className="error">{errors.address}</div>}
  </div>
  <div className="form-group">
  <TextField
  required
  id="phone"
  name="phone"
  label="Số điện thoại"
  value={formData.phone}
  onChange={handleChange}
  InputLabelProps={{
  }}
/>
  </div>
  <div className="borrow-button-container">
  <button className="borrow-button" type="submit">Thanh toán</button>
</div>
</Box>
        </div>
      </div>
    </>
  );
};

export default Cart;
