'use strict';

  const SERV_IP = "http://x.ksh.ru";
  const PORT = "2222";
  const SAVE_ORDER = "save_order";

  const ORGANIZATION_GUID = "00000000-0000-0000-0000-000000000000";
  const COMMENT_FROM_ORDER = "test";
  const PERSON_COUNT = 1;

  const getProductsForData = (arr) => {
    let res = [];
    arr.forEach(item => {
      if (!res.find(el => el.id === item.id)) {
        res.push({
          id: item.id,
          amount: item.count,
          modifiers: []
        });
      }
    });
    return res;
  };

  const getDateToStr = () => {
    let date = new Date();
    let dateStr = date.toISOString().replace("T", " ");
    return dateStr.substring(0, dateStr.length - 5);
  };

  const ObjPOST = (customer, products, sum, idOrder) => {
    return {
      organization: ORGANIZATION_GUID,
      customer: {
        id: customer.id,
        name: customer.name,
        surName: customer.surname,
        phone: customer.phone
      },
      order: {
        id: "" + idOrder,
        externalId: "0000000000000000000000000",
        date: getDateToStr(),
        phone: customer.phone,
        items: getProductsForData(products),
        isSelfService: false,
        comment: COMMENT_FROM_ORDER,
        personsCount: PERSON_COUNT,
        address: {
          city: "Санкт-Петербург",
          home: "25",
          comment: "константа Address_comment",
          street: "Морской",
          housing: "2",
          apartment: "8"
        },
        fullSum: sum,
        paymentItems: [
          {
            sum: sum,
            paymentType: {
              code: "CASH"
            },
            isProcessedExternally: false
          }
        ]
      }
    }
  };

  const onSubmitClick = function(dataForm) {
    fetch(SERV_IP + ":" + PORT + "/" + SAVE_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataForm)
    })
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        alert("Запрос выполнен с запросом JSON", data);
      })
      .catch(function(error) {
        alert("Запрос не выполнен", error);
      });
  };

  export default {
    ObjPOST: ObjPOST,
    onSubmitClick: onSubmitClick
  }
