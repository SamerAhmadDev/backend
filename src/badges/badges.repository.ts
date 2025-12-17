import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaginationOptions, SortOptions } from 'src/common/interfaces';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBadgeDto } from './dto/create-badge-dto';
import { UpdateBadgeDto } from './dto/update-badge-dto';
import { Badge } from './entities/badges.entity';

@Injectable()
export class BadgesRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async getBadges(
    pagination: PaginationOptions = {},
    sort?: SortOptions,
    search?: string,
  ): Promise<{ badges: Badge[]; total: number }> {
    let query = this.supabase.client
      .from('badges')
      .select('*', { count: 'exact' });

    // Search by name
    if (search) {
      const searchPattern = `%${search}%`;
      query = query.ilike('name', searchPattern);
    }

    // Sort
    const allowedSortFields = ['name', 'created_at'];
    if (sort?.sortBy && allowedSortFields.includes(sort.sortBy)) {
      const ascending = sort.sortDirection !== 'desc';
      query = query.order(sort.sortBy, { ascending });
    }

    // Pagination
    if (pagination.limit !== undefined) query = query.limit(pagination.limit);
    if (pagination.offset !== undefined && pagination.limit !== undefined) {
      query = query.range(
        pagination.offset,
        pagination.offset + pagination.limit - 1,
      );
    }

    const { data, error, count } = await query;

    if (error) throw new InternalServerErrorException(error.message);

    return { badges: data as Badge[], total: count ?? 0 };
  }

  async getBadgeById(id: string): Promise<Badge | null> {
    const { data, error } = await this.supabase.client
      .from('badges')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new InternalServerErrorException(error.message);

    return data as Badge | null;
  }

  async createBadge(dto: CreateBadgeDto): Promise<Badge> {
    const { data, error } = await this.supabase.client
      .from('badges')
      .insert(dto)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);

    return data as Badge;
  }

  async updateBadge(id: string, dto: UpdateBadgeDto): Promise<Badge> {
    const { data, error } = await this.supabase.client
      .from('badges')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);

    return data as Badge;
  }

  async deleteBadge(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('badges')
      .delete()
      .eq('id', id);

    if (error) throw new InternalServerErrorException(error.message);
  }
}
