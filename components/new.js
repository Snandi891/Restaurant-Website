<div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
  {/* Header */}
  <header className="bg-green-700 text-white py-4 shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-2xl font-bold flex items-center">
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
        </span>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="hover:text-green-200 transition-colors">
          Home
        </a>
        <a href="#" className="hover:text-green-200 transition-colors">
          About
        </a>
        <a href="#" className="font-bold border-b-2 border-white">
          Menu
        </a>
        <a href="#" className="hover:text-green-200 transition-colors">
          Contact
        </a>

        <div className="relative">
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </button>

          {isCartNotification && (
            <div className="absolute right-0 top-10 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-bounce">
              Item added to cart!
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden mt-4 pb-4 px-4">
        <div className="flex flex-col space-y-3">
          <a href="#" className="hover:text-green-200 transition-colors py-1">
            Home
          </a>
          <a href="#" className="hover:text-green-200 transition-colors py-1">
            About
          </a>
          <a href="#" className="font-bold border-b-2 border-white py-1">
            Menu
          </a>
          <a href="#" className="hover:text-green-200 transition-colors py-1">
            Contact
          </a>
        </div>
      </div>
    )}
  </header>

  {/* Hero Section */}
  <section className="relative py-16 md:py-24 bg-green-800 text-white overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Restaurant interior"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="container mx-auto px-4 relative z-10 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Menu</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Discover our delicious plant-based creations made with locally sourced,
        organic ingredients
      </p>
    </div>
  </section>

  {/* Category Filters */}
  <section className="py-8 md:py-12 bg-white shadow-md">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category.id
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  </section>

  {/* Menu Items */}
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-xl">
            No items found in this category.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            View All Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 menu-item"
            >
              <div className="relative">
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="w-full h-full bg-gradient-to-t from-black/30 to-transparent opacity-70 absolute"></div>
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Popular
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 bg-white rounded-full shadow-md h-12 w-12 flex items-center justify-center">
                  <span className="text-green-700 font-bold text-md">
                    ${item.price}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-xl font-bold mb-2 text-green-700">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>

  {/* Special Offers Banner */}
  <section className="py-12 md:py-16 bg-green-50">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
        Weekly Specials
      </h2>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-green-600 p-6 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl font-bold mb-2">20% OFF</div>
              <p className="text-lg">Every Wednesday</p>
            </div>
          </div>

          <div className="md:w-3/5 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-2">
              Wednesday Veggie Night
            </h3>
            <p className="text-gray-600 mb-4">
              Every Wednesday, enjoy 20% off all vegetarian main courses. Bring
              your friends and family for a delicious plant-based feast!
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              Learn More About Offers
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
          <p className="text-gray-400">
            Serving innovative plant-based cuisine since 2010.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Hours</h4>
          <p className="text-gray-400">Monday - Thursday: 11am - 9pm</p>
          <p className="text-gray-400">Friday - Saturday: 11am - 10pm</p>
          <p className="text-gray-400">Sunday: 10am - 8pm</p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Location</h4>
          <p className="text-gray-400">123 Plant-Based Avenue</p>
          <p className="text-gray-400">Eco City, EC 12345</p>
          <p className="text-gray-400">(555) 123-4567</p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} GreenLeaf Vegetarian Restaurant. All
          rights reserved.
        </p>
      </div>
    </div>
  </footer>

  {/* Custom CSS for animations */}
  <style jsx>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .menu-item {
      animation: fadeIn 0.5s ease-out forwards;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Stagger animations for menu items */
    .menu-item:nth-child(1) {
      animation-delay: 0.1s;
    }
    .menu-item:nth-child(2) {
      animation-delay: 0.2s;
    }
    .menu-item:nth-child(3) {
      animation-delay: 0.3s;
    }
    .menu-item:nth-child(4) {
      animation-delay: 0.4s;
    }
    .menu-item:nth-child(5) {
      animation-delay: 0.5s;
    }
    .menu-item:nth-child(6) {
      animation-delay: 0.6s;
    }
    .menu-item:nth-child(7) {
      animation-delay: 0.7s;
    }
    .menu-item:nth-child(8) {
      animation-delay: 0.8s;
    }
    .menu-item:nth-child(9) {
      animation-delay: 0.9s;
    }
    .menu-item:nth-child(10) {
      animation-delay: 1s;
    }
  `}</style>
</div>;
