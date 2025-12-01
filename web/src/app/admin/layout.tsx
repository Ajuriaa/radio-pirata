export const metadata = {
  title: 'Admin Panel | RadioPirata',
  description: 'Panel de administración de Radio Pirata',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
