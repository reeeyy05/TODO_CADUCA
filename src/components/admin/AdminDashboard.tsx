import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { createAdminRepository } from '../../database/repositories';
import type { AdminStats, UserWithStats } from '../../database/repositories/AdminRepository';
import { Users, Package, AlertTriangle, CheckCircle, Trash2, Search, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { perfil } = useAuthStore();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const repo = createAdminRepository();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);

    const [statsRes, usersRes] = await Promise.all([
      repo.getGlobalStats(),
      repo.getUsersWithStats(),
    ]);

    if (statsRes.error) {
      setError(statsRes.error.message);
    } else {
      setStats(statsRes.data);
    }

    if (usersRes.error) {
      setError(prev => prev ? `${prev} | ${usersRes.error!.message}` : usersRes.error!.message);
    } else {
      setUsers(usersRes.data ?? []);
    }

    setLoading(false);
  }

  async function handleDeleteUser(userId: string) {
    if (!confirm(t('admin.confirmDelete'))) return;

    setDeletingId(userId);
    const { error: err } = await repo.deleteUser(userId);

    if (err) {
      setError(err.message);
    } else {
      setUsers(prev => prev.filter(u => u.user_id !== userId));
      // Recargamos stats
      const statsRes = await repo.getGlobalStats();
      if (statsRes.data) setStats(statsRes.data);
    }
    setDeletingId(null);
  }

  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    return (
      (u.nombre_completo ?? '').toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.rol.toLowerCase().includes(term)
    );
  });

  if (perfil?.rol !== 'admin') {
    navigate('/products');
    return null;
  }

  return (
    <div className="admin-container">
      {/* Cabecera */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            <ShieldCheck size={28} />
            {t('admin.title')}
          </h1>
          <p className="admin-subtitle">{t('admin.subtitle')}</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="admin-error">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="admin-error-close">✕</button>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner" />
          <p>{t('admin.loading')}</p>
        </div>
      ) : (
        <>
          {/* Tarjetas de estadísticas */}
          {stats && (
            <div className="admin-stats-grid">
              <div className="admin-stat-card admin-stat--users">
                <div className="admin-stat-icon">
                  <Users size={24} />
                </div>
                <div>
                  <p className="admin-stat-value">{stats.totalUsers}</p>
                  <p className="admin-stat-label">{t('admin.stats.totalUsers')}</p>
                </div>
              </div>

              <div className="admin-stat-card admin-stat--products">
                <div className="admin-stat-icon">
                  <Package size={24} />
                </div>
                <div>
                  <p className="admin-stat-value">{stats.totalProducts}</p>
                  <p className="admin-stat-label">{t('admin.stats.totalProducts')}</p>
                </div>
              </div>

              <div className="admin-stat-card admin-stat--expired">
                <div className="admin-stat-icon">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <p className="admin-stat-value">{stats.expiredProducts}</p>
                  <p className="admin-stat-label">{t('admin.stats.expiredProducts')}</p>
                </div>
              </div>

              <div className="admin-stat-card admin-stat--active">
                <div className="admin-stat-icon">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="admin-stat-value">{stats.activeProducts}</p>
                  <p className="admin-stat-label">{t('admin.stats.activeProducts')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabla de usuarios */}
          <div className="admin-users-section">
            <div className="admin-users-header">
              <h2 className="admin-users-title">{t('admin.usersTable.title')}</h2>
              <div className="admin-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder={t('admin.usersTable.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{t('admin.usersTable.avatar')}</th>
                    <th>{t('admin.usersTable.name')}</th>
                    <th>{t('admin.usersTable.email')}</th>
                    <th>{t('admin.usersTable.role')}</th>
                    <th>{t('admin.usersTable.products')}</th>
                    <th>{t('admin.usersTable.expired')}</th>
                    <th>{t('admin.usersTable.registered')}</th>
                    <th>{t('admin.usersTable.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="admin-no-results">
                        {t('admin.usersTable.noResults')}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.user_id}>
                        <td>
                          <div className="admin-user-avatar">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt="" className="admin-avatar-img" />
                            ) : (
                              <span className="admin-avatar-initial">
                                {(user.nombre_completo || 'U').charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="admin-cell-name">
                          {user.nombre_completo || '—'}
                        </td>
                        <td className="admin-cell-email">{user.email}</td>
                        <td>
                          <span className={`admin-role-badge admin-role--${user.rol}`}>
                            {user.rol === 'admin' ? t('admin.roles.admin') : t('admin.roles.user')}
                          </span>
                        </td>
                        <td className="admin-cell-center">{user.total_productos}</td>
                        <td className="admin-cell-center">
                          <span className={user.productos_caducados > 0 ? 'admin-text-danger' : ''}>
                            {user.productos_caducados}
                          </span>
                        </td>
                        <td className="admin-cell-date">
                          {new Date(user.fecha_registro).toLocaleDateString()}
                        </td>
                        <td>
                          {user.user_id !== perfil?.user_id ? (
                            <button
                              onClick={() => handleDeleteUser(user.user_id)}
                              disabled={deletingId === user.user_id}
                              className="admin-btn-delete"
                              title={t('admin.usersTable.delete')}
                            >
                              {deletingId === user.user_id ? (
                                <div className="admin-spinner-small" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          ) : (
                            <span className="admin-you-badge">{t('admin.usersTable.you')}</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
