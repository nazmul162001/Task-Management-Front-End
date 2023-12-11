import Todo from "@/components/ui/Homepage/Todo/Todo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-screen bg-[#171723] flex justify-center items-center">
      <Todo />
    </main>
  );
}
