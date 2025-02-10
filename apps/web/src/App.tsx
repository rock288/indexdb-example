import { useEffect, useState } from "react"
import "./App.css"
import {
  getAllUsers,
  TypeUser,
  openDatabase,
  addUser,
  deleteUser,
} from "./indexDB"

function App() {
  const [users, setUsers] = useState<TypeUser[]>([])

  const onGetUsers = async () => {
    await openDatabase()
    const res = await getAllUsers()
    setUsers(res)
  }

  useEffect(() => {
    onGetUsers()
  }, [])

  const onAddUser = async () => {
    await addUser({ name: "Tuan", age: 30 })
    onGetUsers()
  }

  // const onRemoveUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   console.log("ID:", event.currentTarget.dataset.id)
  //   const id = event.currentTarget.dataset.id
  //   await deleteUser(parseInt(id ?? "0"))
  //   await onGetUsers()
  // }

  const onRemoveUser1 = async (id: number) => {
    await deleteUser(id)
    await onGetUsers()
  }

  console.log("Render")

  return (
    <div>
      <h1>APP INDEX-DB</h1>
      <div>
        <button
          type="button"
          className="border-gray-100 border-2 p-2 rounded-md bg-green-600 hover:bg-green-800 hover:cursor-pointer text-white text-sm"
          onClick={onAddUser}
        >
          Add user
        </button>
      </div>
      <div>
        {users.map((item, index) => {
          return (
            <div key={index} className="flex">
              <div>
                Id: {item?.id} {item.name}
              </div>
              <div>
                <button
                  type="button"
                  className="border-gray-100 border-2 p-2 rounded-md bg-red-600 hover:bg-red-800 hover:cursor-pointer text-white text-sm"
                  data-id={item?.id}
                  // onClick={onRemoveUser}
                  onClick={() => onRemoveUser1(item?.id ?? 0)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
