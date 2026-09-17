'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { Link2, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';

interface ConnectState {
  connected: boolean;
  lastSynced: string | null;
}

export default function GitHubConnect() {
  const [state, setState] = useState<ConnectState>({ connected: false, lastSynced: null });
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => res.json())
      .then(data => {
        setState({
          connected: data.connected,
          lastSynced: data.data?.lastSynced || null,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/github/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setState({
          connected: true,
          lastSynced: data.data?.lastSynced || new Date().toISOString(),
        });
        // Trigger page refresh to show new data
        window.location.reload();
      }
    } catch {}
    setSyncing(false);
  };

  if (loading) return null;

  if (state.connected) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium">GitHub Connected</span>
        </div>
        {state.lastSynced && (
          <span className="text-xs text-muted-foreground">
            Last synced: {new Date(state.lastSynced).toLocaleDateString()}
          </span>
        )}
        <button
          onClick={handleSync}
          disabled={syncing}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
        >
          {syncing ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <RefreshCw className="w-3 h-3" />
          )}
          Sync Projects
        </button>
      </div>
    );
  }

  return (
    <a
      href="/api/github/auth"
      className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-border bg-card/50 hover:border-brand/20 hover:bg-brand/5 transition-all duration-300"
    >
      <SiGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="text-sm font-medium">Connect GitHub</span>
      <Link2 className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
