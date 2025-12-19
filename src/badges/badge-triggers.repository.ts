import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationOptions } from 'src/common/interfaces';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBadgeTriggerDto } from './dto/create-badge-trigger-dto';
import { UpdateBadgeTriggerDto } from './dto/update-badge-trigger-dto';
import { BadgeTrigger } from './entities/badges.entity';

@Injectable()
export class BadgeTriggersRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async getBadgeTriggers(
    pagination: PaginationOptions = {},
    badgeId?: string,
  ): Promise<{ triggers: BadgeTrigger[]; total: number }> {
    let query = this.supabase.client
      .from('badge_triggers')
      .select('*', { count: 'exact' });

    // Filter by badge
    if (badgeId) {
      query = query.eq('badge_id', badgeId);
    }

    // Pagination
    if (pagination.limit !== undefined) {
      query = query.limit(pagination.limit);
    }
    if (pagination.offset !== undefined && pagination.limit !== undefined) {
      query = query.range(
        pagination.offset,
        pagination.offset + pagination.limit - 1,
      );
    }

    const { data, error, count } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return {
      triggers: data as BadgeTrigger[],
      total: count ?? 0,
    };
  }

  async getBadgeTriggerById(id: string): Promise<BadgeTrigger | null> {
    const { data, error } = await this.supabase.client
      .from('badge_triggers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data as BadgeTrigger | null;
  }

  async createBadgeTrigger(
    badgeId: string,
    dto: Omit<CreateBadgeTriggerDto, 'badge_id'>,
  ): Promise<BadgeTrigger> {
    const { data, error } = await this.supabase.client
      .from('badge_triggers')
      .insert({
        ...dto,
        badge_id: badgeId,
      })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data as BadgeTrigger;
  }

  async updateBadgeTrigger(
    id: string,
    dto: UpdateBadgeTriggerDto,
  ): Promise<BadgeTrigger> {
    const { data, error } = await this.supabase.client
      .from('badge_triggers')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data as BadgeTrigger;
  }

  async deleteBadgeTrigger(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('badge_triggers')
      .delete()
      .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
