import axios from "axios";
import { UseUserContext } from "../hooks/useUserContext";

export const UseBackEndApi = () => {
  const { user } = UseUserContext();

  const token = user.token;
  const _id = user._id;
  const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";

  return {
    getAllStoresForAnOwner: async function () {
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
    },
    deleteStoreById: async (_id) => {
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
    },

    createNewItem: async (values) => {
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
    },
    deleteItemFromStore: async (storeId, itemId) => {
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
    },
    loadItemForItemCard: async (itemId) => {
      const { data } = await findItemById(itemId);
      const brandData = await findBrandById(data.brand);

      return { ...data, brandName: brandData.data.brandName };
    },
    findItemById: async (itemId) => {
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
    },
    findBrandById: async (brand) => {
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
    },
  };
};
