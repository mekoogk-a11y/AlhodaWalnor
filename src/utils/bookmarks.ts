export interface BookmarkItem {
  id: string;
  title: string;
  discipline: string;
  reference: string;
  summary: string;
  addedAt: string;
}

const STORAGE_KEY = "al_huda_bookmarks_v1";

export function getBookmarks(): BookmarkItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(item: Omit<BookmarkItem, "addedAt">): boolean {
  try {
    const list = getBookmarks();
    if (list.some((b) => b.id === item.id)) {
      return false; // already exists
    }
    const updated = [
      {
        ...item,
        addedAt: new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" }),
      },
      ...list,
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-updated"));
    return true;
  } catch {
    return false;
  }
}

export function removeBookmark(id: string): void {
  try {
    const list = getBookmarks();
    const updated = list.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-updated"));
  } catch {}
}

export function isBookmarked(id: string): boolean {
  const list = getBookmarks();
  return list.some((b) => b.id === id);
}
