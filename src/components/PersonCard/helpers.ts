import { ValueTypes } from "../../types";

export const urlString = (url: ValueTypes) =>
  typeof url === "string" && /^https?:\/\//i.test(url);

export const normalizeName = (str: string) => str.replace(/_/g, " ");

export const arrayOrUrl = (value: ValueTypes) =>
  !!value.length && (Array.isArray(value) || urlString(value));

export const checkObjectIsEmpty = (obj: Record<string, string>) =>
  !(!!obj && !!Object.keys(obj).length);
