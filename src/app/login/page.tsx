import { Suspense } from "react";
import Login from "@/components/login";

function LoginWrapper() {
  return <Login />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <LoginWrapper />
    </Suspense>
  );
}