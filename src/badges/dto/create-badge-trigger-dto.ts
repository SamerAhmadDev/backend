import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBadgeTriggerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  event_type: string;

  @ApiPropertyOptional()
  @IsOptional()
  conditions?: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  scope?: string;
}
