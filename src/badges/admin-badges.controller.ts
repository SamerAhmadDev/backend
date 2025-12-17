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
import { SortDirection, UserRole } from 'src/common/enums';
import { PaginationOptions, SortOptions } from 'src/common/interfaces';

import { BadgesService } from './badges.service';
import { CreateBadgeDto } from './dto/create-badge-dto';
import { UpdateBadgeDto } from './dto/update-badge-dto';
import { Badge } from './entities/badges.entity';

@ApiTags('Admin - Badges')
@ApiBearerAuth('access-token')
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@Controller('/admin/badges')
export class AdminBadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Roles(UserRole.SuperAdmin)
  @Get()
  async getBadges(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortDirection') sortDirection?: SortDirection,
  ): Promise<{ badges: Badge[]; total: number }> {
    const pagination: PaginationOptions = {
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    };
    const sort: SortOptions = { sortBy, sortDirection };
    return this.badgesService.getBadges(pagination, sort, search);
  }

  @Roles(UserRole.SuperAdmin)
  @Get(':id')
  async getBadgeById(@Param('id') id: string): Promise<Badge | null> {
    return this.badgesService.getBadge(id);
  }

  @Roles(UserRole.SuperAdmin)
  @Post()
  async createBadge(@Body() dto: CreateBadgeDto): Promise<{ badgeId: string }> {
    const badge = await this.badgesService.createBadge(dto);
    return { badgeId: badge.id };
  }

  @Roles(UserRole.SuperAdmin)
  @Patch(':id')
  async updateBadge(
    @Param('id') id: string,
    @Body() dto: UpdateBadgeDto,
  ): Promise<Badge> {
    return this.badgesService.updateBadge(id, dto);
  }

  @Roles(UserRole.SuperAdmin)
  @Delete(':id')
  async deleteBadge(@Param('id') id: string): Promise<void> {
    return this.badgesService.deleteBadge(id);
  }
}
