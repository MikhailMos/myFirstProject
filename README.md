# myFirstProject

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Что делает
Форма принимает данные с сервера (пока только Dishes).
Данные по покупателям, пока только МОК данные.
После выбора покупателя и продуктов, данные отправляются на сервер

### Что нужно поправить
Подсчет суммы не верен, т.к. в данных с сервера нет поля "price", поэтому пока суммируется по полю "count"
