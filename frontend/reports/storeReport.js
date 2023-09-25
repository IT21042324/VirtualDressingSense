import { findBrandById } from "../services/api";
import { findItemById } from "../services/api";

export const generateReportForStoresWithUserId = async (stores) => {
  const numberOfStores = stores.length;

  const storeDetails = await generateStoreDetails(stores);

  return { numberOfStores, storeDetails };
};
const generateStoreDetails = async (data) => {
  const storeDetails = [];

  for (let store of data) {
    let numberOfItemsInEachStore = store.items.length || 0;
    let featuredBrandsId = [];
    for (let item of store.items) {
      const { data: itemData } = await findItemById(item.$oid); // get the item details by id
      featuredBrandsId.push(itemData.brand); // get the brand id from the item object
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
