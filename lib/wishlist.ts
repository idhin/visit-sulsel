// Simple localStorage-based wishlist utilities
// No hooks - just utility functions

export interface WishlistItem {
  id: string;
  type: "destinasi" | "kuliner" | "event" | "akomodasi";
  name: string;
  image: string;
  location?: string;
  addedAt: number;
}

const STORAGE_KEY = "visitsulsel_wishlist";

export function getWishlistItems(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveWishlistItems(items: WishlistItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: items }));
}

export function addToWishlist(item: Omit<WishlistItem, "addedAt">): WishlistItem[] {
  const items = getWishlistItems();
  if (items.some((i) => i.id === item.id && i.type === item.type)) {
    return items;
  }
  const newItems = [...items, { ...item, addedAt: Date.now() }];
  saveWishlistItems(newItems);
  return newItems;
}

export function removeFromWishlist(id: string, type: string): WishlistItem[] {
  const items = getWishlistItems();
  const newItems = items.filter((i) => !(i.id === id && i.type === type));
  saveWishlistItems(newItems);
  return newItems;
}

export function toggleWishlistItem(item: Omit<WishlistItem, "addedAt">): { items: WishlistItem[]; added: boolean } {
  const items = getWishlistItems();
  const exists = items.some((i) => i.id === item.id && i.type === item.type);
  
  if (exists) {
    const newItems = items.filter((i) => !(i.id === item.id && i.type === item.type));
    saveWishlistItems(newItems);
    return { items: newItems, added: false };
  } else {
    const newItems = [...items, { ...item, addedAt: Date.now() }];
    saveWishlistItems(newItems);
    return { items: newItems, added: true };
  }
}

export function isInWishlist(id: string, type: string): boolean {
  const items = getWishlistItems();
  return items.some((i) => i.id === id && i.type === type);
}

export function clearWishlist(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: [] }));
}

export function getWishlistCount(): number {
  return getWishlistItems().length;
}
