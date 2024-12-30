export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bills: {
        Row: {
          id: string
          user_id: string
          vendor_name: string
          invoice_number: string | null
          amount: number
          currency: string | null
          status: string | null
          due_date: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vendor_name: string
          invoice_number?: string | null
          amount: number
          currency?: string | null
          status?: string | null
          due_date: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vendor_name?: string
          invoice_number?: string | null
          amount?: number
          currency?: string | null
          status?: string | null
          due_date?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      entities: {
        Row: {
          id: string
          user_id: string
          monite_entity_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          monite_entity_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          monite_entity_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      monite_settings: {
        Row: {
          id: string
          user_id: string
          entity_id: string
          api_key: string
          environment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          entity_id: string
          api_key: string
          environment?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          entity_id?: string
          api_key?: string
          environment?: string
          created_at?: string
          updated_at?: string
        }
      }
      quick_pay_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          recipient_name: string
          recipient_email: string | null
          recipient_phone: string | null
          payment_method: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          recipient_name: string
          recipient_email?: string | null
          recipient_phone?: string | null
          payment_method: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          recipient_name?: string
          recipient_email?: string | null
          recipient_phone?: string | null
          payment_method?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      wonderpay_capital_applications: {
        Row: {
          id: string
          user_id: string
          product: string
          requested_amount: number
          approved_amount: number | null
          terms: number | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product: string
          requested_amount: number
          approved_amount?: number | null
          terms?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product?: string
          requested_amount?: number
          approved_amount?: number | null
          terms?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      create_monite_entity: {
        Args: Record<string, never>
        Returns: { entity_id: string }
      }
      get_dashboard_overview: {
        Args: Record<string, never>
        Returns: {
          total_receivables: number
          total_payables: number
          cash_flow: number
        }
      }
    }
    Enums: {
      payment_status: 'pending' | 'processing' | 'completed' | 'failed'
      capital_product: 'wonderflex' | 'wonderadvance'
      capital_status: 'pending' | 'approved' | 'rejected'
      environment: 'sandbox' | 'production'
    }
  }
}