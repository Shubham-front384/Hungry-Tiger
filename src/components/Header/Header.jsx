import { Menu, ShoppingBasket, X, Instagram } from 'lucide-react';
import './Header.scss';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);

  const isOpen = () => {
    setOpen(prev => !prev);
  }

  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={isOpen}>
          {
            open ? <X /> : <Menu />
          }
          <span>
            {
              open ? 'close' : 'menu'
            }
          </span>
        </button>

        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <nav className="desktop-link">
            <a href="#">home</a>
            <a href="#">sauce</a>
            <a href="#">recipes</a>
            <a href="#">about</a>
            <a href="#">contact</a>
            <a href="#">game</a>
          </nav>

          <div className="bottom-link">
            <div className="bottom-link-menu">
              <a href="#">
                where to buy
              </a>
              <a href="#">
                contact information
              </a>
            </div>
            <div className="location_email">
              <div className="email-info">
                <a href="#">
                  ocala, fl 34471, usa
                </a>
                <a href="#">
                  info@eathungrytiger.com
                </a>
              </div>
              <div className="insta-icon">
                <a href="#">
                  <Instagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-mid">
        <img src="/logo.svg" alt="logo-img" />
      </div>

      <div className="nav-right">
        <a href="#" className="contact-btn">
          contact
        </a>

        <button className="buy-btn">
          buy now
          <ShoppingBasket />
        </button>
      </div>
    </header>
  );
};

export default Header;
