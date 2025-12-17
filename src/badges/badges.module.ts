import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AdminBadgesController } from './admin-badges.controller';
import { BadgesRepository } from './badges.repository';
import { BadgesService } from './badges.service';

@Module({
  imports: [SupabaseModule],
  controllers: [AdminBadgesController],
  providers: [BadgesService, BadgesRepository],
  exports: [BadgesService],
})
export class BadgesModule {}
