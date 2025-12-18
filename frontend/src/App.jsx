import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* ---------- FRONT PAGE ---------- */
function FrontPage() {
  const navigate = useNavigate();
  return (
    <div className="front">
      <div className="front-card">
        <h1>🍔 Food Delivery App</h1>
        <p>Order your favorite food anytime, anywhere</p>
        <button onClick={() => navigate("/login")}>
          Login / Register
        </button>
      </div>
    </div>
  );
}

/* ---------- LOGIN / REGISTER ---------- */
function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/restaurants");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to Foodie 🍽️</h1>
        <div className="toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" required />
          {!isLogin && <input type="email" placeholder="Email" required />}
          <input type="password" placeholder="Password" required />
          <button className="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- RESTAURANTS ---------- */
function RestaurantPage() {
  const navigate = useNavigate();
  const restaurants = [
    {
      id: 1,
      name: "Spicy Treat",
      cuisine: "South Indian",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },
    {
      id: 2,
      name: "Burger Hub",
      cuisine: "Fast Food",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: 3,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1548365328-9c79f6d2d1c6",
    },
  ];

  return (
    <div className="page">
      <h1 className="heading">Choose Your Restaurant 🍕</h1>
      <div className="grid">
        {restaurants.map((res) => (
          <div className="card-rest" key={res.id}>
            <img src={res.image} />
            <div className="card-body">
              <h2>{res.name}</h2>
              <p>{res.cuisine}</p>
              <span>⭐ {res.rating}</span>
              <button onClick={() => navigate("/menu")}>
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- MENU PAGE ---------- */
function MenuPage({ cart, setCart }) {
  const menu = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1626776871350-ec8b9a9bbf61",
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      price: 160,
      image:
        "https://images.unsplash.com/photo-1604908177522-0400b8c4c5ef",
    },
    {
      id: 3,
      name: "Veg Fried Rice",
      price: 140,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f3a33f9b6",
    },
    {
      id: 4,
      name: "Chicken Burger",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
  ];

  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="menu-page">
      <h1 className="heading">🍽️ Menu</h1>
      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.image} />
            <h2>{item.name}</h2>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <button className="cart-button" onClick={() => navigate("/cart")}>
          Go to Cart ({cart.length})
        </button>
      )}
    </div>
  );
}

/* ---------- CART PAGE ---------- */
function CartPage({ cart, setCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="cart-page">
      <h1 className="heading">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img src={item.image} />
                <h2>{item.name}</h2>
                <p>₹{item.price}</p>
                <button onClick={() => removeItem(idx)}>Remove</button>
              </div>
            ))}
          </div>
          <h2 className="total">Total: ₹{total}</h2>
          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

/* ---------- CHECKOUT PAGE ---------- */
function CheckoutPage({ cart, setCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    navigate("/order-tracking");
    setCart([]);
  };

  return (
    <div className="checkout-page">
      <h1 className="heading">💳 Checkout</h1>
      <div className="checkout-items">
        {cart.map((item, idx) => (
          <div className="checkout-item" key={idx}>
            <h2>{item.name}</h2>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
      <h2 className="total">Total: ₹{total}</h2>
      <button className="checkout-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

/* ---------- ORDER TRACKING ---------- */
function OrderTracking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const steps = ["Preparing", "Out for Delivery", "Delivered"];

  useEffect(() => {
    if (step < steps.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="order-page">
      <h1 className="heading">🚚 Order Status</h1>
      <div className="steps">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`step ${idx <= step ? "active" : ""}`}
          >
            {s}
          </div>
        ))}
      </div>
      {step === steps.length - 1 && (
        <button onClick={() => navigate("/")}>Back to Home</button>
      )}
    </div>
  );
}

/* ---------- LEADERBOARD ---------- */
function Leaderboard() {
  const [restaurants, setRestaurants] = useState([
    { name: "Pizza Palace", rating: 4.6 },
    { name: "Spicy Treat", rating: 4.5 },
    { name: "Burger Hub", rating: 4.3 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRestaurants((prev) => {
        return prev.map((r) => ({
          ...r,
          rating: (r.rating + Math.random() * 0.2 - 0.1).toFixed(1),
        })).sort((a, b) => b.rating - a.rating);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard-page">
      <h1 className="heading">🏆 Top Restaurants</h1>
      <div className="leaderboard-grid">
        {restaurants.map((res, idx) => (
          <div key={idx} className="leaderboard-card">
            <h2>{res.name}</h2>
            <p>⭐ {res.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
function App() {
  const [cart, setCart] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/restaurants" element={<RestaurantPage />} />
      <Route path="/menu" element={<MenuPage cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
