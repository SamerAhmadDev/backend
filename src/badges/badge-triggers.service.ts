import { Injectable } from '@nestjs/common';
import { PaginationOptions } from 'src/common/interfaces';
import { BadgeTriggersRepository } from './badge-triggers.repository';
import { CreateBadgeTriggerDto } from './dto/create-badge-trigger-dto';
import { UpdateBadgeTriggerDto } from './dto/update-badge-trigger-dto';
import { BadgeTrigger } from './entities/badges.entity';

@Injectable()
export class BadgeTriggersService {
  constructor(
    private readonly badgeTriggersRepository: BadgeTriggersRepository,
  ) {}

  async getBadgeTriggers(
    pagination: PaginationOptions = {},
    badgeId?: string,
  ): Promise<{ triggers: BadgeTrigger[]; total: number }> {
    return this.badgeTriggersRepository.getBadgeTriggers(pagination, badgeId);
  }

  async getBadgeTrigger(id: string): Promise<BadgeTrigger | null> {
    return this.badgeTriggersRepository.getBadgeTriggerById(id);
  }

  async createBadgeTrigger(
    badgeId: string,
    dto: CreateBadgeTriggerDto,
  ): Promise<BadgeTrigger> {
    return this.badgeTriggersRepository.createBadgeTrigger(badgeId, dto);
  }

  async updateBadgeTrigger(
    id: string,
    dto: UpdateBadgeTriggerDto,
  ): Promise<BadgeTrigger> {
    return this.badgeTriggersRepository.updateBadgeTrigger(id, dto);
  }

  async deleteBadgeTrigger(id: string): Promise<void> {
    return this.badgeTriggersRepository.deleteBadgeTrigger(id);
  }
}
