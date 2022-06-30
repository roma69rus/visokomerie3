# VISOKOMERIE ecommerce project

Магазин для продажи одежды [visokomerie.com](https://visokomerie.ru/)

![visokomerie](https://user-images.githubusercontent.com/22370622/173572199-db60551a-badd-48e9-8c48-454f9bd76e64.gif)

## Исходные основные ФТТ
1. Адаптивная верстка (упор на мобильные устройства)
2. Реализовать функционал "Корзины"
3. Релизовать функционал обратной связи на email и whatsapp (модальные окна)
4. Выставлять статус товарам (NEW)
5. Вести журнал заказов, которые поступили по почте
6. Возможность делать скидки на товары
7. Админка: добавление и редактирование категорий, товаров; редактирование слайдера, редактирование главной страницы и порядка вывода товаров на всех страницах.

## Server architecture
<img width="477" alt="architecture" src="https://user-images.githubusercontent.com/22370622/176662927-f72bfbe5-c613-46db-92af-ad2b17477660.png">

## Database Schema diagram
<img width="805" alt="visokomerie _ DbDesigner net" src="https://user-images.githubusercontent.com/22370622/175945057-8d2d5d73-34c8-4317-9b10-dae30c8d6526.png">

## Helpful link
#### Database:
1. Databaseanswers.org [**UPD**] перестал работать :(  
http://www.databaseanswers.org/data_models/top_ten_data_models_e_commerce.htm  
http://www.databaseanswers.org/data_models/e_commerce/index.htm  
2. Oscommerce.com  
tep_database-pr2.2-CVS.pdf   
3. E-commerce-db  
https://github.com/ramortegui/e-commerce-db/blob/master/README.md  
4. Ecommerce-schema  
https://github.com/mrjatinchauhan/ecommerce-schema  


#### Node:  
1. Node.js E-Commerce App REST API with MongoDB  
https://www.youtube.com/watch?v=rMiRZ1iRC0A  
https://github.com/safak/youtube/tree/node-shop-api  
2. Express Tutorial: The Local Library website  
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website  
3. E-commerce-course-project  
https://github.com/CristianChris/e-commerce-course-project  
4. Learn Rest API using Express.js and MySQL DB
https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2


## TODO
#### Stage 1         
1. <s>Переделать все страницы HTML -> PUG</s>
2. <s>Подключить и проверить верстку</s>
3. <s>Проверить JS, модальные окна</s>
4. <s>Заполнить БД MySQL данными</s>
5. <s>Настроить подключение в БД, добавить модуль работы с БД</s>
6. <s>Index page. Запросом get вытянуть слайдер и товары из БД, отрендерить</s>
7. <s>Catalog page...</s>
8. <s>Product page...</s>
9. <s>Cart page...</s>
10. <s>Наконец уже подключить шрифты</s>
11. <s>Корзина. Доделать функционал JS. Дописать запросы fetch заполнения товаров корзины по id (id хранятся в localstorage)</s>
12. Корзина. Переписать cart.js на стороне клиента, ОШИБКА!
13. !ОШИБКА!!!!В корзине Яндекс метрика перетирает localStorage!!!!ОШИБКА!
14. !!ОШИБКА!! на большом экране не выводится product, исправить css!
15. <s>Страница "Контакты" - сделать статичную верстку</s>
16. <s>Исправить баг в шапке сайта</s>
17. <s>Развернуть на виртуалке itldc.com (оставил apache)</s>
18. <s>Поправить Desktop верстку, изменить главную страницу, отключить слайдер, добавить горизонтальную картинку</s> 
19. <s>Написать контроллеры и модели (controllers, models)</s>
20. <s>Сконфигурировать eslint</s>
21. Написать тесты для модуля
22. Заменить почтовый сервер на NodeMailer
23. <s>Добавить новый товар + слайдер </s>
24. Вернуть Preloader
25. <s>Rewrite to https (Apache) </s>
26. Добавить express-validator


#### Stage 2 
1. Админка
2. Продвижение
  
