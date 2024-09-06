import { Button } from "@/shared_components/Button"
import Modal from "@/shared_components/Modal"
import { TOrderWithItems } from "./OrdersPage"
import { useState } from "react"

interface OrderDisplayModalProps {
  order: TOrderWithItems
  open: boolean
  onClose: () => void
}

export default function OrderDisplayModal({
  order,
  open,
  onClose,
}: OrderDisplayModalProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    const items = order.order_items.map(item => [
      item.item_number,
      item.description,
      item.qty.toString(),
      (item.price / 100).toFixed(2),
    ])
    const csvContent = items.map(row => row.join("\t")).join("\n")

    navigator.clipboard.writeText(csvContent).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  return (
    <Modal
      open={open}
      setOpen={(isOpen: boolean) => {
        if (!isOpen) onClose()
      }}
      title={`Order Details - ID: ${order.id}`}
      headerButtons={
        <Button
          onClick={copyToClipboard}
          variant="solid"
          color="blue"
          className="ml-4"
        >
          {copySuccess ? "Copied!" : "Copy to Clipboard"}
        </Button>
      }
      footer={
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            variant="solid"
            color="blue"
          >
            Close
          </Button>
        </div>
      }
      fullWidth={true}
    >
      <div className="grid grid-cols-1 gap-y-4">
        <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
        <h3 className="font-semibold">Order Items:</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.order_items.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.item_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${(item.price / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
