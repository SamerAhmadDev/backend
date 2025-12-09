import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class UpdateQuizQuestionOptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateQuizQuestionDto {
  @ApiProperty({ enum: ['mcq', 'true_false'] })
  @IsString()
  type: 'mcq' | 'true_false';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @ApiPropertyOptional({ type: [UpdateQuizQuestionOptionDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuizQuestionOptionDto)
  options?: UpdateQuizQuestionOptionDto[];
}

export class UpdateQuizDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Min(0)
  @Max(100)
  passingScore?: number;

  @ApiProperty({ type: [UpdateQuizQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuizQuestionDto)
  questions: UpdateQuizQuestionDto[];
}
