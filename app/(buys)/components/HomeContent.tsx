import { Container } from "@/shared_components/Container"

export default function HomeContent() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center justify-center h-auto">
        <div className="relative w-full min-w-[360px] max-w-[690px]">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full py-3 pl-12 pr-4 text-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out shadow-md hover:shadow-lg"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="w-6 h-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Container>
  )
}
