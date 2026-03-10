import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
// Importamos los dos repositorios
import { createAdminRepository, createUltimosAccesosRepository } from '../../database/repositories';
import type { AdminStats, UserWithStats } from '../../database/repositories/AdminRepository';
import { Users, Package, AlertTriangle, CheckCircle, Trash2, Search, ShieldCheck, BarChart3, LayoutDashboard } from 'lucide-react';
// Importamos la gráfica y su tipo
import { MensualChart, type AccesoData } from '../charts/MensualChart';

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

  // Estados para la gráfica
  const [showCharts, setShowCharts] = useState(false);
  const [chartData, setChartData] = useState<AccesoData[]>([]);

  // Instanciamos los repositorios
  const repo = createAdminRepository();
  const repoAccesos = createUltimosAccesosRepository();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);

    // Pedimos las 3 cosas a la vez a Supabase
    const [statsRes, usersRes, accesosRes] = await Promise.all([
      repo.getGlobalStats(),
      repo.getUsersWithStats(),
      repoAccesos.getAccesosUltimos30Dias(),
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

    // LÓGICA JUNIOR PARA CREAR LOS 30 DÍAS EXACTOS ("Día 1", "Día 2"...)
    if (accesosRes.data) {
      const diasDelMes: AccesoData[] = [];

      // 1. Creamos 30 días vacíos hacia atrás desde hoy
      for (let i = 29; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        const fechaISO = fecha.toISOString().split('T')[0]; // "2026-03-10"

        diasDelMes.push({
          name: `Día ${fecha.getDate()}`, // Ej: "Día 10"
          value: 0,
          _fechaReal: fechaISO // Campo oculto para buscar más fácil luego
        } as any);
      }

      // 2. Rellenamos esos días con los datos reales que llegan de Supabase
      accesosRes.data.forEach((item) => {
        // Tu supabase devuelve "day" y "total_logins"
        const fechaSupabase = new Date(item.day).toISOString().split('T')[0];
        const diaEncontrado = diasDelMes.find(d => (d as any)._fechaReal === fechaSupabase);

        if (diaEncontrado) {
          diaEncontrado.value = item.total_logins;
        }
      });

      // 3. Pasamos los datos listos a la gráfica
      setChartData(diasDelMes);
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
    // ESTO ESTIRA LA GRÁFICA: Eliminamos el límite de 1200px de tu admin.css cuando showCharts es true
    <div
      className="admin-container"
      style={{
        maxWidth: showCharts ? '100%' : '1200px',
        padding: showCharts ? '2rem 3%' : '2rem 1.5rem',
        transition: 'max-width 0.3s ease'
      }}
    >
      <div className="admin-header flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h1 className="admin-title flex items-center gap-2">
            <ShieldCheck size={28} />
            {t('admin.title')}
          </h1>
          <p className="admin-subtitle">{t('admin.subtitle')}</p>
        </div>

        <button
          onClick={() => setShowCharts(!showCharts)}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 rounded-lg transition-colors font-medium shadow-sm"
        >
          {showCharts ? (
            <>
              <LayoutDashboard size={18} />
              Volver al Tablero
            </>
          ) : (
            <>
              <BarChart3 size={18} />
              Ver Gráficas
            </>
          )}
        </button>
      </div>

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
          {showCharts ? (
            <div className="animate-fade-in w-full mb-8">
              {/* Renderizamos tu MensualChart pasándole el chartData completo */}
              <MensualChart
                title="Usuarios registrados en los últimos 30 días"
                data={chartData}
              />
            </div>
          ) : (
            <div className="animate-fade-in w-full">
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
            </div>
          )}
        </>
      )}
    </div>
  );
}