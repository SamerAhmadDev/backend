import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AdminJwtAuthGuard } from 'src/auth/guards/admin-jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums';
import { PaginationOptions } from 'src/common/interfaces';

import {
  CreateBadgeDocs,
  CreateBadgeTriggerDocs,
  DeleteBadgeDocs,
  DeleteBadgeTriggerDocs,
  GetBadgeByIdDocs,
  GetBadgesDocs,
  GetBadgeTriggerByIdDocs,
  GetBadgeTriggersDocs,
  UpdateBadgeDocs,
  UpdateBadgeTriggerDocs,
} from 'src/docs/badges/badges.docs';
import { BadgeTriggersService } from './badge-triggers.service';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge-dto';
import { CreateBadgeTriggerDto } from './dto/create-badge-trigger-dto';
import { UpdateBadgeDto } from './dto/update-badge-dto';
import { UpdateBadgeTriggerDto } from './dto/update-badge-trigger-dto';
import { Badge, BadgeTrigger } from './entities/badges.entity';

@ApiTags('Admin - Badges')
@ApiBearerAuth('access-token')
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@Controller('/admin/badges')
export class AdminBadgesController {
  constructor(
    private readonly badgesService: BadgesService,
    private readonly badgeTriggersService: BadgeTriggersService,
  ) {}

  // ----------------- Badges -----------------
  @Roles(UserRole.SuperAdmin)
  @Get()
  @GetBadgesDocs()
  async getBadges(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('search') search?: string,
  ): Promise<{ badges: Badge[]; total: number }> {
    const pagination: PaginationOptions = {
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    };
    return this.badgesService.getBadges(pagination, {}, search);
  }

  @Roles(UserRole.SuperAdmin)
  @Get(':id')
  @GetBadgeByIdDocs()
  async getBadgeById(@Param('id') id: string): Promise<Badge | null> {
    return this.badgesService.getBadge(id);
  }

  @Roles(UserRole.SuperAdmin)
  @Post()
  @CreateBadgeDocs()
  async createBadge(@Body() dto: CreateBadgeDto): Promise<{ badgeId: string }> {
    const badge = await this.badgesService.createBadge(dto);
    return { badgeId: badge.id };
  }

  @Roles(UserRole.SuperAdmin)
  @Patch(':id')
  @UpdateBadgeDocs()
  async updateBadge(
    @Param('id') id: string,
    @Body() dto: UpdateBadgeDto,
  ): Promise<Badge> {
    return this.badgesService.updateBadge(id, dto);
  }

  @Roles(UserRole.SuperAdmin)
  @DeleteBadgeDocs()
  @Delete(':id')
  async deleteBadge(@Param('id') id: string): Promise<void> {
    return this.badgesService.deleteBadge(id);
  }

  // ----------------- Badge Triggers -----------------
  // List triggers for a badge
  @Roles(UserRole.SuperAdmin)
  @GetBadgeTriggersDocs()
  @Get(':badgeId/triggers')
  async getBadgeTriggers(
    @Param('badgeId') badgeId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<{ triggers: BadgeTrigger[]; total: number }> {
    const pagination: PaginationOptions = {
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    };
    return this.badgeTriggersService.getBadgeTriggers(pagination, badgeId);
  }

  // Get single trigger
  @Roles(UserRole.SuperAdmin)
  @GetBadgeTriggerByIdDocs()
  @Get(':badgeId/triggers/:triggerId')
  async getBadgeTriggerById(
    @Param('badgeId') badgeId: string,
    @Param('triggerId') triggerId: string,
  ): Promise<BadgeTrigger | null> {
    return this.badgeTriggersService.getBadgeTrigger(triggerId);
  }

  // Create trigger
  @Roles(UserRole.SuperAdmin)
  @Post(':badgeId/triggers')
  @CreateBadgeTriggerDocs()
  async createBadgeTrigger(
    @Param('badgeId') badgeId: string,
    @Body() dto: CreateBadgeTriggerDto,
  ): Promise<{ triggerId: string }> {
    const trigger = await this.badgeTriggersService.createBadgeTrigger(
      badgeId,
      dto,
    );
    return { triggerId: trigger.id };
  }

  // Update trigger
  @Roles(UserRole.SuperAdmin)
  @Patch(':badgeId/triggers/:triggerId')
  @UpdateBadgeTriggerDocs()
  async updateBadgeTrigger(
    @Param('triggerId') triggerId: string,
    @Body() dto: UpdateBadgeTriggerDto,
  ): Promise<BadgeTrigger> {
    return this.badgeTriggersService.updateBadgeTrigger(triggerId, dto);
  }

  // Delete trigger
  @Roles(UserRole.SuperAdmin)
  @Delete(':badgeId/triggers/:triggerId')
  @DeleteBadgeTriggerDocs()
  async deleteBadgeTrigger(
    @Param('triggerId') triggerId: string,
  ): Promise<void> {
    return this.badgeTriggersService.deleteBadgeTrigger(triggerId);
  }
}
