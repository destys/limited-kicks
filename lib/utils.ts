import { clsx, type ClassValue } from "clsx";
import { stringify } from "querystring";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);
}

export async function fetchWooCommerce(
  endpoint: string,
  query?: {},
  method: string = "GET",
  data: Record<string, unknown> = {},
  revalidate: number = 60
) {
  const url = "https://admin.limited-kicks.ru/wp-json/wc/v3/";
  const params = query ? "?" + stringify(query) : "";

  const credentials = btoa(
    `${process.env.WC_PUBLIC_KEY}:${process.env.WC_SECRET_KEY}`
  );
  const headers = new Headers({
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  });

  const options: RequestInit = {
    method: method,
    headers: headers,
    body: method !== "GET" && data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${url}${endpoint}${params}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const mergeParams = (
  query: Record<string, any>,
  searchParams: Record<string, any>
): Record<string, any> => {
  const merged: Record<string, any> = { ...query };

  Object.keys(searchParams).forEach((key) => {
    if (Array.isArray(searchParams[key])) {
      if (Array.isArray(merged[key])) {
        merged[key] = merged[key].concat(searchParams[key]);
      } else if (merged[key] !== undefined) {
        merged[key] = [merged[key]].concat(searchParams[key]);
      } else {
        merged[key] = searchParams[key];
      }
    } else {
      if (Array.isArray(merged[key])) {
        merged[key] = merged[key].concat(searchParams[key]);
      } else if (merged[key] !== undefined) {
        merged[key] = [merged[key], searchParams[key]];
      } else {
        merged[key] = searchParams[key];
      }
    }
  });

  return merged;
};
