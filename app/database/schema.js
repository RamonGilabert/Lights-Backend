/* Schema */

var Schema {
  controllers: {
    id: { type: 'float', nullable: false, primary: true },
    created_at: { type: 'dateTime', nullable: false },
    updated_at: { type: 'dateTime', nullable: false }
  },

  lights: {
    id: { type: 'float', nullable: false, primary: true },
    controllers_id: { type: 'float', nullable: false },
    status: { type: 'boolean', nullable: false, unsigned: true },
    intensity: { type: 'float', maxlength: 150, nullable: false },
    red: { type: 'float', maxlength: 150, nullable: false, unique: true },
    green: { type: 'float', nullable: false },
    blue: { type: 'float', nullable: false },
    created_at: { type: 'dateTime', nullable: false },
    updated_at: { type: 'dateTime', nullable: false }
  },
};

module.export = Schema;
