#!/bin/bash

set -e  # Прерывать при ошибках

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "📦 Строим проект (gulp build)..."
gulp build

echo "🔀 Переключаемся на ветку gh-pages..."
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages

echo "🧹 Удаляем старые файлы..."
git rm -rf . > /dev/null 2>&1

echo "📁 Копируем содержимое dist/..."
cp -r dist/* .

echo "➕ Добавляем и коммитим..."
git add .
git commit -m "Deploy latest build to gh-pages" || echo "✅ Нет изменений для коммита"

echo "🚀 Пушим в gh-pages..."
git push origin gh-pages --force

echo "↩️ Возвращаемся в ветку $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "✅ Готово: финальная сборка опубликована в gh-pages."