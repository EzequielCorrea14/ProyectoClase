import { useState } from "react";
import { productFormDictionary } from "../utils/productFormDictionary";
import { toast } from "react-toastify";
import BasicModal from "./BasicModal";

const ProductForm = ({ fetchData }) => {
  const [productFormValues, setProductFormValues] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 10
  });
  const [openModal, setOpenModal] = useState(false)
  const handleUpdateProductFormValues = (value, inputReference) => {
    if (inputReference === productFormDictionary.NAME) {
      setProductFormValues((prevState) => ({ ...prevState, name: value }));
    }
    if (inputReference === productFormDictionary.DESCRIPTION) {
      setProductFormValues((prevState) => ({
        ...prevState,
        description: value,
      }));
    }
    if (inputReference === productFormDictionary.PRICE) {
      setProductFormValues((prevState) => ({ ...prevState, price: Number(value) }));
    }
  };

  const handleSubmitForm = async () => {
    try {
      console.log({productFormValues})
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}product`,
        //"https://6532fc12d80bd20280f632e8.mockapi.io/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productFormValues),
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar un producto.");
      }
      try {
        await fetchData();
      } catch (error) {
        toast.error("Error al actualizar los datos.");
      }
      toast.success("Producto Agregado con éxito.");
    } catch (error) {
      console.error(error)
      toast.error("Error al agregar un producto.");
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder={"Name"}
          onChange={(e) =>
            handleUpdateProductFormValues(
              e.target.value,
              productFormDictionary.NAME
            )
          }
        />
        <input
          type="text"
          placeholder={"Description"}
          onChange={(e) =>
            handleUpdateProductFormValues(
              e.target.value,
              productFormDictionary.DESCRIPTION
            )
          }
        />
        <input
          type="number"
          placeholder={"Price"}
          onChange={(e) =>
            handleUpdateProductFormValues(
              e.target.value,
              productFormDictionary.PRICE
            )
          }
        />
        <button onClick={handleSubmitForm}>Agregar Producto</button>
        <button onClick={() => setOpenModal(true)}>Abrir modal</button>
      </div>
      <BasicModal isOpen={openModal} setIsOpen={setOpenModal} title={"Modal ProductForm"}/>
    </>
  );
};

export default ProductForm;
