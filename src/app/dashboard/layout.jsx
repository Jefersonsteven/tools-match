"use client"

import Link from "next/link";


export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <div >
          <div > 
            <p>Dashboard</p>
          </div>
          <div>
            <div >
              <Link href="/dashboard/users">Users</Link>
            </div>
            <div >
              <Link href="/dashboard/payments">Payments</Link>
            </div>
            <div >
              <Link href="/dashboard/publications">Publications</Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
