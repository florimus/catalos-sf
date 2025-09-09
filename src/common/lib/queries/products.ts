// lib/queries.ts
export const GET_PRODUCT_BY_ID = `
  query GetProductById($id: String!) {
    getProductById(id: $id) {
      id
      name
      skuId
      categoryName
      categoryId
      brandName
      brandId
      productTypeId
      attributes
      translations
      category {
        id
        name
        translations
      }
      brand {
        id
        name
        translations
        avatar
      }
      productType {
        id
        name
        translations
      }
      variants {
        id
        name
        slug
        skuId
        url
        seoTitle
        medias {
          type
          defaultSrc
          lg
          md
          sm
          alt
        }
        seoDescription
        attributes
        translations
      }
    }
  }
`;
