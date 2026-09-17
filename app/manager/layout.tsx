import Link from 'next/link'
import { Building2, Users, Wrench, Inbox } from 'lucide-react'

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/manager" className="flex items-center px-2 text-gray-900">
                <Building2 className="w-6 h-6 mr-2 text-blue-600" />
                <span className="font-bold text-xl">Immoben</span>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                <NavLink href="/manager" icon={Inbox}>
                  Demandes
                </NavLink>
                <NavLink href="/manager/properties" icon={Building2}>
                  Biens
                </NavLink>
                <NavLink href="/manager/tenants" icon={Users}>
                  Locataires
                </NavLink>
                <NavLink href="/manager/artisans" icon={Wrench}>
                  Artisans
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: any
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
    >
      <Icon className="w-4 h-4 mr-2" />
      {children}
    </Link>
  )
}
