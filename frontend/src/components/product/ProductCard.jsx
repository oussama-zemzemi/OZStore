import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded shadow p-4 hover:shadow-md transition duration-300">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm truncate">{product.description}</p>
      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="block mt-2 text-sm text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
