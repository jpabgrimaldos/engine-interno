import type { User as SupabaseUser } from '@supabase/supabase-js'

export type { SupabaseUser }

export type Country = 'CO' | 'MX'
export type AssignmentMethod = 'round_robin' | 'weighted_round_robin'
export type AbsenceType = 'vacation' | 'disability'
export type LeadStatus = 'assigned' | 'unmatched'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar_url?: string
}

export interface Group {
  id: number
  name: string
  assignment_method: AssignmentMethod
  country: Country
  is_active: boolean
  leader_id: number | null
  priority: number
  sellers_count: number
  active_sellers_count: number
  leads_today: number
}

export interface Seller {
  id: number
  hubspot_owner_id: string
  email: string
  name: string
  is_active: boolean
  absence_type: AbsenceType | null
  absence_start: string | null
  absence_end: string | null
}

export interface GroupSeller extends Seller {
  weight: number
  is_active_in_group: boolean
}

export interface Lead {
  nid: string
  status: LeadStatus
  group_name: string | null
  seller_name: string | null
  seller_email: string | null
  assignment_method: AssignmentMethod | null
  assigned_at: string | null
}

export interface LeadAssignment {
  id: number
  group_name: string | null
  seller_name: string | null
  assignment_method: AssignmentMethod | null
  assigned_at: string
  created_at: string
}

export interface LeadDetail extends Lead {
  hubspot_deal_id: string | null
  assignments: LeadAssignment[]
}

export interface DailySeries {
  date: string
  count: number
}

export interface DashboardSummary {
  assigned_today: number
  assigned_week: number
  assigned_total: number
  active_groups: number
  total_groups: number
  daily_series: DailySeries[]
}

export interface GroupMetricSeries {
  group_id: number
  group_name: string
  country: Country
  data: DailySeries[]
}

export interface PlatformUser {
  id: number
  email: string
  name: string
  country: Country
  role: 'admin' | 'superadmin'
  is_active: boolean
  created_at: string
}

export interface AuditLogItem {
  id: number
  event_type: string
  actor_email: string
  target_type: string
  target_id: string
  payload: Record<string, unknown>
  created_at: string
}

export interface AuditLogResponse {
  items: AuditLogItem[]
  total: number
  page: number
  page_size: number
}

export interface RuleCondition {
  field: string
  operator: string
  value: string | number | boolean
}

export interface RuleGroup {
  id: number
  name: string
  conditions: RuleCondition[]
  logical_operator: 'AND' | 'OR'
  priority: number
  is_active: boolean
}
