import QrBlock from "@/components/qrblock";
export const revalidate = 0; // отключение кэширования

export default function Home() {
  return (
    <>
      <QrBlock />
    </>
  );
}
