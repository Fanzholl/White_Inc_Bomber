# White_Inc_Bomber – Универсальный SMS API Sender

## 📖 Описание

Этот проект представляет собой мощный и гибкий инструмент для отправки SMS через различные API-сервисы. Основная цель заключается в предоставлении удобного и единого интерфейса для работы с множеством сервисов, которые поддерживают отправку SMS. Это значительно упрощает взаимодействие с каждым из сервисов, избавляя от необходимости писать отдельный код для каждого из них.

**Функциональные особенности:**
- Поддержка множества популярных сервисов для отправки SMS из одного интерфейса
- Гибкая система форматирования номеров телефона для корректной работы с разными странами
- Возможность оперативного изменения текущего номера телефона для дальнейшей отправки сообщений
- Функция массовой отправки сообщений на различные сервисы одновременно
- Подробный лог для отслеживания успешных и неуспешных запросов
- Лёгкая настройка дополнительных заголовков и параметров для каждого сервиса

<p align="center">![image](https://github.com/user-attachments/assets/ba6295ca-df03-4599-873b-24a85c75bc9d)</p>
  

## 🌐 Работа с системой проксирования

Система проксирования в проекте **White_Inc_Bomber** предназначена для обеспечения анонимности и повышения надёжности при отправке запросов на различные API-сервисы. Она позволяет маршрутизировать трафик через сторонние серверы, снижая вероятность блокировки и ускоряя доставку сообщений.

### 🔍 Как работает прокси в White_Inc_Bomber

1. **Маршрутизация трафика:**
   - Все запросы к API-сервисам направляются через заранее настроенный прокси-сервер.
   - Это помогает обойти ограничения по количеству запросов с одного IP-адреса.

2. **Выбор прокси:**
   - Система поддерживает работу с несколькими прокси.
   - Прокси выбирается случайным образом или по заранее настроенному алгоритму для равномерного распределения нагрузки.

3. **Обновление и валидация прокси:**
   - Перед началом работы происходит валидация списка прокси.
   - Нерабочие прокси исключаются из пула.

### ⚙️ Настройка прокси

1. **Добавление прокси-сервера:**
   В файле `config/proxyList.json` добавьте новые прокси-серверы в формате:
   ```json
   [
     "http://username:password@proxyserver1:port",
     "http://username:password@proxyserver2:port"
   ]
   ```

2. **Подключение прокси в коде:**
   В файле `src/WhiteBomb.ts` настройте использование прокси:
   ```ts
   import proxyAgent from 'proxy-agent';

   const proxy = proxyAgent(getRandomProxy());

   fetch(api.url, {
     method: 'POST',
     headers: api.headers,
     body: JSON.stringify(api.payload),
     agent: proxy
   });
   ```

3. **Функция выбора случайного прокси:**
   ```ts
   function getRandomProxy() {
     const proxies = require('../config/proxyList.json');
     return proxies[Math.floor(Math.random() * proxies.length)];
   }
   ```

### 🚦 Мониторинг и логирование

1. **Логирование запросов через прокси:**
   - Включите логирование запросов в файле настроек.
   - Логи включают информацию о выбранном прокси, времени запроса и статусе выполнения.

2. **Автоматическое отключение неработающих прокси:**
   - Если прокси не отвечает в течение заданного таймаута, он исключается из пула активных серверов.

### 🔒 Безопасность при работе с прокси

- Используйте только надёжные и проверенные прокси-сервисы.
- Избегайте бесплатных общедоступных прокси из-за их ненадёжности и возможных утечек данных.
- Обновляйте список прокси регулярно для поддержания стабильности работы.

Эта система позволяет избежать блокировок, равномерно распределяет нагрузку и повышает общую надёжность при отправке SMS через различные API-сервисы.

## 🚀 Установка

1. **Клонируйте репозиторий с помощью команды:**
   ```bash
   git clone https://github.com/yourusername/bombapis.git
   ```

2. **Перейдите в директорию проекта:**
   ```bash
   cd bombapis
   ```

3. **Установите все зависимости проекта с помощью менеджера пакетов npm:**
   ```bash
   npm install
   ```

4. **Запустите скрипт для проверки установки:**
   ```bash
   npm run test
   ```

## ⚙️ Использование

### Изменение номера телефона
Чтобы установить номер телефона, используйте следующую команду:
```ts
import { changePhone } from './bombapis';

changePhone('+79891174756');
```
Теперь все запросы будут отправляться на данный номер.

### Отправка SMS через подключённые API
Для отправки SMS на все доступные сервисы используйте:
```ts
import { bombapis } from './bombapis';

bombapis.APIs.forEach(api => {
  // Отправка SMS на каждый сервис через API
  console.log(`Отправка SMS через сервис ${api.name}`);
});
```

### Форматирование номера телефона
Функция для приведения номера телефона к единому формату:
```ts
import { formatePhone } from './bombapis';

const formattedPhone = formatePhone('+79891174756');
console.log(formattedPhone); // +7(989)-117-47-56
```

### Обрезка номера до основного формата
Используйте для удаления лишних символов:
```ts
import { slicePhone } from './bombapis';

const slicedPhone = slicePhone('+79891174756');
console.log(slicedPhone); // 9891174756
```

### Массовая отправка сообщений на различные сервисы
```ts
import { bombapis } from './bombapis';

function sendMassSMS(message) {
  bombapis.APIs.forEach(api => {
    try {
      console.log(`Отправка сообщения через ${api.name}: ${message}`);
      // Здесь должна быть функция отправки конкретного сообщения через API
    } catch (error) {
      console.error(`Ошибка при отправке через ${api.name}:`, error);
    }
  });
}
```

## 📂 Структура проекта
```
White_Inc_Bomber/
│
├── README.md                 # Документация проекта
├── .gitignore                # Файл игнорирования для Git
├── package.json              # Настройки проекта и зависимости
│
├── .git/                     # Git-репозиторий
│   ├── config                # Настройки репозитория
│   ├── HEAD                  # Указатель на текущую ветку
│   ├── refs/                 # Ссылки на ветки и теги
│   └── objects/              # Хранение объектов Git
│
├── src/                       # Исходный код проекта
│   ├── WhiteBomb.ts          # Основной скрипт для запуска API
│   ├── API's/
│   │   └── api's.ts          # Реализация подключений к API
│   ├── captcha/
│   │   └── getAdamasCaptcha.js  # Скрипт получения капчи Adamas
│   ├── interfaces/
│   │   └── interfaces.ts     # Описание интерфейсов TypeScript
│   ├── routers/
│   │   └── Revenge.ts        # Логика маршрутов проекта
│   ├── sites/
│   │   ├── index.html        # Веб-интерфейс для взаимодействия
│   │   └── style/
│   │       └── index.css     # Стили для интерфейса
│
└── tests/                     # (Отсутствует, но рекомендовано создать) Набор тестов для API и утилит
```

## 🛠️ Возможности кастомизации

- Добавление новых сервисов путем расширения массива `APIs`
- Установка дополнительных заголовков в запросах через модификацию объекта `headers`
- Возможность интеграции с базой данных для хранения логов отправленных сообщений
- Опциональная интеграция с мониторингом (например, через Sentry)

## 🔒 Лицензия
Проект распространяется под лицензией MIT. Подробности и условия использования можно найти в файле `LICENSE`.

## 👨‍💻 Автор проекта
**Митрий**
- [GitHub](https://github.com/Fanzholl)
- [LinkedIn](#)
- Email: example@example.com

---

> Если у вас есть предложения по улучшению или вы нашли ошибку, пожалуйста, создайте issue или отправьте pull request! 🚀

