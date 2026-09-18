'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import {
  Link2, Unlink, RefreshCw, Loader2, CheckCircle,
  Star, ExternalLink, ArrowLeft, Image, Save, Globe, Award, Plus, Trash2,
} from 'lucide-react';
import type { GitHubCache } from '@/lib/github/types';

type Tab = 'projects' | 'certificates';
type Filter = 'all' | 'visible' | 'hidden' | 'with-image' | 'live';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Visible', value: 'visible' },
  { label: 'Hidden', value: 'hidden' },
  { label: 'With Image', value: 'with-image' },
  { label: 'Live', value: 'live' },
];

interface Certificate {
  name: string;
  score: string;
  issuer: string;
  date: string;
  link: string;
}

interface Props {
  onDisconnect: () => void;
}

export default function AdminDashboard({ onDisconnect }: Props) {
  const [data, setData] = useState<GitHubCache | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [hiddenRepos, setHiddenRepos] = useState<string[]>([]);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  // Certificates state
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certLoading, setCertLoading] = useState(true);
  const [certSaving, setCertSaving] = useState(false);
  const [certMessage, setCertMessage] = useState('');
  const [hasCertChanges, setHasCertChanges] = useState(false);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/github/repositories').then(res => res.json()),
      fetch('/api/admin/projects').then(res => res.json()),
    ])
      .then(([repoData, settings]) => {
        setData(repoData.data);
        setHiddenRepos(settings.hidden || []);
        setCustomImages(settings.customImages || {});
        setHasChanges(false);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const fetchCerts = () => {
    setCertLoading(true);
    fetch('/api/admin/certificates')
      .then(res => res.json())
      .then(data => {
        setCertificates(data.certificates || []);
        setHasCertChanges(false);
      })
      .catch(() => {})
      .finally(() => setCertLoading(false));
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      fetchData();
      fetchCerts();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Project handlers
  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const res = await fetch('/api/github/sync', { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
        setSyncMessage('Projects synced successfully.');
        setTimeout(() => setSyncMessage(''), 3000);
      } else {
        setSyncMessage('Sync failed. Try again.');
      }
    } catch {
      setSyncMessage('Sync failed. Check connection.');
    }
    setSyncing(false);
  };

  const handleDisconnect = async () => {
    if (!confirm('Disconnect GitHub? Cached data will remain until next deploy.')) return;
    setDisconnecting(true);
    try {
      await fetch('/api/github/disconnect', { method: 'POST' });
      onDisconnect();
    } catch {}
    setDisconnecting(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  };

  const toggleRepoVisibility = (repoName: string) => {
    const newHidden = hiddenRepos.includes(repoName)
      ? hiddenRepos.filter(n => n !== repoName)
      : [...hiddenRepos, repoName];
    setHiddenRepos(newHidden);
    setHasChanges(true);
  };

  const updateCustomImage = (repoName: string, url: string) => {
    const newImages = { ...customImages };
    if (url.trim()) {
      newImages[repoName] = url.trim();
    } else {
      delete newImages[repoName];
    }
    setCustomImages(newImages);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hidden: hiddenRepos, customImages }),
      });
      if (res.ok) {
        setSaveMessage('Saved successfully!');
        setHasChanges(false);
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        const body = await res.json().catch(() => null);
        const detail = body?.details || body?.error || `HTTP ${res.status}`;
        setSaveMessage(`Save failed: ${detail}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setSaveMessage(`Save failed: ${msg}`);
    }
    setSaving(false);
  };

  // Certificate handlers
  const addCertificate = () => {
    setCertificates([...certificates, { name: '', score: '', issuer: '', date: '', link: '' }]);
    setHasCertChanges(true);
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    const updated = [...certificates];
    updated[index] = { ...updated[index], [field]: value };
    setCertificates(updated);
    setHasCertChanges(true);
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
    setHasCertChanges(true);
  };

  const handleSaveCerts = async () => {
    setCertSaving(true);
    setCertMessage('');
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificates }),
      });
      if (res.ok) {
        setCertMessage('Certificates saved!');
        setHasCertChanges(false);
        setTimeout(() => setCertMessage(''), 3000);
      } else {
        const body = await res.json().catch(() => null);
        const detail = body?.details || body?.error || `HTTP ${res.status}`;
        setCertMessage(`Save failed: ${detail}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setCertMessage(`Save failed: ${msg}`);
    }
    setCertSaving(false);
  };

  const repos = data?.repositories || [];
  const filteredRepos = repos.filter(repo => {
    const isHidden = hiddenRepos.includes(repo.name);
    const hasImage = !!customImages[repo.name];
    const hasLive = !!repo.homepage;
    switch (filter) {
      case 'visible': return !isHidden;
      case 'hidden': return isHidden;
      case 'with-image': return hasImage;
      case 'live': return hasLive;
      default: return true;
    }
  });

  const profile = data?.profile;
  const stats = data?.stats;
  const lastSynced = data?.lastSynced;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
        {([
          { label: 'Projects', value: 'projects' as Tab, icon: SiGithub },
          { label: 'Certificates', value: 'certificates' as Tab, icon: Award },
        ]).map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <>
          {/* Connection Status */}
          <div className="p-5 rounded-2xl border border-border bg-card/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10">
                  <SiGithub className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">GitHub Account</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  {profile && (
                    <p className="text-xs text-muted-foreground">
                      @{profile.login} &bull; {profile.public_repos} repos &bull; {profile.followers} followers
                    </p>
                  )}
                </div>
              </div>
            </div>
            {lastSynced && (
              <p className="text-xs text-muted-foreground mb-4">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </p>
            )}
            {syncMessage && (
              <p className="text-xs text-emerald-500 mb-3">{syncMessage}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {syncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                Sync GitHub
              </button>
              <button
                onClick={handleDisconnect}
                disabled={disconnecting}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-50"
              >
                {disconnecting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Unlink className="w-3 h-3" />}
                Disconnect
              </button>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Repos', value: stats.publicRepos },
                { label: 'Followers', value: stats.followers },
                { label: 'Stars', value: stats.totalStars },
                { label: 'Languages', value: stats.topLanguages.length },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-xl border border-border bg-card/50 text-center">
                  <span className="text-xl font-bold gradient-text">{item.value}</span>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Project Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Project Management</h2>
              <div className="flex items-center gap-2">
                {saveMessage && (
                  <span className={`text-xs ${saveMessage.includes('fail') ? 'text-red-500' : 'text-emerald-500'}`}>
                    {saveMessage}
                  </span>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-all disabled:opacity-50 ${
                    hasChanges
                      ? 'bg-brand text-white hover:opacity-90'
                      : 'bg-border text-muted-foreground'
                  }`}
                >
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save Changes
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    filter === f.value
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground border border-border hover:border-brand/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {filteredRepos.map((repo, index) => {
                    const isHidden = hiddenRepos.includes(repo.name);
                    const hasImage = !!customImages[repo.name];
                    return (
                      <motion.div
                        key={repo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-3 rounded-xl border transition-colors ${
                          isHidden
                            ? 'border-border/40 bg-card/20 opacity-60'
                            : 'border-border bg-card/50 hover:bg-card/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground font-mono">{index + 1}.</span>
                              <span className="text-sm font-medium truncate">{repo.name}</span>
                              {isHidden && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-red-500/10 text-red-500">Hidden</span>
                              )}
                              {hasImage && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/10 text-emerald-500">Image</span>
                              )}
                              {repo.homepage && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-blue-500/10 text-blue-500">Live</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{repo.description || 'No description'}</p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {repo.language && (
                              <span className="text-xs text-muted-foreground hidden sm:block">{repo.language}</span>
                            )}
                            {repo.stargazers_count > 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                                <Star className="w-3 h-3" />{repo.stargazers_count}
                              </span>
                            )}
                            <button
                              onClick={() => toggleRepoVisibility(repo.name)}
                              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isHidden ? 'bg-border' : 'bg-brand'}`}
                            >
                              <motion.div
                                className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                                animate={{ left: isHidden ? '2px' : '22px' }}
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Image className="w-3 h-3 text-muted-foreground shrink-0" />
                          <input
                            type="url"
                            placeholder="Preview image URL (optional)"
                            value={customImages[repo.name] || ''}
                            onChange={(e) => updateCustomImage(repo.name, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-brand/40 focus:outline-none transition-colors"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {filteredRepos.length === 0 && (
                  <div className="text-center py-10 text-sm text-muted-foreground">No repos match this filter.</div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Certificates</h2>
              <div className="flex items-center gap-2">
                {certMessage && (
                  <span className={`text-xs ${certMessage.includes('fail') ? 'text-red-500' : 'text-emerald-500'}`}>
                    {certMessage}
                  </span>
                )}
                <button
                  onClick={addCertificate}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
                <button
                  onClick={handleSaveCerts}
                  disabled={certSaving || !hasCertChanges}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-all disabled:opacity-50 ${
                    hasCertChanges
                      ? 'bg-brand text-white hover:opacity-90'
                      : 'bg-border text-muted-foreground'
                  }`}
                >
                  {certSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  Save
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Add and manage your certificates. They will appear on the portfolio.
            </p>

            {certLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl border border-border bg-card/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground font-mono">#{index + 1}</span>
                        <button
                          onClick={() => removeCertificate(index)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Certificate name"
                          value={cert.name}
                          onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                          className="col-span-2 px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-brand/40 focus:outline-none transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Score (e.g., 97%)"
                          value={cert.score}
                          onChange={(e) => updateCertificate(index, 'score', e.target.value)}
                          className="px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-brand/40 focus:outline-none transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Issuer (e.g., GIAIC)"
                          value={cert.issuer}
                          onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                          className="px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-brand/40 focus:outline-none transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Year (e.g., 2024)"
                          value={cert.date}
                          onChange={(e) => updateCertificate(index, 'date', e.target.value)}
                          className="px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-brand/40 focus:outline-none transition-colors"
                        />
                        <input
                          type="url"
                          placeholder="Certificate link (optional)"
                          value={cert.link}
                          onChange={(e) => updateCertificate(index, 'link', e.target.value)}
                          className="px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-brand/40 focus:outline-none transition-colors"
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {certificates.length === 0 && (
                  <div className="text-center py-10 text-sm text-muted-foreground">
                    No certificates yet. Click &quot;Add&quot; to create one.
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
