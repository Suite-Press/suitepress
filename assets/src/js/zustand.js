import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

const stores = [];
const zustand = {
    persist,
    createStore,
    stores,
};

window.zustand = zustand;
