# Development

1. Levantar base de datos.

```bash
docker compose up -d
```

2. Renombrar **.env.template** a **.env**.

3. Reemplazar las variables de entorno dónde sea necesario.

4. Generar la base de datos con migración.

```bash
npx prisma migrate dev
```

5. Generar cliente de Prisma

```bash
npx prisma generate
```

5. Levantar la aplicación.

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.
