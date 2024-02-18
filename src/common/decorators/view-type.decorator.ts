import { Reflector } from '@nestjs/core';

export type ViewTypeArg = 'page' | 'partial';

export const ViewType = Reflector.createDecorator<ViewTypeArg>();
