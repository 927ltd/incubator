import AuthedPage from "@/app/authed-page"
import { Database } from "../supabase-types"
import { createServerSBClient } from "@/utils/supabase-server"
import OrdersTable from "./OrdersTable"

type TOrder = Database["public"]["Tables"]["orders"]["Row"]
type TOrderItem = Database["public"]["Tables"]["order_items"]["Row"]

export type TOrderWithItems = TOrder & {
  order_items: TOrderItem[]
}

export default async function OrdersPage() {
  const supabase = createServerSBClient<Database>()
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")

  return data == null ? (
    <div>Error retrieving orders: {error.message}</div>
  ) : (
    <AuthedPage>
      <OrdersTable orders={data} />
    </AuthedPage>
  )
}
