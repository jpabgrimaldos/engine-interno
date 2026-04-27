import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'
import { CalendarDays, TrendingUp, Layers, Users } from 'lucide-react'

type Period = 'today' | '7d' | '30d'
type Country = 'all' | 'CO' | 'MX'
type ChartTab = 'tendencia' | 'carga' | 'comparativo'

const MOCK_DAILY: { date: string; count: number }[] = []

const KPI_CARD = ({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
      <Icon size={20} className="text-indigo-600" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
)

const EmptyChart = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-2">
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <TrendingUp size={20} className="text-gray-300" />
    </div>
    <p className="text-sm">{message}</p>
  </div>
)

const TAB_CLASSES = (active: boolean) =>
  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
    active
      ? 'bg-indigo-600 text-white shadow-sm'
      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
  }`

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>('7d')
  const [country, setCountry] = useState<Country>('all')
  const [chartTab, setChartTab] = useState<ChartTab>('tendencia')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const periodLabel: Record<Period, string> = {
    today: 'Hoy',
    '7d': '7 días',
    '30d': '30 días',
  }

  const avgLine = MOCK_DAILY.length
    ? MOCK_DAILY.reduce((s, d) => s + d.count, 0) / MOCK_DAILY.length
    : 0

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard de Asignaciones</h1>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Country */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value as Country)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="all">Todos los países</option>
          <option value="CO">Colombia</option>
          <option value="MX">México</option>
        </select>

        {/* Period */}
        <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
          {(['today', '7d', '30d'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-r border-gray-200 last:border-0
                ${period === p ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {periodLabel[p]}
            </button>
          ))}
        </div>

        {/* Group filter */}
        <select
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          defaultValue=""
        >
          <option value="">Todos los grupos</option>
        </select>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="dd/mm/aaaa"
              className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-40"
            />
          </div>
          <span className="text-gray-400 text-sm">—</span>
          <div className="relative">
            <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="dd/mm/aaaa"
              className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-40"
            />
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPI_CARD label="Asignados hoy" value={0} icon={TrendingUp} />
        <KPI_CARD label="Última semana" value={0} icon={CalendarDays} />
        <KPI_CARD label="Histórico" value={0} sub="leads asignados" icon={Layers} />
        <KPI_CARD label="Grupos activos" value="0 de 0" icon={Users} />
      </div>

      {/* Chart card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {/* Chart tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button className={TAB_CLASSES(chartTab === 'tendencia')} onClick={() => setChartTab('tendencia')}>
            Tendencia de Asignaciones
          </button>
          <button className={TAB_CLASSES(chartTab === 'carga')} onClick={() => setChartTab('carga')}>
            Carga por Grupo
          </button>
          <button className={TAB_CLASSES(chartTab === 'comparativo')} onClick={() => setChartTab('comparativo')}>
            Comparativo entre Grupos
          </button>
        </div>

        {/* Chart content */}
        {chartTab === 'tendencia' && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Leads asignados por día</p>
            <p className="text-xs text-gray-400 mb-4">
              La línea punteada indica el promedio del periodo ({periodLabel[period]}).
            </p>
            {MOCK_DAILY.length === 0 ? (
              <EmptyChart message="Sin datos para el periodo seleccionado" />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={MOCK_DAILY} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <ReferenceLine y={avgLine} stroke="#a5b4fc" strokeDasharray="6 3" />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    fill="url(#colorCount)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        {chartTab === 'carga' && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-4">Leads asignados por grupo</p>
            {MOCK_DAILY.length === 0 ? (
              <EmptyChart message="Sin datos para el periodo seleccionado" />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={[]} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        {chartTab === 'comparativo' && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-4">Comparativo de tendencias por grupo</p>
            {MOCK_DAILY.length === 0 ? (
              <EmptyChart message="Sin datos para el periodo seleccionado" />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={[]} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
