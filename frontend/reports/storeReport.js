import { UseBackEndApi } from "../services/api";

export const generateReportForStoresWithUserId = async (stores) => {
  const numberOfStores = stores.length;
  const { findItemById, findBrandById } = UseBackEndApi();

  const storeDetails = await generateStoreDetails(
    stores,
    findItemById,
    findBrandById
  );

  return { numberOfStores, storeDetails };
};
const generateStoreDetails = async (stores, findItemById, findBrandById) => {
  const storeDetails = [];

  for (let store of stores) {
    let numberOfItemsInEachStore = store.items.length || 0;
    let featuredBrandsId = [];
    for (let item of store.items) {
      const { data: itemData } = await findItemById(item);
      featuredBrandsId.push(itemData.brand);
    }

    const featuredBrands = await Promise.all(
      featuredBrandsId.map(async (brand) => {
        const { data } = await findBrandById(brand);
        return data.brandName;
      })
    );

    storeDetails.push({
      _id: store._id,
      storeName: store.storeName,
      registeredAddress: store.address,
      numberOfItems: numberOfItemsInEachStore,
      featuredBrandsInfo: {
        featuredBrandCount: featuredBrands.length,
        featuredBrands,
      },
    });
  }

  return storeDetails;
};
