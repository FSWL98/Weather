# Weather
Web-programming lab1 semester 7
# Запуск
После клонирования репозитория на свой компьютер, для открытия страницы локально достаточно просто заупстить файл index.html
# Редактирование
Для стилизации в данной работе использовался препроцессор LESS. В репозитории имеются двай файла со стилями с одинаковым названием: style.less и style.css. Подключен к странице лишь второй, однако стили редактировалися в первом и затем конвертировались во второй. Если Вы хотите поменять стили, то можете делать это либо напрямую в style.css, либо же с использованием более удобного синтаксиса, предоставляемого препроцессором LESS в файле style.less. Однако во втором случае Вам нужно будет преобразовать написанные вами стили в CSS. Для этого сначала нужно установить LESS на Ваш компьютер:
```
npm install -g less
```
После этого запустите команду 
```
lessc style.less style.css
```
Весь написанный в style.less код преобразуется в CSS и будет записан в файл style.css, который уже подключен к страничке.
