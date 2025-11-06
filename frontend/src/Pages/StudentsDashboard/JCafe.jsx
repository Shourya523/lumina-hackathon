import React, { useState } from "react";
import "./JCafe.css";
import SideBarStudent from "../../components/SideBar-student";
import Header from "../../components/Header";
import { ShoppingCart, CheckCircle } from "lucide-react";

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

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);

    // You can later replace with backend notification
    setTimeout(() => {
      alert("✅ Your order is ready! Please collect from JCafe counter.");
      setOrderPlaced(false);
    }, 60000); // Notification after 60s (1 min)
  };

  return (
    <div className="jcafe-layout">
      <SideBarStudent activePage={"jcafe"} />

      <main className="main-content">
        <Header title="JCafe" subtitle="Skip the queue, order ahead." />

        <div className="jcafe-content">
          <div className="jcafe-menu-grid">
            {menuItems.map((item, index) => (
              <div key={index} className="jcafe-item-card">
                <h2>{item.name}</h2>
                <p className="jcafe-desc">{item.desc}</p>
                <div className="jcafe-bottom">
                  <span className="jcafe-price">₹{item.price}</span>
                  <button className="jcafe-add-btn" onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="jcafe-cart">
            <h3><ShoppingCart size={18} /> Cart</h3>

            {cart.length === 0 ? (
              <p className="jcafe-empty">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <p key={idx} className="jcafe-cart-item">{item.name} - ₹{item.price}</p>
                ))}

                <button className="jcafe-order-btn" onClick={placeOrder}>
                  Place Order
                </button>
              </>
            )}

            {orderPlaced && (
              <div className="jcafe-status">
                <CheckCircle size={18} />
                <p>Your order is being prepared...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
