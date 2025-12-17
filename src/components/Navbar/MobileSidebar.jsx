import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <Menu />
      </SheetTrigger>

      <SheetContent side="right" className="w-[280px]">
        <nav className="flex flex-col gap-4">
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/series">Series</a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
