"use strict";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export const wooApi = new WooCommerceRestApi({
  url: "https://admin.limited-kicks.ru/",
  consumerKey: process.env.WC_PUBLIC_KEY,
  consumerSecret: process.env.WC_SECRET_KEY,
  version: "wc/v3",
});