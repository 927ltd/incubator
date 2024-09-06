"use client"

import { TOrderWithItems } from "./OrdersPage"
import OrderCreateModal from "./OrderCreateModal"
import { createSBClient } from "@/utils/supabase-client"
import { useState } from "react"
import { TrashIcon } from "@heroicons/react/20/solid"
import OrderDisplayModal from "./OrderDisplayModal"

function parseReceiptItems(receiptPaste: string) {
  const lines = receiptPaste.split("\n")
  const items: ReceiptItem[] = []
  let currentItem: Partial<ReceiptItem> = {}

  interface ReceiptItem {
    item_number: string
    description: string
    qty: number
    price: number
  }

  for (const line of lines) {
    if (line.startsWith("ITEM#")) {
      currentItem = { item_number: line.split("\t")[1] }
    } else if (line.startsWith("DESCRIPTION")) {
      currentItem.description = line.split("\t")[1]
    } else if (line.startsWith("QTY")) {
      currentItem.qty = parseInt(line.split("\t")[1], 10)
    } else if (line.startsWith("PRICE")) {
      currentItem.price = Math.round(parseFloat(line.split("\t")[1]) * 100)
      items.push(currentItem as ReceiptItem)
      currentItem = {}
    }
  }

  return items
}

export default function OrdersTable(props: { orders: TOrderWithItems[] }) {
  const supabase = createSBClient()
  const [orders, setOrders] = useState(props.orders)
  const [selectedOrder, setSelectedOrder] = useState<TOrderWithItems | null>(
    null
  )
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false)

  const openOrderDetailsModal = (order: TOrderWithItems) => {
    setSelectedOrder(order)
    setIsOrderDetailsModalOpen(true)
  }

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false)
    setSelectedOrder(null)
  }

  const createOrder = async (receiptPaste: string) => {
    const parsedItems = parseReceiptItems(receiptPaste)
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({})
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return
    }

    const { data: itemsData, error: itemsError } = await supabase
      .from("order_items")
      .insert(
        parsedItems.map(item => ({
          ...item,
          order_id: orderData.id,
        }))
      )
      .select()

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      return
    }

    // Combine the order data with the items data
    const newOrder = {
      ...orderData,
      order_items: itemsData,
    }

    // Update the orders state with the new order
    setOrders(prevOrders => [...prevOrders, newOrder])
  }

  const deleteOrder = async (orderId: number) => {
    const { error } = await supabase.from("orders").delete().eq("id", orderId)

    if (error) {
      console.error("Error deleting order:", error)
      return
    }

    setOrders(orders.filter(order => order.id !== orderId))
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Orders
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <OrderCreateModal onSubmit={createOrder} />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Qty
                  </th>

                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr
                    key={order.id}
                    onClick={() => openOrderDetailsModal(order)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {order.order_items.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          deleteOrder(order.id)
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <TrashIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Delete order</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedOrder && (
              <OrderDisplayModal
                order={selectedOrder}
                open={isOrderDetailsModalOpen}
                onClose={closeOrderDetailsModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
