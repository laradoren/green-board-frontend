import {ApolloClient, InMemoryCache, ApolloProvider as Provider, HttpLink, ApolloLink, concat} from "@apollo/client";

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || null,
        }
    }));

    return forward(operation);
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
});

export default function ApolloProvider(props: any) {
    return <Provider client={client} {...props} />
}