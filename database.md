these are the tables which we used in this project:
- Users
| Campo        | Tipo                     | Restricciones                                                |
| ------------ | ------------------------ | ------------------------------------------------------------ |
| id           | SERIAL                   | PRIMARY KEY                                                  |
| names        | VARCHAR(100)             | NOT NULL                                                     |
| surnames     | VARCHAR(100)             |                                                              |
| email        | VARCHAR(100)             | UNIQUE, NOT NULL, formato válido de email                    |
| passwordHash | VARCHAR(255)             | NOT NULL                                                     |
| userType     | VARCHAR(20)              | NOT NULL, solo 'Residencial', 'Industrial' o 'Administrador' |
| cedulaOrNit  | INTEGER                  | UNIQUE, NOT NULL, > 0                                        |
| createdAt    | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                                   |
| updatedAt    | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                                   |

- Consumptions
| Campo            | Tipo                     | Restricciones                                 |
| ---------------- | ------------------------ | --------------------------------------------- |
| id               | SERIAL                   | PRIMARY KEY                                   |
| userId           | INTEGER                  | FOREIGN KEY → `users(id)` (ON DELETE CASCADE) |
| consumptionValue | NUMERIC(10,2)            | NOT NULL, ≥ 0                                 |
| consumptionDate  | TIMESTAMP                | NOT NULL                                      |
| createdAt        | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                    |

Índice: - idx_consumptions_userId en userId

- Productions
| Campo           | Tipo                     | Restricciones                                 |
| --------------- | ------------------------ | --------------------------------------------- |
| id              | SERIAL                   | PRIMARY KEY                                   |
| userId          | INTEGER                  | FOREIGN KEY → `users(id)` (ON DELETE CASCADE) |
| productionValue | NUMERIC(10,2)            | NOT NULL, ≥ 0                                 |
| productionDate  | TIMESTAMP                | NOT NULL                                      |
| createdAt       | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                    |

Índice: - idx_productions_userId en userId

- offer
| Campo     | Tipo                     | Restricciones                                 |
| --------- | ------------------------ | --------------------------------------------- |
| id        | SERIAL                   | PRIMARY KEY                                   |
| userId    | INTEGER                  | FOREIGN KEY → `users(id)` (ON DELETE CASCADE) |
| quantity  | NUMERIC(10,2)            | NOT NULL, > 0                                 |
| value     | INTEGER                  | NOT NULL, > 0                                 |
| offerDate | TIMESTAMP                | NOT NULL                                      |
| createdAt | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                    |

Índice: - idx_offer_userId en userId

- Energy Contracts
| Campo               | Tipo                     | Restricciones                                       |
| ------------------- | ------------------------ | --------------------------------------------------- |
| id                  | SERIAL                   | PRIMARY KEY                                         |
| buyer\_id           | INTEGER                  | FOREIGN KEY → `users(id)` (ON DELETE CASCADE)       |
| offer\_id           | INTEGER                  | FOREIGN KEY → `offer(id)` (ON DELETE CASCADE)       |
| quantity            | NUMERIC(10,2)            | NOT NULL, > 0                                       |
| agreed\_price       | NUMERIC(10,2)            | NOT NULL, > 0                                       |
| status              | VARCHAR(20)              | NOT NULL, solo 'Pending', 'Completed' o 'Cancelled' |
| created\_at         | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                          |
| updated\_at         | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT\_TIMESTAMP                          |
| contract\_pdf\_path | VARCHAR(255)             | Ruta al archivo PDF del contrato (opcional)         |

Índices:
- idx_energy_contracts_buyer en buyer_id

- idx_energy_contracts_offer en offer_id


this is the SQL code that we use to create the tables and indexes (in our case, we used postgreSQL in render):

```bash
-- Crear la tabla 'users'
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    names VARCHAR(100) NOT NULL,
    surnames VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    passwordHash VARCHAR(255) NOT NULL,
    userType VARCHAR(20) NOT NULL CHECK (userType IN ('Residencial', 'Industrial', 'Administrador')),
    cedulaOrNit INTEGER UNIQUE NOT NULL CHECK (cedulaOrNit > 0),
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla 'consumptions'
CREATE TABLE consumptions (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    consumptionValue NUMERIC(10,2) NOT NULL CHECK (consumptionValue >= 0),
    consumptionDate TIMESTAMP NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para 'userId' en 'consumptions'
CREATE INDEX idx_consumptions_userId ON consumptions(userId);

-- Crear la tabla 'productions'
CREATE TABLE productions (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    productionValue NUMERIC(10,2) NOT NULL CHECK (productionValue >= 0),
    productionDate TIMESTAMP NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para 'userId' en 'productions'
CREATE INDEX idx_productions_userId ON productions(userId);

-- Crear la tabla 'offer'
CREATE TABLE offer (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    value INTEGER NOT NULL CHECK (value > 0),
    offerDate TIMESTAMP NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para 'userId' en 'offer'
CREATE INDEX idx_offer_userId ON offer(userId);

-- Crear la tabla 'energy_contracts'
CREATE TABLE energy_contracts (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE,
    quantity NUMERIC(10,2) NOT NULL CHECK (quantity > 0),
    agreed_price NUMERIC(10,2) NOT NULL CHECK (agreed_price > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    contract_pdf_path VARCHAR(255)
);

-- Crear índices para 'energy_contracts'
CREATE INDEX idx_energy_contracts_buyer ON energy_contracts(buyer_id);
CREATE INDEX idx_energy_contracts_offer ON energy_contracts(offer_id);

-- Mensaje de confirmación
SELECT 'Base de datos recreada exitosamente' AS message;

```
