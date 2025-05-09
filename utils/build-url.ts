"use strict";

export interface QueryParams {
  [key: string]: string | number | Array<string | number>;
}

export const buildUrlWithParams = (params: QueryParams): string => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        // Только для attribute и attribute_term добавляем []
        if (key === "attribute" || key === "attribute_term") {
          urlSearchParams.append(`${key}[]`, String(v));
        } else {
          urlSearchParams.append(key, String(v)); // Без []
        }
      });
    } else if (value !== undefined && value !== null) {
      urlSearchParams.set(key, String(value));
    }
  });

  return urlSearchParams.toString();
};

export const mergeParams = (query: Record<string, any>, searchParams: Record<string, any>): Record<string, any> => {
    const merged: Record<string, any> = { ...query };

    // Добавляем параметры сортировки по дате публикации от новых к старым
    merged.order = 'desc';
    merged.orderby = 'date';

    Object.keys(searchParams).forEach(key => {
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

export function removeAdminFromYoast(obj: any): any {
  if (typeof obj === "string") {
    return obj.replace(
      /https?:\/\/limited-kicks\.ru\/admin\//g,
      "https://limited-kicks.ru/"
    );
  }

  if (Array.isArray(obj)) {
    return obj.map(removeAdminFromYoast);
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = removeAdminFromYoast(obj[key]);
    }
    return newObj;
  }

  return obj;
}