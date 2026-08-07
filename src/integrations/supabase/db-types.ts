// Hand-written DB types for the shared CALP Training Hub database.
// (src/integrations/supabase/types.ts is migration-managed and locked to this
// project's own Cloud integration, which we intentionally do not enable here;
// this project reads/writes the shared external database via anon RLS.)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type CourseLanguage = "English" | "French" | "Spanish" | "Arabic";
export type CourseFormatType = "F2F" | "Online" | "Hybrid";
export type CourseMaterialType = "Overview" | "Course Page" | "Training Materials";
export type CourseFormType = "Application" | "Evaluation";
export type TrainingRegion =
  | "WCAF"
  | "ESAF"
  | "MENA"
  | "Asia"
  | "LAC"
  | "Europe"
  | "Global";
export type TrainingState = "open" | "live" | "completed" | "cancelled";
export type ParticipantGender = "Male" | "Female";
export type OrganisationType =
  | "NNGO"
  | "INGO"
  | "UN Agency"
  | "RCRC Society"
  | "Government"
  | "Donor"
  | "Independent Consultant"
  | "Private Sector"
  | "Civil Society"
  | "Other";
export type AppRole = "superadmin" | "admin" | "external_admin" | "trainer";

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          short_code: string;
          title: string;
          description: string | null;
          objectives: string | null;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          short_code: string;
          title: string;
          description?: string | null;
          objectives?: string | null;
          tags?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [];
      };
      course_languages: {
        Row: {
          id: string;
          course_id: string;
          language: CourseLanguage;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          language: CourseLanguage;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["course_languages"]["Insert"]>;
        Relationships: [];
      };
      course_formats: {
        Row: {
          id: string;
          course_id: string;
          format_type: CourseFormatType;
          duration_days: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          format_type: CourseFormatType;
          duration_days?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["course_formats"]["Insert"]>;
        Relationships: [];
      };
      course_materials: {
        Row: {
          id: string;
          course_id: string;
          format_id: string | null;
          material_type: CourseMaterialType;
          language: CourseLanguage | null;
          url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          format_id?: string | null;
          material_type: CourseMaterialType;
          language?: CourseLanguage | null;
          url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["course_materials"]["Insert"]>;
        Relationships: [];
      };
      course_forms: {
        Row: {
          id: string;
          course_id: string;
          format_id: string | null;
          form_type: CourseFormType;
          language: CourseLanguage;
          url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          format_id?: string | null;
          form_type: CourseFormType;
          language: CourseLanguage;
          url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["course_forms"]["Insert"]>;
        Relationships: [];
      };
      trainers: {
        Row: {
          id: string;
          ref: string;
          first_name: string;
          last_name: string;
          email: string;
          country: string;
          nationality: string | null;
          region: TrainingRegion | null;
          organisation: string | null;
          photo_path: string | null;
          lang_english: boolean;
          lang_french: boolean;
          lang_spanish: boolean;
          lang_arabic: boolean;
          other_language: string | null;
          gender: ParticipantGender | null;
          share_on_website: boolean;
          status: string;
          tot_delivery: boolean;
          co_facilitator_assessment: boolean;
          comments: string | null;
          user_id: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ref: string;
          first_name: string;
          last_name: string;
          email: string;
          country?: string;
          nationality?: string | null;
          region?: TrainingRegion | null;
          organisation?: string | null;
          photo_path?: string | null;
          lang_english?: boolean;
          lang_french?: boolean;
          lang_spanish?: boolean;
          lang_arabic?: boolean;
          other_language?: string | null;
          gender?: ParticipantGender | null;
          share_on_website?: boolean;
          status?: string;
          tot_delivery?: boolean;
          co_facilitator_assessment?: boolean;
          comments?: string | null;
          user_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["trainers"]["Insert"]>;
        Relationships: [];
      };
      trainer_courses: {
        Row: {
          id: string;
          trainer_id: string;
          course_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          trainer_id: string;
          course_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["trainer_courses"]["Insert"]>;
        Relationships: [];
      };
      trainings: {
        Row: {
          id: string;
          ref: string;
          course_id: string;
          trainer_id: string;
          co_trainer_id: string | null;
          co_trainer_name: string | null;
          city: string;
          country: string;
          region: TrainingRegion | null;
          start_date: string;
          end_date: string;
          duration_days: number | null;
          language: string;
          modality: string;
          training_type: string;
          funding_category: string;
          capacity: number;
          application_deadline: string | null;
          application_token: string | null;
          status: TrainingState;
          lifecycle: "upcoming" | "ongoing";
          completed_at: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ref: string;
          course_id: string;
          trainer_id: string;
          co_trainer_id?: string | null;
          co_trainer_name?: string | null;
          city?: string;
          country?: string;
          region?: TrainingRegion | null;
          start_date: string;
          end_date: string;
          duration_days?: number | null;
          language?: string;
          modality?: string;
          training_type?: string;
          funding_category?: string;
          capacity?: number;
          application_deadline?: string | null;
          application_token?: string | null;
          status?: TrainingState;
          lifecycle?: "upcoming" | "ongoing";
          completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["trainings"]["Insert"]>;
        Relationships: [];
      };
      participants: {
        Row: {
          id: string;
          training_id: string;
          name: string;
          email: string;
          gender: ParticipantGender | null;
          country: string | null;
          organisation: string | null;
          organisation_type: OrganisationType | null;
          position: string | null;
          role: string | null;
          language: string | null;
          status: string;
          attendance_percent: number | null;
          certificate_name: string | null;
          evaluation_completed_at: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          training_id: string;
          name: string;
          email: string;
          gender?: ParticipantGender | null;
          country?: string | null;
          organisation?: string | null;
          organisation_type?: OrganisationType | null;
          position?: string | null;
          role?: string | null;
          language?: string | null;
          status?: string;
          attendance_percent?: number | null;
          certificate_name?: string | null;
          evaluation_completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["participants"]["Insert"]>;
        Relationships: [];
      };
      contact_enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_enquiries"]["Insert"]>;
        Relationships: [];
      };
      certificates: {
        Row: {
          id: string;
          training_id: string;
          participant_id: string;
          certificate_name: string;
          issued_on: string;
          issued_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["certificates"]["Row"]> & {
          training_id: string;
          participant_id: string;
          certificate_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["certificates"]["Row"]>;
        Relationships: [];
      };
      webinars: {
        Row: {
          id: string;
          name: string;
          description: string;
          host_name: string;
          platform: string;
          link: string;
          start_at: string;
          duration_minutes: number;
          created_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["webinars"]["Row"]> & {
          id: string;
          name: string;
          start_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["webinars"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
