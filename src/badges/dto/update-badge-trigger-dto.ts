import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBadgeTriggerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  event_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  conditions?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scope?: string;
}
