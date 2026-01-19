// Trip Planner - localStorage utilities for managing trip planning state

const PENDING_DESTINATION_KEY = "visitsulsel_pending_destination";
const TRIP_DRAFT_KEY = "visitsulsel_trip_draft";

export type PendingDestination = {
  id: string;
  name: string;
  slug: string;
  image: string;
  location: string;
  zone?: string;
  addedAt: string;
};

export type TripDraft = {
  origin: string | null;
  startDate: string;
  duration: number;
  travelers: number;
  selectedDestinations: {
    dayIndex: number;
    destinationId: string;
  }[];
  selectedAccommodations: {
    dayIndex: number;
    accommodationId: string;
  }[];
  lastUpdated: string;
};

// ============================================
// PENDING DESTINATION (from detail page)
// ============================================

/**
 * Add a destination to pending list (from detail page)
 * This is used when user clicks "Tambah ke Trip" on destination detail
 */
export function addPendingDestination(destination: PendingDestination): void {
  if (typeof window === "undefined") return;
  
  try {
    // Get existing pending destinations
    const existing = getPendingDestinations();
    
    // Check if already exists
    if (existing.some(d => d.id === destination.id)) {
      // Update the addedAt timestamp
      const updated = existing.map(d => 
        d.id === destination.id ? { ...d, addedAt: new Date().toISOString() } : d
      );
      localStorage.setItem(PENDING_DESTINATION_KEY, JSON.stringify(updated));
    } else {
      // Add new
      existing.push({
        ...destination,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem(PENDING_DESTINATION_KEY, JSON.stringify(existing));
    }
  } catch (error) {
    console.error("Failed to add pending destination:", error);
  }
}

/**
 * Get all pending destinations
 */
export function getPendingDestinations(): PendingDestination[] {
  if (typeof window === "undefined") return [];
  
  try {
    const saved = localStorage.getItem(PENDING_DESTINATION_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Get the most recent pending destination
 */
export function getLatestPendingDestination(): PendingDestination | null {
  const destinations = getPendingDestinations();
  if (destinations.length === 0) return null;
  
  // Sort by addedAt descending and return the first one
  return destinations.sort((a, b) => 
    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  )[0];
}

/**
 * Remove a destination from pending list
 */
export function removePendingDestination(destinationId: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const existing = getPendingDestinations();
    const filtered = existing.filter(d => d.id !== destinationId);
    localStorage.setItem(PENDING_DESTINATION_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to remove pending destination:", error);
  }
}

/**
 * Clear all pending destinations
 */
export function clearPendingDestinations(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_DESTINATION_KEY);
}

/**
 * Check if a destination is pending
 */
export function isDestinationPending(destinationId: string): boolean {
  const pending = getPendingDestinations();
  return pending.some(d => d.id === destinationId);
}

// ============================================
// TRIP DRAFT (for partially filled trips)
// ============================================

/**
 * Save trip draft (auto-save while planning)
 */
export function saveTripDraft(draft: TripDraft): void {
  if (typeof window === "undefined") return;
  
  try {
    const draftWithTimestamp = {
      ...draft,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(TRIP_DRAFT_KEY, JSON.stringify(draftWithTimestamp));
  } catch (error) {
    console.error("Failed to save trip draft:", error);
  }
}

/**
 * Get saved trip draft
 */
export function getTripDraft(): TripDraft | null {
  if (typeof window === "undefined") return null;
  
  try {
    const saved = localStorage.getItem(TRIP_DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * Clear trip draft
 */
export function clearTripDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TRIP_DRAFT_KEY);
}

/**
 * Check if there's an active draft
 */
export function hasTripDraft(): boolean {
  return getTripDraft() !== null;
}
