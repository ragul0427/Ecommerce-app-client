import React, { useState } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);

  const [productCounts, setProductCounts] = useState({});

  const updateProductCount = (productId, newCount) => {
    console.log(productId,newCount,"wnqkjb")
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: newCount,
    }));
  };

  const Decrement = (productId) => {
    const currentCount = productCounts[productId] || 1;
    if (currentCount > 1) {
      updateProductCount(productId, currentCount - 1);
    }
  };

  return (
    <div className="w-[80vw] m-auto mt-8">
      <div className="text-white rounded-t-md bg-[--bg-color] py-2 px-2 flex justify-between">
        <p>Shopping Cart</p>
        <p>Total: 8828</p>
      </div>
      <div className="flex justify-between items-center px-2 bg-white py-2">
        <div className="w-[20vw]">Image</div>
        <div className="w-[20vw]">Title</div>
        <div className="w-[20vw]">Qty</div>
        <div className="w-[20vw]">Price</div>
      </div>
      {cart?.map((res, i) => {
        const productId = res.id;
        const currentCount = productCounts[productId] || 1;
        return (
          <div
            className="flex justify-between border-t-2 border-red-500 items-center px-2 bg-white py-2"
            key={i}
          >
            <div className="w-[20vw]">
              <img src={res.image} className="!w-[3vw] h-auto" alt={res.name} />
            </div>
            <div className="w-[20vw]">{res.name}</div>
            <div className="w-[20vw] flex items-center gap-3">
              <span
                className="bg-[--bg-color] text-center px-2 cursor-pointer text-white font-bold"
                onClick={() => {
                  Decrement(productId);
                }}
              >
                -
              </span>
              {currentCount}
              <span
                className="bg-[--bg-color] text-center px-2 cursor-pointer text-white font-bold"
                onClick={() => {
                  updateProductCount(productId, currentCount + 1);
                }}
              >
                +
              </span>
            </div>
            <div className="w-[20vw]">{currentCount * res.price}</div>
          </div>
        );
      })}

      <div className="text-white bg-[--bg-color] rounded-b-md py-1 px-2 flex justify-end">
        <Button className="bg-white">Checkout</Button>
      </div>
    </div>
  );
}

export default Cart;
