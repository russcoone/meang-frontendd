import { SHOP_PRODUCT_FRAGMENT } from '../fragment/shop-product';
import gql from "graphql-tag";


export const DETAILS_PAGE = gql`
   query DetailsPageInfo (
    $id: Int!
    $showPlatform: Boolean = true
    $relationScreens: Boolean = true
   ){
    randomItems: shopProductsOffersLast(itemsPage: 3, random: true){
      shopProducts {
        ...ShopProductObject
      }
    }
    details: shopProductDetails(id: $id){
      shopProduct {
        ...ShopProductObject
      }
    }
   }
   ${SHOP_PRODUCT_FRAGMENT}

`
