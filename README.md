# Микро кинопоиск, основанный на открытом апи https://developer.themoviedb.org

Создайте `.env.local` в корне проекта:

```
VITE_TMDB_READ_TOKEN=
VITE_TMDB_API_KEY=
VITE_TMDB_API_BASE=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
VITE_DEFAULT_LANG=ru-RU
```

```bash
npm install

npm run dev
```

Должно запуститься на `http://localhost:3000`
