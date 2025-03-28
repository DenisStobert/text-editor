# Simplawyer Text Editor

Простой одностраничный текстовый редактор, созданный с использованием React, имитирующий функциональность текстового редактора Simplawyer One.

## Функциональность

- **Загрузка HTML файлов**: Загрузка и отображение HTML файлов с тегами <p> и <span>.
- **Полужирный текст**: Выделение текста и применение жирного начертания.
- **Удаление текста**: 
  - Выделение текста и нажатие кнопки "Удалить выделенное" для его зачеркивания (красным цветом).
  - Текст остаётся видимым до тех пор, пока вы не нажмёте в другом месте редактора.
- **Плавная анимация удаления**: После клика вне редактора удалённый текст анимированно исчезает, перемещаясь в модуль удалённых текстов и уменьшаясь в размере.
- **Модуль удалённых текстов**: 
  - Скрыт по умолчанию и расширяется в ширину при наведении.
  - Показывает список всех удалённых текстов.

## Как начать работу

1. **Клонировать репозиторий:**
```bash
git clone https://github.com/DenisStobert/text-editor.git
```

2. **Перейти в папку проекта:**
```bash
cd text-editor
```

3. **Установить зависимости:**
```bash
npm install
```

4. **Запустить приложение:**
```bash
npm start
```

## Как использовать

-[] Загрузить файл: Нажмите на кнопку "Загрузить HTML файл", чтобы загрузить HTML файл с тегами <p> и <span> (например, test.html).
-[] Сделать текст жирным: Выделите текст и нажмите на кнопку "Сделать полужирным".
-[] Удалить текст:
    1. Выделите текст и нажмите на кнопку "Удалить выделенное".
    2. Текст будет зачёркнут и останется на месте.
    3. Нажмите в любое другое место, чтобы запустить анимацию удаления и перемещения текста в модуль.
-[] Просмотр удалённых текстов: Наведите курсор на модуль, чтобы расширить его и увидеть удалённые тексты.

## Используемые технологии

- **React**
- **CSS**
- **HTML5**