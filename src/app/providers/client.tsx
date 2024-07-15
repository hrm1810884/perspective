"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Provider, createStore } from "jotai";
import React, { useEffect } from "react";
import { Flip, ToastContainer } from "react-toastify";

import { getBaseUrl } from "@/utils";

import "react-toastify/dist/ReactToastify.css";

const store = createStore();

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const baseUrl = getBaseUrl();

    axios.defaults.baseURL = baseUrl;

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (apiKey) {
        axios.defaults.headers.common["x-api-key"] = apiKey;
    }

    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }, []);

    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="light"
                    icon={false}
                    transition={Flip}
                />
                {children}
            </Provider>
        </QueryClientProvider>
    );
}
