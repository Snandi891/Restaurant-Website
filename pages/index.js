import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const RestaurantWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Animation for sections on scroll
      sectionsRef.current.forEach((section) => {
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionBottom = section.getBoundingClientRect().bottom;
          const isVisible =
            sectionTop < window.innerHeight - 100 && sectionBottom > 0;

          if (isVisible) {
            section.classList.add("animate-fade-in-up");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-white/70 shadow-lg py-2"
            : "backdrop-blur-sm bg-white/10 py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className={`text-3xl font-extrabold tracking-wide flex items-center drop-shadow-lg ${
                isScrolled ? "text-green-600" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 animate-pulse"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              GreenLeaf
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {["Home", "About", "Menu", "Categories", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative text-lg font-medium transition-colors duration-300 group ${
                  isScrolled ? "text-black" : "text-white"
                } hover:text-green-600`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Reservation Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              Reserve Table
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`w-8 h-0.5 my-1.5 transition-all duration-300 ${
                isScrolled ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "transform rotate-45 translate-y-2" : ""}`}
            ></div>
            <div
              className={`w-8 h-0.5 my-1.5 transition-all duration-300 ${
                isScrolled ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></div>
            <div
              className={`w-8 h-0.5 my-1.5 transition-all duration-300 ${
                isScrolled ? "bg-gray-800" : "bg-white"
              } ${isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""}`}
            ></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden backdrop-blur-md bg-white/90 shadow-xl absolute top-0 left-0 w-full h-screen transition-all duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="container mx-auto px-6 pt-24 pb-10 flex flex-col items-center justify-center h-full">
            <div className="flex flex-col space-y-10 text-center">
              {[
                "Home",
                "About",
                "Menu",
                "Categories",
                "Gallery",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-semibold text-gray-900 hover:text-green-600 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Reserve Button (Mobile) */}
            <button className="mt-16 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md">
              Reserve Table
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen rounded-b-xl flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-green-900 opacity-60"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 animate-zoom-in"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
          }}
        ></div>

        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">
            GreenLeaf
          </h1>
          <p className="text-xl md:text-3xl mb-8 max-w-3xl mx-auto animate-fade-in-up delay-300">
            Experience the art of plant-based dining in an elegant atmosphere
          </p>

          {/* button */}

          <div className="animate-fade-in-up delay-500 flex justify-center items-center mt-10">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Reserve Table Button */}
              <button
                onClick={() => setShowBookingForm(true)}
                className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-5 px-12 rounded-full transition-all duration-500 transform hover:scale-110 shadow-xl hover:shadow-green-500/50"
              >
                {/* Ripple Effect */}
                <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></span>

                {/* Glow Ring */}
                <span className="absolute inset-0 border-2 border-green-300/40 rounded-full animate-ping opacity-0 group-hover:opacity-100"></span>

                {/* Button Text */}
                <span className="relative z-10 flex items-center justify-center">
                  Reserve a Table
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-125"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              {/* View Menu Button */}
              <button className="relative overflow-hidden group border-2 border-teal-500 text-teal-600 font-bold py-5 px-12 rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-teal-500/40">
                {/* Gradient Fill Slide Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 w-0 transition-all duration-500 group-hover:w-full -z-10"></span>

                {/* Ripple Effect */}
                <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></span>

                {/* Text */}
                <span className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-500">
                  View Menu
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-125"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

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

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current[0] = el)}
        className="py-24 bg-gray-50 opacity-0 transition-all duration-700"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-16 md:mb-0">
              <div className="relative">
                <div className="w-4/5 mx-auto transform hover:scale-105 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Vegetarian dishes"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 w-2/5 z-10 transform hover:scale-105 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    alt="Fresh vegetables"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-8 -right-8 w-2/5 z-10 transform hover:scale-105 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1481&q=80"
                    alt="Vegetarian pizza"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
                Our Story
              </h2>
              <p className="text-xl mb-6 text-gray-700">
                Founded in 2010, GreenLeaf began as a small neighborhood cafe
                with a big vision: to make plant-based dining accessible,
                delicious, and satisfying for everyone.
              </p>
              <p className="text-xl mb-8 text-gray-700">
                Our chefs craft seasonal menus that highlight the natural
                flavors of locally-sourced, organic produce. Every dish tells a
                story of sustainability and culinary innovation.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
                  Learn More
                </button>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                  Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        id="categories"
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-24 bg-white opacity-0 transition-all duration-700"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-green-700">
            Our Specialties
          </h2>
          <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Discover our diverse range of plant-based culinary creations,
            crafted with passion and expertise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category 1 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Fresh Salads"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-green-700">
                  Fresh Salads
                </h3>
                <p className="text-gray-600">
                  Crisp, vibrant salads with homemade dressings
                </p>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="Hearty Mains"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-green-700">
                  Hearty Mains
                </h3>
                <p className="text-gray-600">
                  Satisfying plant-based entrees for every palate
                </p>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
                  alt="Decadent Desserts"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-green-700">
                  Decadent Desserts
                </h3>
                <p className="text-gray-600">
                  Indulgent sweet treats without animal products
                </p>
              </div>
            </div>

            {/* Category 4 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="Refreshing Drinks"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-green-700">
                  Refreshing Drinks
                </h3>
                <p className="text-gray-600">
                  Fresh juices, smoothies, and specialty beverages
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section
        id="menu"
        ref={(el) => (sectionsRef.current[3] = el)}
        className="py-24 bg-gray-50 opacity-0 transition-all duration-700"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-green-700">
            Signature Dishes
          </h2>
          <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Discover our chef's carefully crafted plant-based creations that
            celebrate the seasons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Menu Item 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
                  alt="Buddha Bowl"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">Harvest Buddha Bowl</h3>
                  <span className="text-green-600 font-bold text-xl">$16</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Quinoa, roasted sweet potatoes, avocado, kale, and tahini
                  dressing
                </p>
                <button className="text-green-600 font-semibold flex items-center group-hover:text-green-700">
                  Add to order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Item 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="Vegetable Lasagna"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">Mushroom Lasagna</h3>
                  <span className="text-green-600 font-bold text-xl">$18</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Layers of pasta, cashew ricotta, seasonal mushrooms, and
                  marinara
                </p>
                <button className="text-green-600 font-semibold flex items-center group-hover:text-green-700">
                  Add to order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Item 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr1YlqVTBny-j0oabcQcqh8yMF-tI2Myq38A&s"
                  alt="Vegetable Curry"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold">Coconut Curry</h3>
                  <span className="text-green-600 font-bold text-xl">$17</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Seasonal vegetables in aromatic coconut curry with jasmine
                  rice
                </p>
                <button className="text-green-600 font-semibold flex items-center group-hover:text-green-700">
                  Add to order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto">
              View Full Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="py-24 bg-green-50 opacity-0 transition-all duration-700"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-green-700">
            What Our Guests Say
          </h2>
          <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 text-2xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-6 text-lg italic">
                "The flavors in every dish are incredible! I'm not vegetarian
                but I choose to eat here regularly because the food is just that
                good."
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gray-300 rounded-full mr-4 overflow-hidden shadow-md">
                  <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Sarah M."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sarah M.</h4>
                  <p className="text-green-600">Regular Guest</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 text-2xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-6 text-lg italic">
                "As a long-time vegetarian, it's refreshing to find a restaurant
                that creates innovative dishes that even my meat-eating friends
                love."
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gray-300 rounded-full mr-4 overflow-hidden shadow-md">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="James T."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">James T.</h4>
                  <p className="text-green-600">Food Blogger</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="text-yellow-400 text-2xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-6 text-lg italic">
                "The atmosphere is perfect for a date night, and the staff is
                incredibly knowledgeable about the ingredients in each dish."
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-gray-300 rounded-full mr-4 overflow-hidden shadow-md">
                  <img
                    src="https://randomuser.me/api/portraits/women/28.jpg"
                    alt="Jessica L."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Jessica L.</h4>
                  <p className="text-green-600">First-time Visitor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className="py-24 bg-green-700 text-white opacity-0 transition-all duration-700"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to experience GreenLeaf?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Reserve your table today for an unforgettable plant-based dining
            experience.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
            <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Make a Reservation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105">
              Order Online
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="contact" ref={(el) => (sectionsRef.current[6] = el)}>
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GreenLeaf
                </h3>
                <p className="text-gray-400 mb-6">
                  Serving innovative plant-based cuisine since 2010.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Hours</h4>
                <p className="text-gray-400 mb-2">
                  Monday - Thursday: 11am - 9pm
                </p>
                <p className="text-gray-400 mb-2">
                  Friday - Saturday: 11am - 10pm
                </p>
                <p className="text-gray-400 mb-2">Sunday: 10am - 8pm</p>
                <p className="text-gray-400 mt-4">
                  Brunch: Weekends 10am - 2pm
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Location</h4>
                <p className="text-gray-400 mb-2">123 Plant-Based Avenue</p>
                <p className="text-gray-400 mb-2">Eco City, EC 12345</p>
                <p className="text-gray-400 mb-6">(555) 123-4567</p>
                <a
                  href="#"
                  className="text-green-400 hover:text-green-300 transition-colors flex items-center"
                >
                  Get Directions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6 text-white">
                  Newsletter
                </h4>
                <p className="text-gray-400 mb-4">
                  Subscribe to receive updates on special events and new menu
                  items.
                </p>
                <form className="flex flex-col space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} GreenLeaf Vegetarian Restaurant.
                All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 10s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default RestaurantWebsite;
