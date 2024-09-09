import "./globals.css"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <>
      <main>
        {children}
        
      </main>
    </>
  )
}