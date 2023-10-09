import axios from "axios";

const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";

const _id = "64f8754e1cd2fd7cda7d8725";

export const getAllStoresForAnOwner = async function () {
  try {
    const { data } = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/stores/owner/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data };
  } catch (err) {
    return { err };
  }
};

export const deleteStoreById = async (_id) => {
  try {
    const { data } = await axios.delete(
      `${REACT_APP_BACKEND_URL}/api/stores/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data };
  } catch (err) {
    return { err };
  }
};

export const createNewItem = async (values) => {
  try {
    const { data } = await axios.patch(
      `${REACT_APP_BACKEND_URL}/api/stores/add/item/${values.storeId}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const deleteItemFromStore = async (storeId, itemId) => {
  try {
    const { data } = await axios.patch(
      `${REACT_APP_BACKEND_URL}/api/stores/delete/item/${storeId}`,
      { itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

export const loadItemForItemCard = async (itemId) => {
  const { data } = await findItemById(itemId);
  const brandData = await findBrandById(data.brand);

  return { ...data, brandName: brandData.data.brandName };
};

export const findItemById = async (itemId) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/items/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data };
  } catch (err) {
    console.error(err);
  }
};

export const findBrandById = async (brand) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_BACKEND_URL}/api/brands/${brand}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (err) {
    console.error(err);
  }
};
