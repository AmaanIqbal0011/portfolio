'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AdminLogin from '@/components/admin/admin-login';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default function AdminGitHubPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/admin/status')
      .then(res => res.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen py-12 px-5">
      <div className="mx-auto max-w-2xl">
        <AdminDashboard onDisconnect={() => setAuthenticated(false)} />
      </div>
    </div>
  );
}
