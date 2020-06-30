import React from 'react';
import Stripe from 'stripe';
import stripeConfig from '../config/stripe';
import { GetStaticPaths, GetStaticProps } from 'next';

const Product: React.FC = () => {

    return(
        <h1>Hi, i'm a product!</h1>
    );

};

export const getStaticPaths: GetStaticPaths = async () => {

    const stripe = new Stripe(stripeConfig.secretKey, {
        apiVersion: "2020-03-02",
    });

    const skus = await stripe.products.list();
    console.log(skus.data);
    const paths = skus.data.map((sku) => ({
        params: {
            productid: sku.id,
        }
    }));

    console.log(paths);

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const stripe = new Stripe(stripeConfig.secretKey, {
        apiVersion: "2020-03-02",
    });

    const sku = await stripe.products.retrieve(params.productid as string);
    console.log(sku);

    return {
        props: {
            sku
        },
    }

}

export default Product;
