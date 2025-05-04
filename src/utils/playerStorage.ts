// src/utils/playerStorage.ts

const getStorageKey = (roomCode: string) => `huddlegames-player-${roomCode}`

export interface StoredPlayerData {
  player_name: string
  is_admin: boolean
  room_id: string
  player_id: string
  game_slug: string
  expires_at: string // ISO string
}

export function savePlayerToStorage(roomCode: string, data: Omit<StoredPlayerData, 'expires_at'>) {
  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  const payload: StoredPlayerData = { ...data, expires_at }
  localStorage.setItem(getStorageKey(roomCode), JSON.stringify(payload))
}

export function getPlayerFromStorage(roomCode: string): StoredPlayerData | null {
  const raw = localStorage.getItem(getStorageKey(roomCode))
  if (!raw) return null

  try {
    const parsed: StoredPlayerData = JSON.parse(raw)
    if (new Date(parsed.expires_at).getTime() < Date.now()) {
      localStorage.removeItem(getStorageKey(roomCode))
      return null
    }
    return parsed
  } catch {
    localStorage.removeItem(getStorageKey(roomCode))
    return null
  }
}

export function clearPlayerFromStorage(roomCode: string) {
  localStorage.removeItem(getStorageKey(roomCode))
}
