import React, { useState, useEffect } from "react";
import "./JCafe.css";
import SideBarStudent from "../../components/SideBar-student";
import Header from "../../components/Header";
import { ShoppingCart, CheckCircle, X } from "lucide-react";
import qrImage from "../../assets/qr.jpg";

const menuItems = [
  { name: "Veg Samosa", price: 15, desc: "Crispy fried pastry with a spiced potato filling." },
  { name: "Vada Pav", price: 25, desc: "Mumbai style potato patty in pav." },
  { name: "Veg Thali", price: 80, desc: "Dal, sabzi, roti, rice & salad." },
  { name: "Chai", price: 10, desc: "Hot refreshing tea." },
  { name: "Coffee", price: 20, desc: "Strong and bold." },
];

export default function JCafe() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(120);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.name === item.name);
      if (exist) {
        return prev.map((x) =>
          x.name === item.name ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter((item) => item.name !== itemName));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const openPaymentPopup = () => {
    if (cart.length === 0) return;
    setShowPopup(true);
    setTimer(120);
  };

  useEffect(() => {
    if (!showPopup) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowPopup(false);
          placeOrder();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showPopup]);

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);

    setTimeout(() => {
      alert("✅ Your order is ready! Please collect it at the JCafe counter.");
      setOrderPlaced(false);
    }, 60000);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="cafe-layout">
      <SideBarStudent activePage={"jcafe"} />

      <main className="cafe-main-content">
        <Header title="JCafe" subtitle="Skip the queue, order ahead." />

        <div className="cafe-content">
          <div className="cafe-menu-grid">
            {menuItems.map((item, index) => (
              <div key={index} className="cafe-item-card">
                <h2>{item.name}</h2>
                <p className="cafe-item-desc">{item.desc}</p>
                <div className="cafe-item-bottom">
                  <span className="cafe-item-price">₹{item.price}</span>
                  <button className="cafe-add-button" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cafe-cart-container">
            <h3><ShoppingCart size={18} /> Cart</h3>

            {cart.length === 0 ? (
              <p className="cafe-cart-empty">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <div key={idx} className="cafe-cart-item">
                    <span>{item.name} x {item.qty} — ₹{item.price * item.qty}</span>
                    <button className="cafe-remove-button" onClick={() => removeFromCart(item.name)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <div className="cafe-cart-total">Total: ₹{totalPrice}</div>

                <button className="cafe-order-button" onClick={openPaymentPopup}>
                  Place Order
                </button>
              </>
            )}

            {orderPlaced && (
              <div className="cafe-order-status">
                <CheckCircle size={18} />
                <p>Your order is being prepared...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showPopup && (
        <div className="cafe-popup-overlay">
          <div className="cafe-popup-box">
            <button className="cafe-popup-close-button" onClick={closePopup}><X size={20} /></button>

            <h2>Scan to Pay</h2>
            <p>Total: ₹{totalPrice}</p>

            <img src={qrImage} alt="QR Code" className="cafe-qr-image" />

            <p className="cafe-popup-timer">
              Time Remaining: <strong>{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}