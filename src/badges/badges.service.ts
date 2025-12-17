import { Injectable } from '@nestjs/common';
import { PaginationOptions, SortOptions } from 'src/common/interfaces';
import { BadgesRepository } from './badges.repository';
import { CreateBadgeDto } from './dto/create-badge-dto';
import { UpdateBadgeDto } from './dto/update-badge-dto';
import { Badge } from './entities/badges.entity';

@Injectable()
export class BadgesService {
  constructor(private readonly badgesRepository: BadgesRepository) {}

  async getBadges(
    pagination: PaginationOptions = {},
    sort: SortOptions = {},
    search?: string,
  ): Promise<{ badges: Badge[]; total: number }> {
    return this.badgesRepository.getBadges(pagination, sort, search);
  }

  async getBadge(id: string): Promise<Badge | null> {
    return this.badgesRepository.getBadgeById(id);
  }

  async createBadge(dto: CreateBadgeDto): Promise<Badge> {
    return this.badgesRepository.createBadge(dto);
  }

  async updateBadge(id: string, dto: UpdateBadgeDto): Promise<Badge> {
    return this.badgesRepository.updateBadge(id, dto);
  }

  async deleteBadge(id: string): Promise<void> {
    return this.badgesRepository.deleteBadge(id);
  }
}
