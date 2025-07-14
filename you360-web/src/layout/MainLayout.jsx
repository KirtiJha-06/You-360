import Sidebar from "@/components/ui/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60">{children}</div>
    </div>
  );
}
