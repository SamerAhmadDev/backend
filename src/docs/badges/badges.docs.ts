import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const GetBadgesDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Retrieve all badges with optional pagination and search',
    }),
    ApiResponse({
      status: 200,
      description: 'List of badges with total count',
    }),
    ApiQuery({ name: 'limit', required: false }),
    ApiQuery({ name: 'offset', required: false }),
    ApiQuery({ name: 'search', required: false }),
  );

export const GetBadgeByIdDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Retrieve a badge by its ID' }),
    ApiResponse({ status: 200, description: 'Badge object' }),
  );

export const CreateBadgeDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new badge' }),
    ApiResponse({
      status: 201,
      description: 'Badge created successfully',
    }),
  );

export const UpdateBadgeDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update an existing badge by ID' }),
    ApiResponse({
      status: 200,
      description: 'Badge updated successfully',
    }),
  );

export const DeleteBadgeDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a badge by ID' }),
    ApiResponse({ status: 200, description: 'Badge deleted successfully' }),
  );

// ---------------- Badge Triggers ----------------

export const GetBadgeTriggersDocs = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Retrieve all triggers for a specific badge with optional pagination',
    }),
    ApiResponse({
      status: 200,
      description: 'List of triggers with total count',
    }),
    ApiQuery({ name: 'limit', required: false }),
    ApiQuery({ name: 'offset', required: false }),
  );

export const GetBadgeTriggerByIdDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Retrieve a single badge trigger by its ID' }),
    ApiResponse({
      status: 200,
      description: 'Badge trigger object',
    }),
  );

export const CreateBadgeTriggerDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new trigger for a specific badge' }),
    ApiResponse({
      status: 201,
      description: 'Trigger created successfully',
    }),
  );

export const UpdateBadgeTriggerDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update an existing badge trigger by ID' }),
    ApiResponse({
      status: 200,
      description: 'Trigger updated successfully',
    }),
  );

export const DeleteBadgeTriggerDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a badge trigger by ID' }),
    ApiResponse({ status: 200, description: 'Trigger deleted successfully' }),
  );
