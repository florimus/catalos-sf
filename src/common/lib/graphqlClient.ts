// lib/graphqlClient.ts
export async function graphqlRequest<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<T> {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://141.148.223.154:8071/graphql', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "language": "AR",
        // If your API needs auth token:
        // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // disable caching in Next.js
    });
  
    const json = await res.json();
  
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
  
    return json.data;
  }
  