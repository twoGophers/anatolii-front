import Header from "@/components/Header/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
      <div className="container">
        <Header />
        <div className="main">
          {children}
        </div>
        <footer>
          footer
        </footer>
      </div>
  )
}