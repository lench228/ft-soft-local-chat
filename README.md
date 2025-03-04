## Мысли по поводу задания

Хранение сессий 

sessionStorage - Для хранения всех данных, засунуть в Persist slice,
если буду использовать RTK 

Тк нужно медиа, есть вариант с indexedDB, но не уверен, вообще адекватным решением 
выглядит хранение чата в формате

```
iMessage: {
    message: string | URL.createObjectURL(blob);
    author: string; 
    date: date;
    replyed?: message;
}

iChat:
[
    id: string; #Чтобы знать что за чат;
    messages: iMessage[],
]

в localStorage - chatId: messages, чтобы не хранить все чаты в 1 key-destinationName

```
То есть, так как приложение будет использоваться исключительно в рамках 
1 браузера, то выглядит логичным, брать сами файлы как URL 
В то же время есть сомнения насчет чтения одного файла с нескольких потоков...

localStorage - чаты будут тут, тк это общая инфа, к которой доступ нужен всем 

Нужно удалять пользователя, после того как он закрыл вкладку

BroadcastChanel для отправки сообщений ? 

Вводит имя, получает айди, если айди есть  => скип

Загружается список активных чатов, в которых есть пользователь, если их нет пусто

Добавить чат кнопка с полем.


Вводит ИМЯ юзера с которым хочет в чат, генерит айди чата , отправляет его с айди юзера 2 броадкастом,
если айди получателя совпадает, то, тянем чат в список


Собеседнику должен прийти увед о новом чате, и отображение его, надеюсь, получится через broadcast

Сообщения отправлять в localStorage, в нужный объект, но его прийдется пересоздавать каждый раз 
Это просто ужасно, но как иначе без сервера? 

