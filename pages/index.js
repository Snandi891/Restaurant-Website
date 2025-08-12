// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import CategorySection from "@/components/categories";
import AboutSection from "@/components/Introduction";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  // ---------------- Booking Form States ----------------
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const handleBookingChange = (e) => {
    setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
  };

  const sendBookingWhatsApp = () => {
    const { name, phone, date, time, guests } = bookingFormData;
    if (!name || !phone || !date || !time || !guests) {
      alert("Please fill all fields before sending.");
      return;
    }
    const message = `✧ *New Table Booking* ✧\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Time:* ${time}\n*Guests:* ${guests}\n✧ _Thank you for choosing DelishBite!_`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "918918960117"; // <-- UPDATED HERE
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    setBookingFormData({ name: "", phone: "", date: "", time: "", guests: "" });
    setShowBookingForm(false);
  };

  const handleBookingCancel = () => {
    setBookingFormData({ name: "", phone: "", date: "", time: "", guests: "" });
    setShowBookingForm(false);
  };

  // ---------------- Order Form States ----------------
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    dish: "",
    price: 0,
    quantity: 1,
    name: "",
    address: "",
    phone: "",
    time: "",
  });
  const [errors, setErrors] = useState({});

  const totalPrice = orderFormData.price * orderFormData.quantity;

  const handleOrderChange = (e) => {
    setOrderFormData({ ...orderFormData, [e.target.name]: e.target.value });
  };

  const validateOrderForm = () => {
    let newErrors = {};
    if (!orderFormData.name.trim()) newErrors.name = "Name is required.";
    if (!orderFormData.address.trim())
      newErrors.address = "Address is required.";
    if (!orderFormData.phone.trim()) newErrors.phone = "Phone is required.";
    if (!orderFormData.time) newErrors.time = "Preferred time is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOrderWhatsApp = () => {
    if (!validateOrderForm()) return;
    const { dish, price, quantity, name, address, phone, time } = orderFormData;
    const message = `✧ *New Order* ✧\n\n*Dish:* ${dish}\n*Price per item:* ₹${price}\n*Quantity:* ${quantity}\n*Total:* ₹${
      price * quantity
    }\n*Name:* ${name}\n*Address:* ${address}\n*Phone:* ${phone}\n*Preferred Time:* ${time}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "918918960117"; // <-- UPDATED HERE
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    setOrderFormData({
      dish: "",
      price: 0,
      quantity: 1,
      name: "",
      address: "",
      phone: "",
      time: "",
    });
    setShowOrderForm(false);
  };

  const handleOrderCancel = () => {
    setOrderFormData({
      dish: "",
      price: 0,
      quantity: 1,
      name: "",
      address: "",
      phone: "",
      time: "",
    });
    setShowOrderForm(false);
  };

  // ---------------- Page Content ----------------
  const dishes = [
    { title: "Grilled Chicken", image: "/dish1.jpg", price: 120 },
    { title: "Pasta Alfredo", image: "/dish2.jpg", price: 120 },
    { title: "Chocolate Lava Cake", image: "/dish3.jpg", price: 120 },
  ];

  return (
    <>
      <Head>
        <title>DelishBite - Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white text-gray-800">
        {/* Hero */}
        <section className="min-h-[75vh] md:h-screen bg-[url('/restaurant.jpg')] bg-cover bg-center flex items-center justify-end text-white relative rounded-b-[80px] overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-56 bg-gradient-to-t from-black via-red-900/60 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-black/90 blur-2xl pointer-events-none"></div>

          {/* Header */}
          <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-4 md:px-16 py-4 md:py-6 bg-black/40 backdrop-blur-md">
            <h1 className="text-lg md:text-2xl font-bold text-yellow-500">
              DelishBite
            </h1>
            <nav className="space-x-2 md:space-x-6 hidden md:block">
              {[
                "Home",
                "About",
                "Menu",
                "Events",
                "Contact",
                "Reservations",
              ].map((item, i) => (
                <Link
                  key={i}
                  href={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="hover:text-yellow-500 transition duration-300 text-sm md:text-base px-2 py-2"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </header>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center px-4 md:px-16 w-full justify-end">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-right max-w-xl w-full md:w-auto md:pr-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                A Premium <br /> And Authentic <br />{" "}
                <span className="text-yellow-500">Steakhouse</span>
              </h2>
              <button
                onClick={() => setShowBookingForm(true)}
                className="mt-6 md:mt-8 bg-white text-black px-6 py-3 rounded shadow-md hover:bg-yellow-500 hover:text-white transition duration-300 text-sm md:text-base"
              >
                Book A Table
              </button>
            </motion.div>
          </div>

          {/* Booking Modal */}
          {showBookingForm && (
            <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-md flex justify-center items-center z-50 px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative bg-white/20 backdrop-blur-2xl border border-yellow-400 rounded-2xl p-8 w-full max-w-lg"
              >
                <h3 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
                  🍽️ Book A Table
                </h3>
                {/* Form Fields */}
                <input
                  name="name"
                  placeholder="Name"
                  value={bookingFormData.name}
                  onChange={handleBookingChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={bookingFormData.phone}
                  onChange={handleBookingChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <input
                  type="date"
                  name="date"
                  value={bookingFormData.date}
                  onChange={handleBookingChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <input
                  type="time"
                  name="time"
                  value={bookingFormData.time}
                  onChange={handleBookingChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <input
                  name="guests"
                  placeholder="Guests"
                  value={bookingFormData.guests}
                  onChange={handleBookingChange}
                  className="w-full mb-6 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <div className="flex gap-3">
                  <button
                    onClick={sendBookingWhatsApp}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Send via WhatsApp
                  </button>
                  <button
                    onClick={handleBookingCancel}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </section>

        {/* Menu Section */}
        <section className="animated-lightgold-bg">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <CategorySection />
          </motion.div>

          <motion.section
            className="py-16 px-4 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Popular Dishes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {dishes.map((dish, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="shadow-lg rounded overflow-hidden bg-white/70 backdrop-blur"
                >
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {dish.title}
                    </h3>
                    <p className="text-yellow-600 font-bold">₹{dish.price}</p>
                    <button
                      onClick={() => {
                        setOrderFormData({
                          ...orderFormData,
                          dish: dish.title,
                          price: dish.price,
                          quantity: 1,
                        });
                        setShowOrderForm(true);
                      }}
                      className="mt-3 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded hover:opacity-90"
                    >
                      Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <AboutSection />
        </section>

        {/* Order Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-start z-50 px-4 overflow-y-auto py-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white/10 backdrop-blur-xl border border-yellow-400 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
                🛒 Order Form
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendOrderWhatsApp();
                }}
              >
                <input
                  type="text"
                  value={orderFormData.dish}
                  readOnly
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <input
                  type="text"
                  value={`₹${orderFormData.price}`}
                  readOnly
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <select
                  name="quantity"
                  value={orderFormData.quantity}
                  onChange={handleOrderChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q} className="text-black">
                      {q}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={`₹${totalPrice}`}
                  readOnly
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                <input
                  name="name"
                  placeholder="Your Name"
                  value={orderFormData.name}
                  onChange={handleOrderChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mb-4">{errors.name}</p>
                )}
                <textarea
                  name="address"
                  placeholder="Your Address"
                  value={orderFormData.address}
                  onChange={handleOrderChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mb-4">{errors.address}</p>
                )}
                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={orderFormData.phone}
                  onChange={handleOrderChange}
                  className="w-full mb-4 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mb-4">{errors.phone}</p>
                )}
                <input
                  type="time"
                  name="time"
                  value={orderFormData.time}
                  onChange={handleOrderChange}
                  className="w-full mb-6 p-3 rounded bg-white/10 border border-white/30 text-white"
                />
                {errors.time && (
                  <p className="text-red-400 text-sm mb-4">{errors.time}</p>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Send via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleOrderCancel}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <motion.footer
          className="bg-black text-white py-6 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p>
            &copy; {new Date().getFullYear()} DelishBite. All rights reserved.
          </p>
        </motion.footer>
      </main>

      <style jsx>{`
        @keyframes lightGoldGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animated-lightgold-bg {
          background: linear-gradient(
            120deg,
            #ffffff,
            #fffde7,
            #fff9c4,
            #fffde7,
            #ffffff
          );
          background-size: 300% 300%;
          animation: lightGoldGradient 14s ease-in-out infinite;
          padding: 2rem 0;
        }
      `}</style>
    </>
  );
}
