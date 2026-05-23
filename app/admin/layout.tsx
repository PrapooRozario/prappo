import "@/app/globals.css";

export const metadata = {
  title: 'Admin Login',
  description: 'Admin Portal',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

