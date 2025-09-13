// lib/queries.ts
export const GET_SKU_PRICE_BY_SKU_ID_AND_CHANNEL_ID = `
    query GetPriceOfSku($skuId: ID!, $channel: String!, $quantity: Int!) {
        getPriceOfSku(id: $skuId, channel: $channel, quantity: $quantity) {
            salesPrice
            discountName
            discountedPrice
            discountPercentage
            discountFlatPrice
            taxPrice
            taxValue
            isFixedTax
            finalPrice
        }
    }
`;
