import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import IconButton from '@mui/material/IconButton';
import StyledBadge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Avatar} from '@mui/material';
import './Header.css';

interface HeaderProps {
  badgeCount: number;
  addToCart: (item: any) => void;
}

function Header({ badgeCount, addToCart }: HeaderProps) {
  const user = useSelector((store: RootState) => store.user);

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <h3>Thư Viện</h3>
          </Link>
        </div>
        <div>
          <Link to="/cart" style={{textDecoration:'none'}}>
              <IconButton aria-label="cart" >
                <StyledBadge badgeContent={badgeCount} color="secondary" >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
               Giỏ hàng
          </Link>
        </div>

        <div className="sign-up">
          {user?.username ? (
            <>
              <div className="dropdown" >
                <Avatar src="/broken-image.jpg" />
                <p>{user.username}</p>
                <div className="dropdown-content">
                 
                    <button className="Header-button">Sửa thông tin</button>
                

                  <button className="Header-button" onClick={handleReloadPage}>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="sign-in">Đăng nhập</button>
              </Link>
            </>
          )}
        </div>
        <br />
      </div>
    </div>
  );
}

export default Header;
