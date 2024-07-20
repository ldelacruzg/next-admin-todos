# Development

1. Levantar base de datos.

```bash
docker compose up -d
```

2. Renombrar **.env.template** a **.env**.

3. Reemplazar las variables de entorno dónde sea necesario.

4. Instalar las dependencias.

```bash
pnpm install
```

5. Generar la base de datos con migración.

```bash
npx prisma migrate dev
```

6. Generar cliente de Prisma

```bash
npx prisma generate
```

7. Levantar la aplicación.

```bash
pnpm run dev
```

Para setear datos de prueba, abrir [http://localhost:3000/api/seed](http://localhost:3000/api/seed) con tu navegador.

Abrir [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.
