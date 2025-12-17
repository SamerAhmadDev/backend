import { Tables, TablesInsert } from 'src/supabase/types';

export type Badge = Tables<'badges'>;
export type BadgeInsert = TablesInsert<'badges'>;
export type BadgeTrigger = Tables<'badge_triggers'>;
