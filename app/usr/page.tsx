// app/admin/page.tsx
'use client'
import { tryLogout } from "@@/src/hooks/CollectionAPI";
import { ResponseData } from "@@/src/types/apitypes";
import { Notify } from "@@/src/utils/script";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter()
  const handleLogout = async () => {
    const result: ResponseData = await tryLogout()
    if(result.success){
      Notify(result.message, 'info', 5000)
      router.push('/auth')
    }else Notify('Something went wrong', 'error')
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Manage your application here.</p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
  