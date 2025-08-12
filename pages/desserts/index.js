import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const dishes = [
  {
    image: "/chicken.jpg",
    title: "Authentic Chicken Biryani",
    description:
      "Experience the rich aroma and taste of traditional Chicken Biryani. Cooked with fragrant basmati rice, tender chicken, and a blend of aromatic spices.",
    price: 200,
  },
  {
    image: "/chicken.jpg",
    title: "Paneer Butter Masala",
    description:
      "A creamy and flavorful Indian curry made with fresh paneer cubes simmered in a rich tomato-based gravy.",
    price: 180,
  },
  {
    image: "/chicken.jpg",
    title: "Tandoori Chicken",
    description:
      "Juicy, smoky, and perfectly spiced Tandoori Chicken, grilled to perfection in a traditional clay oven.",
    price: 250,
  },
];

const FoodSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [formData, setFormData] = useState({
    dish: "",
    price: 0,
    name: "",
    address: "",
    phone: "",
    quantity: 1,
    time: "",
  });
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // update total price when dish or quantity changes
  useEffect(() => {
    if (formData.price && formData.quantity) {
      setTotalPrice(formData.price * formData.quantity);
    }
  }, [formData.price, formData.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const sendWhatsApp = () => {
    const { dish, name, address, phone, quantity, time } = formData;

    const message = `✧ *New Food Order* ✧\n
*Dish:* ${dish}\n
*Quantity:* ${quantity}\n
*Total Price:* ₹${totalPrice}\n
*Name:* ${name}\n
*Address:* ${address}\n
*Phone:* ${phone}\n
*Preferred Time:* ${time}\n
✧ _Thank you for ordering from DelishBite!_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "8918960117";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    setFormData({
      dish: "",
      price: 0,
      name: "",
      address: "",
      phone: "",
      quantity: 1,
      time: "",
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData({
      dish: "",
      price: 0,
      name: "",
      address: "",
      phone: "",
      quantity: 1,
      time: "",
    });
    setShowForm(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.quantity) newErrors.quantity = "Select quantity.";
    if (!formData.time) newErrors.time = "Select preferred time.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      {/* Menu List */}
      <div className="flex flex-col gap-16 p-8 animated-bg">
        {dishes.map((dish, index) => (
          <section
            key={index}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="w-full md:w-1/2" data-aos="zoom-in">
              <Image
                src={dish.image}
                alt={dish.title}
                className="rounded-xl shadow-lg object-cover"
                width={600}
                height={400}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-gray-800">{dish.title}</h2>
              <p className="text-gray-600 leading-relaxed">
                {dish.description}
              </p>
              <p className="text-lg font-semibold text-green-600">
                ₹{dish.price}
              </p>
              <button
                className="order-btn mt-4"
                onClick={() => {
                  setSelectedDish(dish);
                  setFormData((prev) => ({
                    ...prev,
                    dish: dish.title,
                    price: dish.price,
                    quantity: 1,
                  }));
                  setShowForm(true);
                }}
              >
                <span className="btn-text">Order Now</span>
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-start z-50 px-4 overflow-y-auto py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white/10 backdrop-blur-xl border border-yellow-400 shadow-lg rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
              🛒 Order Form
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                  sendWhatsApp();
                }
              }}
            >
              {/* Dish Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Dish
                </label>
                <input
                  type="text"
                  name="dish"
                  value={formData.dish}
                  readOnly
                  className="w-full border border-white/30 bg-white/10 rounded-lg p-3 text-white"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Price (per item)
                </label>
                <input
                  type="text"
                  value={`₹${formData.price}`}
                  readOnly
                  className="w-full border border-white/30 bg-white/10 rounded-lg p-3 text-white"
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Quantity
                </label>
                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 text-white bg-white/10 focus:outline-none focus:ring-2 ${
                    errors.quantity
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/30 focus:ring-yellow-400"
                  }`}
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q} className="text-black">
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Total Price
                </label>
                <input
                  type="text"
                  value={`₹${totalPrice}`}
                  readOnly
                  className="w-full border border-white/30 bg-white/10 rounded-lg p-3 text-white"
                />
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 text-white bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/30 focus:ring-yellow-400"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  placeholder="Your Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 text-white bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/30 focus:ring-yellow-400"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 text-white bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/30 focus:ring-yellow-400"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Preferred Time */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-1">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-3 text-white bg-white/10 focus:outline-none focus:ring-2 ${
                    errors.time
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/30 focus:ring-yellow-400"
                  }`}
                />
                {errors.time && (
                  <p className="text-red-400 text-sm mt-1">{errors.time}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Send via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .animated-bg {
          background: linear-gradient(270deg, #fffbe0, #fff9c4, #fffbe0);
          background-size: 400% 400%;
          animation: gradientShift 20s ease infinite;
        }
        @keyframes gradientShift {
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
        .order-btn {
          background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
          color: #004d80;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(161, 196, 253, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(161, 196, 253, 0.8);
        }
        .btn-text {
          transition: transform 0.3s ease;
        }
        .order-btn:hover .btn-text {
          transform: translateY(-3px);
        }
      `}</style>
    </>
  );
};

export default FoodSection;
