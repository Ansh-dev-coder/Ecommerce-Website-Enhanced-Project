import ProductCard from "./shared/ProductCard";

const products=[
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://embarkx.com/sample/placeholder.png",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  }
];
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-lg mb-4">
            Welcome to our ecommerce store. We create beautiful products with curated design, quality materials, and fast delivery.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            alt="About Us"
            className="w-full max-w-xl h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
          />
        </div>
      </div>

      <div className="text-slate-800 text-4xl font-bold text-center mb-8">
        Our Products
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {products.map((product,index)=>(
        <ProductCard  key={index} 
                      image={product.image}
                      productName={product.productName}
                      description={product.description}
                      specialPrice={product.specialPrice}
                      price={product.price}
                      about
        />
       ))}
      </div>
    </div>
  )
}
export default About;