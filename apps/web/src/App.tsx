import { useEffect, useState } from "react"
import "./App.css"
import MuiTable from "./components/data-grid"
import { addUser, deleteUser, getAllUsers, openDatabase } from "./indexDB"
import { GridValidRowModel } from "@mui/x-data-grid"

function App() {
  const [users, setUsers] = useState<readonly GridValidRowModel[]>([])

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

  const onRemoveUser = async (id: number) => {
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

      <MuiTable rows={users} setRows={setUsers} onRemoveUser={onRemoveUser} />
    </div>
  )
}

export default App
