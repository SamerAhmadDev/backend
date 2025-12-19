import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminBadgesController } from './admin-badges.controller';
import { BadgeTriggersRepository } from './badge-triggers.repository';
import { BadgeTriggersService } from './badge-triggers.service';
import { BadgesRepository } from './badges.repository';
import { BadgesService } from './badges.service';

@Module({
  imports: [SupabaseModule],
  controllers: [AdminBadgesController],
  providers: [
    BadgesService,
    BadgeTriggersService,
    BadgesRepository,
    BadgeTriggersRepository,
  ],
  exports: [BadgesService, BadgeTriggersService],
})
export class BadgesModule {}
