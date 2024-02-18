import { Uuid } from 'src/lib/uuid';
import { customType } from 'drizzle-orm/pg-core';

export const pgUuid = () =>
  customType<{ data: Uuid; driverData: string }>({
    dataType() {
      return 'uuid';
    },

    toDriver(uuid: Uuid) {
      return uuid.toString();
    },

    fromDriver(raw: string) {
      return new Uuid(raw);
    },
  });
