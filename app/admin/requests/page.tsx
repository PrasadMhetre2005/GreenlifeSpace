import type { Metadata } from "next";
import AdminRequestsDashboard from "@/components/AdminRequestsDashboard";

export const metadata: Metadata = {
  title: "Request Dashboard | Greenlife Spaces",
  description: "Review and manage customer service visit requests.",
};

export default function AdminRequestsPage() {
  return (
    <div className="container-page py-16 lg:py-24">
      <AdminRequestsDashboard />
    </div>
  );
}