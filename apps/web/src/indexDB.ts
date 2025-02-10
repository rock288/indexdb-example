const DB_NAME = "MyDatabase"
const DB_VERSION = 1
const STORE_NAME = "Users"

export type TypeUser = { id?: number; name: string; age: number }

export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function addUser(user: TypeUser) {
  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, "readwrite")
  const store = transaction.objectStore(STORE_NAME)
  const request = store.add(user)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function getUser(id: number) {
  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, "readonly")
  const store = transaction.objectStore(STORE_NAME)
  const request = store.get(id)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function getAllUsers(): Promise<TypeUser[]> {
  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, "readonly")
  const store = transaction.objectStore(STORE_NAME)
  const request = store.getAll()

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as TypeUser[])
    request.onerror = () => reject(request.error)
  })
}

export async function updateUser(
  id: number,
  newData: { name?: string; age?: number }
) {
  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, "readwrite")
  const store = transaction.objectStore(STORE_NAME)
  const user = await getUser(id)

  if (!user) {
    console.error("User not found!")
    return
  }

  const updatedUser = { ...user, ...newData }
  const request = store.put(updatedUser)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function deleteUser(id: number) {
  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, "readwrite")
  const store = transaction.objectStore(STORE_NAME)
  const request = store.delete(id)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve("User deleted!")
    request.onerror = () => reject(request.error)
  })
}

export async function findUserByName(name: string) {
  const db = await openDatabase()
  const transaction = db.transaction(STORE_NAME, "readonly")
  const store = transaction.objectStore(STORE_NAME)
  const index = store.index("name")
  const request = index.get(name)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
