import heroImg from "./spin.png";
import "./App.css";
import logo from "./logo.png";

/* IMAGES */
import cone from "./Cone.jpg";
import cone2 from "./cone2.jpg";

import chain from "./Chain.jpg";
import chain2 from "./Chain2.jpg";

import flexicube from "./Flexicube.jpg";
import flexicube2 from "./Flexicube2.jpeg";

import twisters from "./twisters.jpg";
import twisters2 from "./Twisters2.jpg";

import infinity from "./infinity.jpg";
import infinity2 from "./infinty2.jpg";
import infinity3 from "./infinty3.jpg";

import hexagon from "./hexagon.jpg";
import hexagon2 from "./hexagon2.jpg";

import katana from "./katana.jpg";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* PRODUCTS */
const products = [
  {
    id: 0,
    name: "Flexi-Cube",
    price: "10.99 $CA",
    desc: "A smooth, flexible cube designed for endless folding and stress relief.",
    images: [flexicube, flexicube2],
    link: "https://buy.stripe.com/14AaEX9l8bll5tf6Ch0Ny04"
  },
  {
    id: 1,
    name: "Fidget Chain",
    price: "4.99 $CA",
    desc: "Click, twist, and relax with this satisfying chain fidget.",
    images: [chain, chain2],
    link: "https://buy.stripe.com/5kQfZhcxk6117Bn1hX0Ny05"
  },
  {
    id: 2,
    name: "Collapsing Sword",
    price: "24.99 $CA",
    desc: "Extendable katana-style fidget toy.",
    images: [katana],
    link: "https://buy.stripe.com/14AbJ1btg0GH4pb9Ot0Ny0b"
  },
  {
    id: 3,
    name: "The Twister",
    price: "18.99 $CA",
    desc: "Spin and twist endlessly.",
    images: [twisters, twisters2],
    link: "https://buy.stripe.com/00waEXcxk3STdZLgcR0Ny07"
  },
  {
    id: 4,
    name: "Hexagon Fidget",
    price: "18.99 $CA",
    desc: "Geometric satisfying movement.",
    images: [hexagon, hexagon2],
    link: "https://buy.stripe.com/eVq9AT40O6118Fr1hX0Ny08"
  },
  {
    id: 5,
    name: "Fidget Cone",
    price: "7.99 $CA",
    desc: "Simple spinning cone.",
    images: [cone, cone2],
    link: "https://buy.stripe.com/fZudR968W0GHcVH7Gl0Ny0c"
  },
  {
    id: 6,
    name: "Infinity Cube",
    price: "9.99 $CA",
    desc: "Classic folding cube.",
    images: [infinity, infinity2, infinity3],
    link: "https://buy.stripe.com/6oU8wPapc9dd5tfbWB0Ny0a"
  }
];

/* NAVBAR */
function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <img src={logo} className="logoImg" />

      <div className="navLinks">
        <a onClick={() => scrollTo("home")}>Home</a>
        <a onClick={() => scrollTo("shop")}>Shop</a>
        <a onClick={() => scrollTo("contact")}>Contact</a>
      </div>
    </motion.nav>
  );
}

/* HOME */
function Home() {
  const navigate = useNavigate();

  return (
    <div id="home">
      <Navbar />

      <section className="heroBig">
  <div className="heroText">
    <h1>FidgetLoop</h1>
    <p>Premium 3D printed fidget toys.</p>


<button onClick={() =>
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
}>
  Shop Now
</button>


  </div>

  <img src={heroImg} className="heroImg" alt="hero" />
</section>


      <section className="grid" id="shop">
        {products.map((p) => (
          <motion.div
            className="card"
            key={p.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img src={p.images[0]} />
            <h2>{p.name}</h2>
            <p>{p.desc}</p>
            <div className="price">{p.price}</div>
          </motion.div>
        ))}
      </section>

      <footer className="footer" id="contact">
        <h2>Contact</h2>
        <a href="mailto:fidgetloop.support@gmail.com" className="emailLink">
          fidgetloop.support@gmail.com
        </a>
        <p>© 2026 FidgetLoop</p>
      </footer>
    </div>
  );
}

/* PRODUCT PAGE (CLEAN GALLERY WITH ARROWS + DOTS) */
function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [index, setIndex] = useState(0);

  if (!product) return <div>Product not found</div>;

  const next = () =>
    setIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));

  const prev = () =>
    setIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

  return (
    <motion.div
      className="productPage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="backBtn" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="productContainer">

        <div className="productImage">

          <div className="imageWrapper">

            <button className="arrow left" onClick={prev}>‹</button>

            <img
              src={product.images[index]}
              className="mainImg"
              alt={product.name}
            />

            <button className="arrow right" onClick={next}>›</button>

          </div>

          <div className="dots">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={i === index ? "dot active" : "dot"}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

        </div>

        <div className="productInfo">
          <h1>{product.name}</h1>
          <p className="desc">{product.desc}</p>
          <h2 className="priceBig">{product.price}</h2>

          <button
            className="buyBig"
            onClick={() => (window.location.href = product.link)}
          >
            Buy Now 💳
          </button>
        </div>

      </div>
    </motion.div>
  );
}

/* APP */
export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}