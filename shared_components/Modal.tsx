import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"

export default function Modal(props: {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  children: React.ReactNode
  footer: React.ReactNode
  fullWidth?: boolean
  headerButtons?: React.ReactNode // Add this new prop
}) {
  return (
    <Dialog
      open={props.open}
      onClose={props.setOpen}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 ${
              props.fullWidth ? "sm:max-w-[calc(100%-2rem)]" : "sm:max-w-lg"
            }`}
          >
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {props.title}
                  </DialogTitle>
                  <div className="flex items-center">
                    {props.headerButtons && (
                      <div className="mr-10">{props.headerButtons}</div>
                    )}
                    <button
                      type="button"
                      onClick={() => props.setOpen(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-2">{props.children}</div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:justify-end">
              {props.footer}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
