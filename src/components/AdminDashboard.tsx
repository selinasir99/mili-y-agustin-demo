import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Lock,
  User,
  ArrowLeft,
  RefreshCw,
  Download,
  Search,
  Users,
  CheckCircle2,
  XCircle,
  Utensils,
  LogOut,
  SlidersHorizontal,
  Calendar
} from 'lucide-react';
import { RsvpSubmission } from '../types';
import { getAllRsvps, subscribeToRsvps } from '../lib/rsvpService';

interface AdminDashboardProps {
  onBackToMain: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToMain }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState<RsvpSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttendance, setFilterAttendance] = useState<'all' | 'yes' | 'no'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch records from Firestore persistent database
  const fetchRecords = async () => {
    setIsRefreshing(true);
    try {
      const data = await getAllRsvps();
      setRecords(data);
    } catch (e) {
      console.warn('Error fetching Firestore RSVPs:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Subscribe to real-time changes in Firestore when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    // 1. Initial fetch
    fetchRecords();

    // 2. Real-time persistent listener
    const unsubscribe = subscribeToRsvps(
      (liveData) => {
        setRecords(liveData);
      },
      (err) => {
        console.warn('Realtime subscription notice:', err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          sessionStorage.setItem('admin_authenticated', 'true');
          setLoading(false);
          return;
        }
      }

      // Fallback check if direct API returned 401 or in case of local handling
      if (username.trim() === 'admin' && password === 'admin') {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
      } else {
        setLoginError('Usuario o contraseña incorrectos. Verificá los datos.');
      }
    } catch {
      if (username.trim() === 'admin' && password === 'admin') {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
      } else {
        setLoginError('Usuario o contraseña incorrectos. Verificá los datos.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUsername('');
    setPassword('');
  };

  // Filtered list
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchSearch = rec.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rec.comments && rec.comments.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (rec.dietary && rec.dietary.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchAttending =
        filterAttendance === 'all' ||
        (filterAttendance === 'yes' && rec.attending === 'yes') ||
        (filterAttendance === 'no' && rec.attending === 'no');

      return matchSearch && matchAttending;
    });
  }, [records, searchQuery, filterAttendance]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalResponses = records.length;
    const attendingCount = records.filter((r) => r.attending === 'yes').length;
    const notAttendingCount = records.filter((r) => r.attending === 'no').length;
    const totalGuests = records.reduce((acc, r) => acc + (r.attending === 'yes' ? (r.peopleCount || 1) : 0), 0);
    const specialDietCount = records.filter((r) => r.attending === 'yes' && r.dietary && r.dietary !== 'Ninguno').length;

    return {
      totalResponses,
      attendingCount,
      notAttendingCount,
      totalGuests,
      specialDietCount,
    };
  }, [records]);

  // Export to CSV
  const handleExportCsv = () => {
    if (records.length === 0) return;

    const headers = ['ID', 'Fecha y Hora', 'Nombre y Apellido', '¿Asiste?', 'Cantidad de Personas', 'Requerimientos Alimentarios', 'Comentarios'];
    const rows = records.map((r, i) => [
      i + 1,
      `"${new Date(r.createdAt).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.attending === 'yes' ? 'Sí' : 'No',
      r.attending === 'yes' ? r.peopleCount : 0,
      `"${(r.dietary || 'Ninguno').replace(/"/g, '""')}"`,
      `"${(r.comments || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `confirmaciones_boda_mili_y_agus_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] bg-grain py-16 px-6 flex flex-col items-center justify-center select-none text-[#2A221E]">
        {/* Back Button */}
        <div className="w-full max-w-md mb-8 flex justify-start">
          <button
            onClick={onBackToMain}
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#6E645A] hover:text-[#2A221E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la invitación</span>
          </button>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#FFFFFF] rounded-3xl p-8 sm:p-10 border border-[#E8E2D8] shadow-[0_12px_40px_rgba(42,34,30,0.05)] space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center mx-auto text-[#2A221E] shadow-sm">
              <Lock className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2A221E] tracking-tight pt-2">
              Panel de Administración
            </h2>
            <p className="font-sans text-xs text-[#9C9286] tracking-wider uppercase">
              Confirmaciones de Boda · Mili & Agustín
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-sans text-center">
                {loginError}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9C9286]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9C9286]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium shadow-md cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Ingresando...' : 'INGRESAR'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 2. LOGGED IN RESPONSES DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAF7F2] bg-grain py-10 sm:py-14 px-4 sm:px-8 text-[#2A221E] selection:bg-[#E8E2D8]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-[#2A221E] hover:border-[#656D4A]/50 text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la invitación</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchRecords}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-[#2A221E] hover:border-[#656D4A]/50 text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all shadow-xs cursor-pointer"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#656D4A]' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={handleExportCsv}
              disabled={records.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#656D4A]/40 text-[#656D4A] hover:bg-[#656D4A] hover:text-white text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all shadow-xs cursor-pointer disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel (CSV)</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-red-200 text-red-600 hover:bg-red-50 text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all shadow-xs cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-1">
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#656D4A] font-medium">
            REGISTRO PERSISTENTE EN TIEMPO REAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#2A221E] tracking-tight">
            Respuestas de Asistencia
          </h1>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Responses */}
          <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8E2D8] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#9C9286]">
              <span className="text-xs uppercase tracking-wider font-sans font-medium">Formularios</span>
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-[#2A221E]">
              {stats.totalResponses}
            </p>
            <p className="text-[11px] text-[#9C9286] font-sans">Total de envíos registrados</p>
          </div>

          {/* Attending Guests */}
          <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8E2D8] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#656D4A]">
              <span className="text-xs uppercase tracking-wider font-sans font-medium">Total de invitados confirmados</span>
              <Users className="w-4 h-4 text-[#656D4A]" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-[#656D4A]">
              {stats.totalGuests}
            </p>
            <p className="text-[11px] text-[#656D4A] font-sans font-medium">{stats.attendingCount} {stats.attendingCount === 1 ? 'respuesta positiva' : 'respuestas positivas'}</p>
          </div>

          {/* Not Attending */}
          <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8E2D8] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#9C9286]">
              <span className="text-xs uppercase tracking-wider font-sans font-medium">No Asisten</span>
              <XCircle className="w-4 h-4 text-[#9C9286]" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-[#9C9286]">
              {stats.notAttendingCount}
            </p>
            <p className="text-[11px] text-[#9C9286] font-sans">Personas que no asistirán</p>
          </div>

          {/* Special Dietary */}
          <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8E2D8] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#2A221E]">
              <span className="text-xs uppercase tracking-wider font-sans font-medium">Dietas Especiales</span>
              <Utensils className="w-4 h-4 text-[#656D4A]" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl font-normal text-[#2A221E]">
              {stats.specialDietCount}
            </p>
            <p className="text-[11px] text-[#9C9286] font-sans">Vegano / Celíaco / etc.</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9C9286]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, dieta o comentario..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-xs sm:text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors"
            />
          </div>

          {/* Attendance Filter Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterAttendance('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all cursor-pointer ${
                filterAttendance === 'all'
                  ? 'bg-[#2A221E] text-[#FAF7F2]'
                  : 'bg-[#FAF7F2] text-[#6E645A] border border-[#E8E2D8] hover:border-[#656D4A]'
              }`}
            >
              Todos ({records.length})
            </button>
            <button
              onClick={() => setFilterAttendance('yes')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all cursor-pointer ${
                filterAttendance === 'yes'
                  ? 'bg-[#656D4A] text-white'
                  : 'bg-[#FAF7F2] text-[#6E645A] border border-[#E8E2D8] hover:border-[#656D4A]'
              }`}
            >
              Asisten ({records.filter((r) => r.attending === 'yes').length})
            </button>
            <button
              onClick={() => setFilterAttendance('no')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all cursor-pointer ${
                filterAttendance === 'no'
                  ? 'bg-[#9C9286] text-white'
                  : 'bg-[#FAF7F2] text-[#6E645A] border border-[#E8E2D8] hover:border-[#656D4A]'
              }`}
            >
              No ({records.filter((r) => r.attending === 'no').length})
            </button>
          </div>
        </div>

        {/* Responses Table */}
        <div className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl border border-[#E8E2D8] shadow-[0_8px_30px_rgba(42,34,30,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm font-sans">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E8E2D8] text-[11px] uppercase tracking-[0.18em] text-[#6E645A] font-semibold">
                  <th className="py-4 px-4 sm:px-6 w-12 text-center">#</th>
                  <th className="py-4 px-4 sm:px-6">Fecha y Hora</th>
                  <th className="py-4 px-4 sm:px-6">Nombre y Apellido</th>
                  <th className="py-4 px-4 sm:px-6">¿Asiste?</th>
                  <th className="py-4 px-4 sm:px-6 text-center">Cantidad de personas</th>
                  <th className="py-4 px-4 sm:px-6">Requerimiento Alimentario</th>
                  <th className="py-4 px-4 sm:px-6 min-w-[200px]">Comentarios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]/60">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-[#9C9286]">
                      <div className="max-w-sm mx-auto space-y-2">
                        <Users className="w-8 h-8 text-[#9C9286]/50 mx-auto" />
                        <p className="font-serif text-lg text-[#2A221E]">No se encontraron respuestas</p>
                        <p className="text-xs">
                          {records.length === 0
                            ? 'Aún no se ha recibido ninguna confirmación. Los registros aparecerán aquí automáticamente en tiempo real.'
                            : 'Ningún registro coincide con los filtros de búsqueda aplicados.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item, index) => {
                    const dateFormatted = new Date(item.createdAt).toLocaleString('es-AR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'America/Argentina/Buenos_Aires',
                    });

                    return (
                      <tr key={item.id || index} className="hover:bg-[#FAF7F2]/60 transition-colors">
                        {/* Index */}
                        <td className="py-4 px-4 sm:px-6 text-center text-xs font-mono text-[#9C9286]">
                          {index + 1}
                        </td>

                        {/* Date & Time */}
                        <td className="py-4 px-4 sm:px-6 text-xs text-[#6E645A] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#9C9286]" />
                            <span>{dateFormatted}</span>
                          </div>
                        </td>

                        {/* Full Name */}
                        <td className="py-4 px-4 sm:px-6 font-medium text-[#2A221E] whitespace-nowrap">
                          {item.fullName}
                        </td>

                        {/* Attendance Status */}
                        <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                          {item.attending === 'yes' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#656D4A]/10 text-[#656D4A] border border-[#656D4A]/20">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#656D4A]" />
                              <span>Sí, asistirá</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                              <XCircle className="w-3.5 h-3.5 text-stone-400" />
                              <span>No asistirá</span>
                            </span>
                          )}
                        </td>

                        {/* People Count */}
                        <td className="py-4 px-4 sm:px-6 text-center font-mono font-semibold text-[#2A221E]">
                          {item.attending === 'yes' ? item.peopleCount : 0}
                        </td>

                        {/* Dietary Requirement */}
                        <td className="py-4 px-4 sm:px-6">
                          {item.dietary && item.dietary !== 'Ninguno' ? (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                              {item.dietary}
                            </span>
                          ) : (
                            <span className="text-xs text-[#9C9286]">Ninguno</span>
                          )}
                        </td>

                        {/* Comments */}
                        <td className="py-4 px-4 sm:px-6 text-xs text-[#6E645A] leading-relaxed">
                          {item.comments ? item.comments : <span className="text-[#9C9286] italic">—</span>}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          {filteredRecords.length > 0 && (
            <div className="bg-[#FAF7F2] px-6 py-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E645A] gap-2 font-sans">
              <span>Mostrando {filteredRecords.length} de {records.length} respuestas registradas</span>
              <span className="font-medium text-[#2A221E]">
                Total de invitados confirmados en vista: {filteredRecords.reduce((acc, r) => acc + (r.attending === 'yes' ? (r.peopleCount || 1) : 0), 0)} personas
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
