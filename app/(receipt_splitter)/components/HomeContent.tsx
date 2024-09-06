import { Container } from "@/shared_components/Container"

export default function HomeContent() {
  return (
    <>
      <Container>
        <pre>
          {`
    ___           _     _   
   | _ \\___ __ __(_)_ _| |_ 
   |   / -_) _/ _| | ' \\  _|
   |_|_\\___\\__\\__|_|_||_\\__|
    ___      _ _ _   _       
   / __|_ __| (_) |_| |_ ___ 
   \\__ \\ '_ \\ | |  _|  _/ -_)
   |___/ .__/_|_|\\__|\\__\\___|
       |_|                   
          `}
        </pre>
      </Container>
    </>
  )
}
