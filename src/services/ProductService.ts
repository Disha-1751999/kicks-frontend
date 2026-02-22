import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get(`${API_URL}/products`, {
    timeout: 10000,
  });

  return response.data;
}

export async function fetchCategories(): Promise<ProductCategory[]> {
  const response = await axios.get(`${API_URL}/categories`, {
    timeout: 10000,
  });

  return response.data;
}

export const fetchProductById = async (id: string) => {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};
