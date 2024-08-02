import AdminPostBukletForm from "@/components/adminComps/AdminPostBukletForm";

export const revalidate = 0; // отключение кэширования

export default function Home() {
  return (
    <>
      <AdminPostBukletForm />
    </>
  );
}
