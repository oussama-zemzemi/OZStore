const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div>
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">
          Quantity: {item.quantity} &nbsp;|&nbsp; Price: ${item.price}
        </p>
      </div>
      <button
        className="text-red-500 hover:underline text-sm"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
