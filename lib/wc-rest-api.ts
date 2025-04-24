"use strict";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const wooApi = new WooCommerceRestApi({
  url: "https://limited-kicks.ru/admin",
  consumerKey: process.env.WC_PUBLIC_KEY,
  consumerSecret: process.env.WC_SECRET_KEY,
  version: "wc/v3",
});