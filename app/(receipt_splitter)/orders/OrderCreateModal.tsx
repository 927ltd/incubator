"use client"

import { Button } from "@/shared_components/Button"
import { SelectField, TextField } from "@/shared_components/Fields"
import Modal from "@/shared_components/Modal"
import { Textarea } from "@headlessui/react"
import { useState } from "react"

interface OrderCreateModalProps {
  onSubmit: (receiptPaste: string) => void
}

export default function OrderCreateModal({ onSubmit }: OrderCreateModalProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [receiptPaste, setReceiptPaste] = useState<string>("")

  const handleSubmit = () => {
    onSubmit(receiptPaste)
    setOpen(false)
    // Reset form

    setReceiptPaste("")
  }

  const onEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        color="blue"
      >
        Add order
      </Button>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add order"
        footer={
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              variant="solid"
              color="blue"
            >
              Submit
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-y-8">
          <SelectField
            label="Store"
            name="store"
            required
            value="Lulu Lemon"
            onChange={() => {}}
          >
            <option value="Lulu Lemon">Lulu Lemon</option>
          </SelectField>
          <label>
            Paste Receipt Below
            <Textarea
              name="receiptPaste"
              value={receiptPaste}
              onChange={e => setReceiptPaste(e.target.value)}
              onKeyDown={onEnterSubmit}
              required
              className={"w-full"}
            />
          </label>
        </div>
      </Modal>
    </>
  )
}
