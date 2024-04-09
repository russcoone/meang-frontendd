import gql from 'graphql-tag';
import { SHOP_PRODUCT_FRAGMENT } from '@graphql/operations/fragment/shop-product';

export const HOME_PAGE = gql`
  query HomePageInfo(
    $showPlatform: Boolean = false  
    $relationScreens: Boolean  = false
) {
    carousel: shopProductsOffersLast(itemsPage: 3, random: false) {
      shopProducts {
        ...ShopProductObject
      }
    }
    tenisdemujer: shopProductsPlatforms(
      itemsPage: 4
      platform: ["1"]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }

    tenisdehombre: shopProductsPlatforms(
      itemsPage: 4
      platform: ["2"]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    tenisdenino: shopProductsPlatforms(
      itemsPage: 4
      platform: ["3"]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    tenisdenina: shopProductsPlatforms(
      itemsPage: 4
      platform: ["4"]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    tenismaseconomicos: shopProductsPlatforms(
      itemsPage: 4
      platform: ["5"]
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
    topPrice1500: shopProductsOffersLast(
      itemsPage: 4
      topPrice: 1500
      random: true
    ) {
      shopProducts {
        ...ShopProductObject
      }
    }
  }
  ${SHOP_PRODUCT_FRAGMENT}
`;
