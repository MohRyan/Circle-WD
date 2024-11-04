import StatusProject from "@/components/StatusProject";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="relative w-screen h-screen bg-first">
        <StatusProject responsive={true} dummy={false} real={true} />
        <Toaster />
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
