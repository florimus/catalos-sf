// lib/queries.ts
export const GET_MODULE_BY_ID = `
    query GetModuleByResourceId($id: String!) {
        getModuleByResourceId(id: $id) {
            id
            resourceId
            data
            translations
            active
        }
    }
`;